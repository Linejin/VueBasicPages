from django.urls import path
from .views import PostListCreate, PostRetrieveUpdateDestroy
from .views import BoxesListCreate, BoxesRetrieveUpdateDestroy
from .views import MemberRegisterView, MemberLoginView
from .views import UploadFileView, RecentFilesView, DownloadFileView
from .views import UploadProfileImageView, RecentProfileImageView
from .views import CommentListCreate, CommentRetrieveUpdateDestroy
from .views import MapMarkerLocationListCreate, MapMarkerLocationRetrieveUpdateDestroy
from .views import check_auth, logout_view, force_logout_all_view


urlpatterns = [
    path('posts/', PostListCreate.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostRetrieveUpdateDestroy.as_view(), name='post-detail'),
    path('boxes/', BoxesListCreate.as_view(), name='boxes-list-create'),
    path('boxes/<int:pk>/', BoxesRetrieveUpdateDestroy.as_view(), name='boxes-detail'),
    path('upload/', UploadFileView.as_view(), name='upload_file'),
    path('recent/', RecentFilesView.as_view(), name='recent_files'),
    path('download/<str:filename>/', DownloadFileView.as_view(), name='download_file'),
    path('signup/', MemberRegisterView.as_view(), name='member-signup'),
    path('login/', MemberLoginView.as_view(), name='member-login'),
    path('check-auth/', check_auth, name='check_auth'),
    path('logout/', logout_view, name='member-logout'),
    path('image/', UploadProfileImageView.as_view(), name='member-login'),
    path('image/recent/', RecentProfileImageView.as_view(), name='member-login'),
    path('comment/', CommentListCreate.as_view(), name='comment-list-create'),
    path('comment/<int:pk>/', CommentRetrieveUpdateDestroy.as_view(), name='comment-detail'),
    path('map/marker', MapMarkerLocationListCreate.as_view(), name='mapmarker-list-create'),
    path('map/marker/<int:pk>/', MapMarkerLocationRetrieveUpdateDestroy.as_view(), name='mapmarker-detail'),
    path('logout-all/', force_logout_all_view, name='force_logout_all'),
]