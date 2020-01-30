from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # path('chemocobra', metabolic_views.MetabolicAppView.as_view(),name='metabolic_app'),
    path('chemocobra/', include('chemocobra.urls')),
    path('museo-solidaridad/', include('museo_solidaridad.urls')),
    path('webdev-workshop/', include('geodata.urls')),
    path('', include('main.urls')),
]
