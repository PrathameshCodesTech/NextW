from django.urls import path
from .views import home_view
from .views import about_view
from .views import contact_view


urlpatterns = [
    path('', home_view, name='Home'),
    path('about-us/', about_view, name='About'),
    path('contact-us/', contact_view, name='Contact'),
]
