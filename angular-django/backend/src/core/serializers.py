from rest_framework import serializers
from .models import RefreshToken, User, Profile


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)
    password_confirmation = serializers.CharField(max_length=128)

    def validate_email(self, email):
        existing = User.objects.filter(email=email).first()
        if existing:
            raise serializers.ValidationError(
                "Someone with that email address has already registered")
        return email

    def validate(self, data):
        if data.get('password') != data.get('password_confirmation'):
            raise serializers.ValidationError("The passwords do no match")
        return data

    def save(self):
        user = User(email=self.validated_data["email"])
        user.set_password(self.validated_data["password"])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

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
