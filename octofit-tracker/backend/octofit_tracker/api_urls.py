from rest_framework import routers
from django.urls import path, include
from octofit_tracker import api_views

router = routers.DefaultRouter()
router.register(r'users', api_views.UserViewSet, basename='user')
router.register(r'teams', api_views.TeamViewSet, basename='team')
router.register(r'activities', api_views.ActivityViewSet, basename='activity')
router.register(r'leaderboard', api_views.LeaderboardViewSet, basename='leaderboard')
router.register(r'workouts', api_views.WorkoutViewSet, basename='workout')

urlpatterns = [
    path('', include(router.urls)),
]
