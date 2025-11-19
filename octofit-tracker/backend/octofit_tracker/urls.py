"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('octofit_tracker.api_urls')),
]

# Root endpoint to show API base URL
from django.http import JsonResponse
import os
def api_base_url(request):
    codespace = os.environ.get('CODESPACE_NAME')
    if codespace:
        url = f'https://{codespace}-8000.app.github.dev/api/'
    else:
        url = 'http://localhost:8000/api/'
    return JsonResponse({'api_base_url': url})

urlpatterns.insert(0, path('', api_base_url))

