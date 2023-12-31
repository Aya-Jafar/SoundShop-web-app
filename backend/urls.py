
from django.contrib import admin
from django.urls import include, path,re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    path('store/', include('store.urls')), 

    path('auth/', include('authentication.urls')),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

