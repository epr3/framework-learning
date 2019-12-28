from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from core.authentication import JWTAuthentication


class Hello(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        return Response('OK', status=status.HTTP_200_OK)
