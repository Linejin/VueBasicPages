# middleware.py
from django.middleware.csrf import get_token

class CsrfHeaderMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # CSRF 토큰을 응답 헤더에 추가
        csrf_token = get_token(request)
        response['X-CSRFToken'] = csrf_token
        
        return response
