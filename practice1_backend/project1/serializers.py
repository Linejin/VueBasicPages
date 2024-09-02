from rest_framework import serializers
from .models import Post
from .models import Boxes
from .models import UploadedFile
from .models import Member
from .models import UploadedProFileImage
from .models import Comment
from .models import MapMarkerLocation

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class BoxesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boxes
        fields = '__all__'
        
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = '__all__'
        
class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'
        
class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedProFileImage
        fields = '__all__'
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        
class MapMarkerLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapMarkerLocation
        fields = '__all__'