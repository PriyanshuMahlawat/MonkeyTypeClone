from . import views
from django.urls import path


urlpatterns = [
    path("settings/",views.auth_view,name="auth_view"),
    path("",views.typeView,name="test"),
    path("about/",views.aboutView,name="about"),
    path("api/records/",views.pastRecordAPIView.as_view(),name="records"),
    path("api/recordsalias/",views.pastRecordAliasAPIView.as_view(),name="recordsAlias"),
    path("leaderboard/",views.leaderboardView,name="leaderboard"),
    path("logout/",views.user_logout,name="logout"),
    
]
