from rest_framework import generics
from .models import Post
from .serializers import PostSerializer

class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

from .models import Boxes
from .serializers import BoxesSerializer

class BoxesListCreate(generics.ListCreateAPIView):
    queryset = Boxes.objects.all()
    serializer_class = BoxesSerializer

class BoxesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Boxes.objects.all()
    serializer_class = BoxesSerializer
    

from .models import Member
from .serializers import MemberSerializer

class MemberListCreate(generics.ListCreateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class MemberRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Member

class MemberRegisterView(APIView):
    def post(self, request, *args, **kwargs):
        name = request.data.get('name')
        password = request.data.get('password')
        
        if not name or not password:
            return Response({"detail": "Name and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        if Member.objects.filter(name=name).exists():
            return Response({"detail": "This name already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        member = Member(name=name, password=password)
        member.save()
        return Response({"detail": "Sign Up successful."}, status=status.HTTP_201_CREATED)

class MemberLoginView(APIView):
    def post(self, request, *args, **kwargs):
        name = request.data.get('name')
        password = request.data.get('password')
        
        if not name or not password:
            return Response({"detail": "Name and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            member = Member.objects.get(name=name)
        except Member.DoesNotExist:
            return Response({"detail": "Member not found."}, status=status.HTTP_404_NOT_FOUND)
        
        if member.password != password:
            return Response({"detail": "Invalid password."}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({"detail": "Authentication successful."}, status=status.HTTP_200_OK)
    
#file uploader
from django.http import Http404, HttpResponse
import mimetypes
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UploadedFile
import os

class UploadFileView(APIView):
    def post(self, request, *args, **kwargs):
        if not 'file' in request.FILES:
            return Response({"error": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)
        file = request.FILES['file']

        if file.size > 1 * 1024 * 1024:  # 1MB 제한
            return Response({"error": "The file size should not exceed 1MB."}, status=status.HTTP_400_BAD_REQUEST)
        uploaded_file = UploadedFile(file=file)
        uploaded_file.save()
        return Response({"name":uploaded_file.file.name.split('/')[1], "message": "File uploaded successfully"}, status=status.HTTP_201_CREATED)

class RecentFilesView(APIView):
    def get(self, request, *args, **kwargs):
        file = UploadedFile.objects.order_by('-uploaded_at')[0]  # 최근 1개의 파일을 조회
        file_list = {'id': file.id, 'name': file.file.name.split('/')[1], 'uploaded_at': file.uploaded_at}
        return Response(file_list, status=status.HTTP_200_OK)

class DownloadFileView(APIView):
    def get(self, request, filename, *args, **kwargs):
        file_path = os.path.join(settings.MEDIA_ROOT, 'uploads', filename)
        if os.path.exists(file_path):
            mime_type, _ = mimetypes.guess_type(file_path)
            if mime_type is None:
                mime_type = 'application/octet-stream'  # 기본 MIME 타입
            
            with open(file_path, 'rb') as f:
                response = HttpResponse(f.read(), content_type=mime_type)
                response['Content-Disposition'] = f'attachment; filename="{filename}"'
                return response
        raise Http404("File not found.")


from .models import UploadedProFileImage
class UploadProfileImageView(APIView):
    def post(self, request, *args, **kwargs):
        if not 'file' in request.FILES:
            return Response({"error": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)
        file = request.FILES['file']
        file_extension = file.name.split('.')[-1].lower()
        
        # 유효한 이미지 확장자 목록
        valid_extensions = {'jpg', 'jpeg', 'png'}
        if not file_extension in valid_extensions:
            return Response({"error": "This File is not image extension."}, status=status.HTTP_400_BAD_REQUEST)
        
        uploaded_file = UploadedProFileImage(file=file)
        uploaded_file.save()
        return Response({"name":uploaded_file.file.name, "message": "Image uploaded successfully"}, status=status.HTTP_201_CREATED)

class RecentProfileImageView(APIView):
    def get(self, request, *args, **kwargs):
        files = UploadedProFileImage.objects.order_by('-uploaded_at')
        if len(files) == 0:
            return Response({"error": "Not existed image file."}, status=status.HTTP_400_BAD_REQUEST)
        file = files[0]  # 최근 1개의 파일을 조회
        file_list = {'id': file.id, 'name': file.file.name, 'uploaded_at': file.uploaded_at}
        return Response(file_list, status=status.HTTP_200_OK)
    
    
from .models import Comment
from .serializers import CommentSerializer

class CommentListCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
from .models import MapMarkerLocation
from .serializers import MapMarkerLocationSerializer

class MapMarkerLocationListCreate(generics.ListCreateAPIView):
    queryset = MapMarkerLocation.objects.all()
    serializer_class = MapMarkerLocationSerializer

class MapMarkerLocationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = MapMarkerLocation.objects.all()
    serializer_class = MapMarkerLocationSerializer