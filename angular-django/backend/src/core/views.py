import jwt
from datetime import timedelta
from django.contrib.auth import authenticate
from django.utils import timezone
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication
from .authentication import JWTAuthentication
from .models import RefreshToken
from .serializers import RefreshTokenSerializer, UserSerializer


def create_response_tokens_from_user(user):
    access_payload = {
        'context': {
            'id': user.id.__str__(),
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser
        },
        'exp':
        timezone.now() +
        timedelta(seconds=settings.JWT_ACCESS_EXP_DELTA_SECONDS)
    }

    refresh_payload = {
        'context': {
            'id': user.id.__str__(),
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser
        },
        'exp':
        timezone.now() +
        timedelta(seconds=settings.JWT_REFRESH_EXP_DELTA_SECONDS)
    }

    access_token = jwt.encode(access_payload, settings.JWT_SECRET,
                              settings.JWT_ALGORITHM)
    refresh_token = jwt.encode(refresh_payload, settings.JWT_SECRET,
                               settings.JWT_ALGORITHM)
    serializer = RefreshTokenSerializer(
        data={
            'token':
            refresh_token.decode('utf-8'),
            'user':
            user.id,
            'expiry_date': timezone.now() + timedelta(
                seconds=settings.JWT_REFRESH_EXP_DELTA_SECONDS)
        })
    if serializer.is_valid():
        serializer.save()
        response = Response({'access_token': access_token},
                            status=status.HTTP_200_OK)
        response.set_cookie(
            key='refresh_token',
            value=refresh_token.decode('utf-8'),
            expires=timezone.now() +
            timedelta(seconds=settings.JWT_REFRESH_EXP_DELTA_SECONDS),
            httponly=True)
        return response
    else:
        return None


class Login(APIView):
    authentication_classes = [BasicAuthentication]

    def post(self, request):
        user = authenticate(request, **request.data)
        if user is not None:
            response = create_response_tokens_from_user(user)
            if response is not None:
                return response
            else:
                return Response('Error while logging in',
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response('Invalid email or password',
                            status=status.HTTP_401_UNAUTHORIZED)


class Register(APIView):
    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            user = authenticate(request, **request.data)
            response = create_response_tokens_from_user(user)
            if response is not None:
                return response
            else:
                return Response('Error while registering', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(user_serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class RefreshTokenView(APIView):
    def get(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            db_token = RefreshToken.objects.get(token=refresh_token)
            if db_token is not None:
                user = db_token.user
                response = create_response_tokens_from_user(user)
                if response is not None:
                    return response
        return Response('Unauthorized', status=status.HTTP_401_UNAUTHORIZED)


class Logout(APIView):
    authentication_classes = [JWTAuthentication]

    def delete(self, request):
        cookie_token = request.COOKIES.get('refresh_token')
        if cookie_token is not None:
            db_token = RefreshToken.objects.get(
                user=request.user, token=cookie_token)
            if db_token is not None:
                db_token.delete()
                return Response('Logged out', status=status.HTTP_200_OK)
            return Response('Unauthorized', status=status.HTTP_401_UNAUTHORIZED)
