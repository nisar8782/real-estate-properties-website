from rest_framework import serializers
from ..models import addressesModel, userCompanyModel, userModel, propertyModel, imagesModel



class registerSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(style={'input_type':'password'}, write_only=True)
    class Meta:
        model = userModel
        fields = ['username', 'email', 'password', 'password_confirmation']
        extra_kwargs = {
            'password' : {'write_only':True}
        }
    def save(self):
        
        password = self.validated_data['password']
        password2 = self.validated_data['password_confirmation']
        if password != password2:
            raise serializers.ValidationError({'error':'password does not match'})
        if userModel.objects.filter(username = self.validated_data['username']).exists():
            raise serializers.ValidationError({'error':'email already exist'})
        account = userModel(username = self.validated_data['username'], email = self.validated_data['email'])
        account.set_password(password)
        account.save()
        return account



class addressSuggestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = addressesModel
        fields = ['CITY', 'REGION', 'POSTCODE']
class addressSerializers(serializers.ModelSerializer):
    class Meta:
        model = addressesModel
        fields = ['LON', 'LAT', 'NUMBER', 'STREET', 'CITY', 'REGION', 'POSTCODE', 'displayAddress']

class usersSerializer(serializers.ModelSerializer):
    # companyData = userCompanySerializer(read_only=True)
    # fkcompanyid = 
    class Meta:
        model = userModel
        fields = ['pkuser','first_name','last_name','username','email','phoneno','jobCategory','displayAddress','photoURL']
        # exclude = ['password']

class CompanySerializer(serializers.ModelSerializer):
    users = usersSerializer(many=True, read_only=True)
    class Meta:
        model = userCompanyModel
        fields = ['pkuserCompany','logo','banner','primaryAgencyColor','slug','cellPhone','telephone','email','address','teamSize','companyName','companyPhoneNumber','users']
class userCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = userCompanyModel
        fields = ['pkuserCompany', 'companyName', 'logo', 'banner', 'primaryAgencyColor', 'colorsApplyTo', 'slug','address']
class userSerializer(serializers.ModelSerializer):
    fkcompanyid = userCompanySerializer(read_only=True)
    class Meta:
        model = userModel
        fields = ['pkuser','first_name','last_name','username','email','phoneno','title','jobCategory','displayAddress','photoURL','about','fkcompanyid']
        # exclude = ['password']
class imagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = imagesModel
        fields = "__all__"
# class userPropertyRelationSerializer(serializers.ModelSerializer):
#     fkuser = userSerializer(read_only=True)
#     class Meta:
#         model = userPropertyRelationModel
#         fields = "__all__"
class propertiesSerializer(serializers.ModelSerializer):
    fkaddress = addressSerializers(read_only=True)
    images = imagesSerializer(many=True, read_only=True)
    # properties = userPropertyRelationSerializer(many=True, read_only=True)
    # users = userPropertyRelationSerializer(many=True, read_only=True)
    class Meta:
        model = propertyModel
        fields = "__all__"
        # fields = ['fkaddress', 'price', 'slug', 'carSpaces', 'bathRooms', 'bedRooms', 'floorSize', 'landArea', 'createdAt','images','properties','propertyType','saleStatus','users','propertyCategory']
class propertySerializer(serializers.ModelSerializer):
    fkaddress = addressSerializers(read_only=True)
    images = imagesSerializer(many=True, read_only=True)
    # properties = userPropertyRelationSerializer(many=True, read_only=True)
    # users = userPropertyRelationSerializer(many=True, read_only=True)
    fkuser = userSerializer(many=True, read_only=True)
    class Meta:
        model = propertyModel
        fields = "__all__"