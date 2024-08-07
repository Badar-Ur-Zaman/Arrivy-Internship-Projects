from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('api/login/', views.login_view, name="login"),
    path('api/register/', views.register_view, name="register"),
    path('api/logout/', views.logout_view, name="logout"),
]