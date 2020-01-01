from rest_framework import serializers
from .models import RefreshToken, User, Profile


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


class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']


class ProfileSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer()

    class Meta:
        model = Profile
        fields = ['name', 'surname', 'telephone', 'user']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        if not user_data:
            raise User.DoesNotExist
        user = instance.user
        user.email = user_data.get('email')
        instance.name = validated_data.get('name')
        instance.surname = validated_data.get('surname')
        instance.telephone = validated_data.get('telephone')
        instance.save()
        user.save()
        return instance


class RefreshTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefreshToken
        fields = ['token', 'expiry_date', 'user']
