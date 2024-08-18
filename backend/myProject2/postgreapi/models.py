from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
# Create your models here.

class userManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("username is required")
        # extra_fields['email'] = self.normalize_email(extra_fields['email'])
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using = self._db)
        return user
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('is_active',True)
        return self.create_user(email, password, **extra_fields)


class addressesModel(models.Model):

    pkaddress = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    LON = models.FloatField(blank=True, null = True)
    LAT = models.FloatField(blank=True, null = True)
    NUMBER = models.CharField(max_length=20, blank=True, null = True)
    STREET = models.CharField(max_length=255, blank=True, null = True)
    CITY = models.CharField(max_length=100)
    REGION = models.CharField(max_length=5)
    POSTCODE = models.CharField(max_length=10)
    ID = models.IntegerField(blank=True, null = True)
    HASH = models.CharField(max_length=255, blank=True, null = True)
    COUNTRY = models.CharField(max_length=10, blank=True, null = True)
    rawAddressLine = models.CharField(max_length=255, blank=True, null = True)
    stateAbbreviation = models.CharField(max_length=10, blank=True, null = True)
    displayType = models.CharField(max_length=20, blank=True, null = True)
    streetNumber = models.CharField(max_length=20, blank=True, null = True)
    suburb = models.CharField(max_length=100, blank=True, null = True)
    displayAddress = models.CharField(max_length=255, blank=True, null = True)
    isMatched = models.BooleanField(blank=True, null = True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    class Meta:
        db_table = 'addresses'
    def __str__(self):
        return self.displayAddress

class userCompanyModel(models.Model):
    pkuserCompany =  models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    creatorId =  models.IntegerField(blank=True, null = True),
    logo =  models.CharField(max_length=255, blank=True, null = True)
    banner =  models.CharField(max_length=255, blank=True, null = True)
    primaryAgencyColor =  models.CharField(max_length=10, blank=True, null = True)
    colorsApplyTo =  models.CharField(max_length=255, blank=True, null = True)
    slug =  models.CharField(max_length=255, blank=True, null = True)
    aboutUs =  models.TextField(blank=True, null = True)
    webSite =  models.CharField(max_length=255, blank=True, null = True)
    facebookUrl =  models.CharField(max_length=255, blank=True, null = True)
    twitterUrl =  models.CharField(max_length=255, blank=True, null = True)
    instagramUrl =  models.CharField(max_length=255, blank=True, null = True)
    linkedInUrl =  models.CharField(max_length=255, blank=True, null = True)
    youtubeChannelUrl =  models.CharField(max_length=255, blank=True, null = True)
    cellPhone =  models.CharField(max_length=20, blank=True, null = True)
    telephone =  models.CharField(max_length=20, blank=True, null = True)
    email =  models.CharField(max_length=255, blank=True, null = True)
    realEstateLicense =  models.CharField(max_length=50, blank=True, null = True)
    address =  models.CharField(max_length=255, blank=True, null = True)
    suburb =  models.CharField(max_length=100, blank=True, null = True)
    postcode =  models.CharField(max_length=10, blank=True, null = True)
    state =  models.CharField(max_length=50, blank=True, null = True)
    country =  models.CharField(max_length=50, blank=True, null = True)
    last30daysSale =  models.IntegerField(blank=True, null = True)
    languages =  models.CharField(max_length=255, blank=True, null = True)
    teamSize =  models.IntegerField(blank=True, null = True)
    companyName =  models.CharField(max_length=255, blank=True, null = True)
    websiteAddress =  models.CharField(max_length=255, blank=True, null = True)
    companyPhoneNumber =  models.CharField(max_length=20, blank=True, null = True)
    ABN_ACN =  models.CharField(max_length=50, blank=True, null = True)
    mainBusinessLocation =  models.CharField(max_length=255, blank=True, null = True)
    lat =  models.FloatField(blank=True, null = True)
    lon =  models.FloatField(blank=True, null = True)
    dataSourceSite =  models.CharField(max_length=50, blank=True, null = True)
    dataSourceId =  models.CharField(max_length=50, blank=True, null = True)
    syncApp =  models.CharField(max_length=50, blank=True, null = True)
    createdAt =  models.DateTimeField(auto_now_add=True)
    updatedAt =  models.DateTimeField(auto_now=True)
    # fkcompany = models.ForeignKey(userModel, related_name='companyData', on_delete=models.CASCADE)
    class Meta:
        db_table = 'usercompanies'
    def __str__(self):
        return self.companyName

class userModel(AbstractUser):
    pkuser = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    username = models.CharField(unique=True, max_length=50, blank=True, null = True)
    firstName = models.CharField(max_length=50, blank=True, null = True)
    lastName = models.CharField(max_length=50, blank=True, null = True)
    email = models.CharField(max_length=255, blank=True, null = True)
    password = models.CharField(max_length=255, blank=True, null = True)
    zipCode = models.CharField(max_length=10, blank=True, null = True)
    age = models.IntegerField(blank=True, null = True)
    gender = models.CharField(max_length=10, blank=True, null = True)
    phoneno = models.CharField(max_length=20, blank=True, null = True)
    accountType = models.CharField(max_length=20, blank=True, null = True)
    userType = models.CharField(max_length=20, blank=True, null = True)
    title = models.TextField(blank=True, null = True)
    jobCategory = models.CharField(max_length=100, blank=True, null = True)
    bio = models.TextField(blank=True, null = True)
    about = models.TextField(blank=True, null = True)
    skills = models.TextField(blank=True, null = True)
    languages = models.TextField(blank=True, null = True)
    facebookUrl = models.CharField(max_length=255, blank=True, null = True)
    twitterUrl = models.CharField(max_length=255, blank=True, null = True)
    linkedInUrl = models.CharField(max_length=255, blank=True, null = True)
    instagramUrl = models.CharField(max_length=255, blank=True, null = True)
    youTubeChannelUrl = models.CharField(max_length=255, blank=True, null = True)
    personalWebsiteUrl = models.CharField(max_length=255, blank=True, null = True)
    notification = models.TextField(blank=True, null = True)
    displayAddress = models.CharField(max_length=255, blank=True, null = True)
    line1 = models.CharField(max_length=255, blank=True, null = True)
    line2 = models.CharField(max_length=255, blank=True, null = True)
    suburb = models.CharField(max_length=100, blank=True, null = True)
    postcode = models.CharField(max_length=10, blank=True, null = True)
    state = models.CharField(max_length=50, blank=True, null = True)
    country = models.CharField(max_length=10, blank=True, null = True)
    resetToken = models.CharField(max_length=5, blank=True, null = True)
    uid = models.IntegerField(blank=True, null = True)
    provider = models.CharField(max_length=50, blank=True, null = True)
    photoURL = models.URLField(blank=True, null = True)
    # companyId = INTEGER REFERENCES usercompanies(pkusercompany, blank=True, null = True)
    fkcompanyid = models.ForeignKey(userCompanyModel, related_name='users', on_delete=models.CASCADE, null=True, blank=True)
    rank = models.IntegerField(blank=True, null = True)
    yearOfBirth = models.IntegerField(blank=True, null = True)
    dataSourceSite = models.CharField(max_length=50, blank=True, null = True)
    dataSourceId = models.CharField(max_length=50, blank=True, null = True)
    lastUpdatedByAdminId = models.IntegerField(blank=True, null = True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ['email']
    class Meta:
        db_table = 'users'
        # swappable = 'AUTH_USER_MODEL'
    objects = userManager()
    def __str__(self):
        return self.username
class propertyModel(models.Model):
    pkproperty = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    fkuser = models.ManyToManyField(userModel, related_name='userproperty')
    viewCount = models.IntegerField(blank=True, null = True)
    isAuctionProperty = models.BooleanField(default=True)
    propertyType = models.CharField(max_length=100, blank=True, null = True)
    fkaddress = models.ForeignKey(addressesModel, related_name='property', on_delete=models.CASCADE, null=True, blank=True)
    lastSaleRecord = models.TextField(blank=True, null = True)
    price = models.CharField(max_length=100, blank=True, null = True)
    display = models.BooleanField(default=True)
    saleStatus = models.CharField(max_length=20, blank=True, null = True)
    isActive = models.BooleanField(default=True)
    slug = models.CharField(max_length=255, blank=True, null = True)
    lat = models.FloatField(blank=True, null = True)
    lon = models.FloatField(blank=True, null = True)
    buildingDistance = models.FloatField(blank=True, null = True)
    carSpaces = models.IntegerField(blank=True, null = True)
    bathRooms = models.IntegerField(blank=True, null = True)
    bedRooms = models.IntegerField(blank=True, null = True)
    floorSize = models.IntegerField(blank=True, null = True)
    landArea = models.IntegerField(blank=True, null = True)
    # inside = text[]
    # outside = text[]
    insideFeatures = models.TextField(blank=True, null = True)
    outsideFeatures = models.TextField(blank=True, null = True)
    headline = models.TextField(blank=True, null = True)
    description = models.TextField(blank=True, null = True)
    propertyCategory = models.CharField(max_length=50, blank=True, null = True)
    site = models.CharField(max_length=255, blank=True, null = True)
    siteid = models.CharField(max_length=255, blank=True, null = True)
    videoTourUrl = models.CharField(max_length=255, blank=True, null = True)
    virtualTourUrl = models.CharField(max_length=255, blank=True, null = True)
    yearBuilt = models.IntegerField(blank=True, null = True)
    staticMapUrl = models.URLField(max_length=5000,blank=True, null = True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    deletedAt = models.DateTimeField(null=True)
    class Meta:
        db_table = 'properties'
    def __str__(self):
        return self.slug
class imagesModel(models.Model):
    pkimages = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    fkproperty = models.ForeignKey(propertyModel, related_name='images', on_delete=models.CASCADE, null=True, blank=True)
    mediaType = models.CharField(max_length=20, blank=True, null = True)
    url = models.URLField(blank=True, null = True)
    category = models.CharField(max_length=20, blank=True, null = True)
    class Meta:
        db_table = 'images'
    def __str__(self):
        return self.url
# class userPropertyRelationModel(models.Model):
#     pkuserproperty = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
#     fkproperty = models.ForeignKey(propertyModel, related_name='properties', on_delete=models.CASCADE, null=True, blank=True)
#     fkuser = models.ForeignKey(userModel, related_name='users', on_delete=models.CASCADE, null=True, blank=True)
#     class Meta:
#         db_table = 'userPropertyRelation'
# class insideFeatureModel(models.Model):
