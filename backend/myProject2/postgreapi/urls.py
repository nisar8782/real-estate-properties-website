from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('login/', obtain_auth_token, name='login'),
    path('register/', views.registration_view.as_view(), name='register'),
    path('logout/', views.logoutView.as_view(), name='logout'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('addresses/suggestions/', views.addressListView.as_view(), name='addresseslistview'),
    path('companies/', views.userCompaniesListView.as_view(), name='companiesListView'),
    path('companies/<str:slug>', views.userCompaniesDetailView.as_view(), name='companiesDetailView'),
    path('users/', views.usersListView.as_view(), name='usersListView'),
    path('users/<str:username>', views.userDetailView.as_view(), name='userDetailView'),
    path('properties/', views.propertiesListView.as_view(), name='propertieslistview'),
    path('properties/<str:slug>', views.propertyDetailView.as_view(), name='propertyDetailView')
]