import jwt
from datetime import timedelta
from django.contrib.auth import authenticate
from django.utils import timezone
from django.conf import settings
from django.http import Http404
from django.utils.crypto import get_random_string
from django.dispatch import Signal
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from .authentication import JWTAuthentication
from .models import RefreshToken, Profile, PasswordReset
from .serializers import RefreshTokenSerializer, UserSerializer, ProfileSerializer, LoginSerializer, RegisterSerializer, EmailSerializer, PasswordResetSerializer
from .permissions import IsUser
from .tasks import send_feedback_email_task


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
    serializer.is_valid(raise_exception=True)
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


class Login(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(request, **serializer.validated_data)
        if user is not None:
            response = create_response_tokens_from_user(user)
            return response
        else:
            return Response('Invalid email or password',
                            status=status.HTTP_401_UNAUTHORIZED)


class Register(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user = authenticate(
            request, email=request.data['email'], password=request.data['password']
        )
        Profile.objects.create(user=user)
        response = create_response_tokens_from_user(user)
        return response


class RefreshTokenView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get_object(self, token):
        try:
            return RefreshToken.objects.get(token=token)
        except RefreshToken.DoesNotExist:
            raise Http404

    def get(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            db_token = self.get_object(refresh_token)
            if db_token is not None:
                user = db_token.user
                response = create_response_tokens_from_user(user)
                return response
        return Response('Refresh token is invalid', status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    def delete(self, request):
        cookie_token = request.COOKIES.get('refresh_token')
        if cookie_token is not None:
            db_token = RefreshToken.objects.get(
                user=request.user, token=cookie_token
            )
            if db_token is not None:
                db_token.delete()
                return Response('Logged out', status=status.HTTP_200_OK)
            return Response('Unauthorized', status=status.HTTP_401_UNAUTHORIZED)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated, IsUser]

    def get_object(self, user):
        try:
            return Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            raise Http404

    def get(self, request):
        profile = self.get_object(request.user.id)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile = self.get_object(request.user.id)
        serializer = ProfileSerializer(profile, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.validated_data)


class ResetPasswordEmailView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = EmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = request.data['email']
        token = get_random_string(length=64)
        PasswordReset.objects.filter(email=request.data['email']).delete()
        password_reset = PasswordReset.objects.create(
            email=email, token=token
        )
        send_feedback_email_task.delay(email, token)
        return Response('OK')


class ResetPasswordView(APIView):
    pass
