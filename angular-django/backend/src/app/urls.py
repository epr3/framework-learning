"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core import views as core_views
from books import views as book_views
from store_logistics import views as store_logistics_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('refresh/', core_views.RefreshTokenView.as_view(), name='refresh-token'),
    path('login/', core_views.Login.as_view(), name='login'),
    path('register/', core_views.Register.as_view(), name='register'),
    path('logout/', core_views.Logout.as_view(), name='logout'),
    path('profile/', core_views.ProfileView.as_view(), name='profile'),
    path('password-reset/', core_views.ResetPasswordEmailView.as_view(),
         name='password-reset-email'),
    path('password-reset/done/',
         core_views.ResetPasswordView.as_view(), name='password-reset'),
    path('books/', book_views.BookListView.as_view(), name='book-list'),
    path('books/<uuid:pk>/', book_views.BookDetailView.as_view(), name='book-detail'),
    path('addresses/', store_logistics_views.AddressListView.as_view(),
         name='address-list')
]
