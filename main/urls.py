from django.urls import path
from django.shortcuts import render

def index(request):
    return render(request, "main/index.html")

def escher(request):
    return render(request, "main/escher-viz.html")

def molecules(request):
    return render(request, "main/substr-viz.html")

urlpatterns = [
    path('', index),
    path('escher-viz.html', escher),
    path('substr-viz.html', molecules),
]