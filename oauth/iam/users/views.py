from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from oauth2_provider.decorators import protected_resource
from oauth2_provider.views import AuthorizationView

@login_required
def home(request):
    return HttpResponse("Home Page - OAuth Provider")

@login_required
def profile(request):
    return HttpResponse("Profile Page - OAuth Provider")

class CustomAuthorizationView(AuthorizationView):
    def form_valid(self, form):
        self.request.session['user'] = self.request.user.username
        return super().form_valid(form)

@protected_resource()
def api_me(request):
    user = request.resource_owner
    return HttpResponse(f'Hello, {user.username}')
