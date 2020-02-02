from django.urls import path
from django.shortcuts import render
from personal.settings import BASE_DIR
from django.http import HttpResponse
import os

def index(request):
    return render(request, "main/index.html")

def escher(request):
    return render(request, "main/escher-viz.html")

def molecules(request):
    return render(request, "main/substr-viz.html")

def index_dev(request):
    return render(request, "main/index-dev.html")

def mastercss(request):
    with open(os.path.join(BASE_DIR, 'main', 'static', 'main', 'css', 'master.css')) as f:
        return HttpResponse(f.read(), content_type="text/css")

urlpatterns = [
    path('', index),
    path('metabolic-modelling-viz', escher),
    path('chemoinformatics-viz', molecules),
    path('index-dev', index_dev),
    path('main/static/main/css/master.css', mastercss)
]