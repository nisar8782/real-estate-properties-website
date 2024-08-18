from django.contrib import admin
from .models import userCompanyModel, userModel, addressesModel, propertyModel,imagesModel

# Register your models here.
admin.site.register(userCompanyModel)
admin.site.register(userModel)
admin.site.register(addressesModel)
admin.site.register(propertyModel)
admin.site.register(imagesModel)
