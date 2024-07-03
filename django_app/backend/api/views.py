from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .serializer import UserSerializer, NoteSerializer
from rest_framework import generics, response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from urllib.parse import urlencode
import requests
import base64
import hashlib
import random
import string

class OAuth2Login(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        code_verifier = ''.join(random.choices(string.ascii_letters + string.digits, k=128))
        code_challenge = base64.urlsafe_b64encode(hashlib.sha256(code_verifier.encode()).digest()).decode('utf-8').replace('=', '')

        request.session['state'] = ''.join(random.choices(string.ascii_letters + string.digits, k=16))
        request.session['code_verifier'] = code_verifier

        authorization_url = (
            f"http://localhost:8000/o/authorize/?response_type=code&code_challenge={code_challenge}&code_challenge_method=S256"
            f"&client_id={settings.CLIENT_ID}&redirect_uri={settings.REDIRECT_URI}"
        )

        # Optionally, you can also include state in the response if needed
        response_data = {
            'authorization_url': authorization_url,
            'state': request.session['state'],
            'code_verifier':request.session['code_verifier'],
        }

        return Response(response_data)

class OAuth2Callback(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        code = request.GET.get('code')
        code_verifier = request.data.get('code_verifier')

        token_url = settings.TOKEN_URL
        token_params = {
            'code': code,
            'client_id': settings.CLIENT_ID,
            'client_secret': settings.CLIENT_SECRET,
            'redirect_uri': settings.REDIRECT_URI,
            'grant_type': 'authorization_code',
            'code_verifier': code_verifier,
        }
        

        # token_url = f"{token_url}/{urlencode(token_params)}"

        token_response = requests.post(url=token_url, json=token_params)
        

        token_data = token_response.json()
        print("Token Response" , token_data)
        return Response(token_data)


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


