from rest_framework import serializers
from .models import RefreshToken, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
    fields = ['email', 'password']
    extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(email=validated_data["email"])
        user.set_password(validated_data["password"])
        user.save()
        return user


class RefreshTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefreshToken
        fields = ['token', 'expiry_date', 'user']
