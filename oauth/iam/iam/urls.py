from django.contrib import admin
from django.urls import path, include
from oauth2_provider import urls as oauth2_urls
from users.views import home, profile, CustomAuthorizationView, api_me

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('profile/', profile, name='profile'),
    path('o/', include('oauth2_provider.urls'), name='oauth2_provider'),
    # path('o/authorize/', CustomAuthorizationView.as_view(), name='authorize'),
    path('api/me/', api_me, name='api_me'),
]


# Client Id = kYgdniLTGHWnjJR9HMciLHawvxo1OvQSBBUzzqGG
# Client SECRET = WejKuY57Lxvr570H3eQL5Ysk0vwjQ0cI4Z71kneZweTVZysVpl2UZ7iUjbJ55e7ehQl7EsTyME2UCC3yEf4ZJv6OrqYSO8GDL74Wzw9fN5gxdUsFY0mezehJoJyYemSv
