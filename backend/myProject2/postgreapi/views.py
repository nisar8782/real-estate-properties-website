from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authentication import BasicAuthentication, SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import generics
from rest_framework import mixins
from .serializers.permission import adminOrReadonlyPermission,propertyOwnerOrReadonlyPermission
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers.pagination import propertiesPagination

from .models import addressesModel, userCompanyModel, userModel, propertyModel
from .serializers.serializer import userCompanySerializer, CompanySerializer, usersSerializer, userSerializer, addressSerializers, addressSuggestionsSerializer, propertiesSerializer,propertySerializer, registerSerializer
# Create your views here.

class registration_view(APIView):
    def post(self, request):
        serializer = registerSerializer(data=request.data)
        print(serializer)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['username'] = account.username
            data['email'] = account.email
            refresh = RefreshToken.for_user(account)
            data['token'] = {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class logoutView(APIView):
    def post(self, request):
        print(request.user)
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

class addressListView(APIView):
    def get(self, request):
        params = dict(request.GET)
        print(params)
        if not params.get('city'):
            return Response({'Error':'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)
        if params.get('city')[0] == '':
            return Response([])
        if params.get('city'):
            addressObjects = addressesModel.objects.filter(CITY__icontains=params.get('city')[0]).values('CITY', 'REGION', 'POSTCODE').distinct()[:10]
            serializer = addressSuggestionsSerializer(addressObjects, many=True)
            return Response(serializer.data)
    def post(self, request):
        serializer = addressSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class userCompaniesListView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = userCompanyModel.objects.all()
    serializer_class = CompanySerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    # def get(self, request):
    #     userCompanyObjects = userCompanyModel.objects.all()
    #     userCompanyDataSerializer = CompanySerializer(userCompanyObjects, many=True)
    #     return Response(userCompanyDataSerializer.data)
    # def post(self, request):
    #     serializer = CompanySerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class userCompaniesDetailView(APIView):
    def get(self, request, slug):
        try:
            userCompanyObject = userCompanyModel.objects.get(slug=slug)
            userCompanyDataSerializer = CompanySerializer(userCompanyObject)
            return Response(userCompanyDataSerializer.data)
        except:
            return Response({'Error':'company Not Found'}, status=status.HTTP_404_NOT_FOUND)
    def put(self, request, slug):
        try:
            userCompanyObject = userCompanyModel.objects.get(slug=slug)
            serializer = userCompanySerializer(userCompanyObject, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'Error':'company Not Found'}, status=status.HTTP_404_NOT_FOUND)

class usersListView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = userModel.objects.all()
    serializer_class = usersSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    # def get(self, request):
    #     usersObjects = userModel.objects.all()
    #     usersDataSerializer = usersSerializer(usersObjects, many=True)
    #     return Response(usersDataSerializer.data)
    # def post(self, request):
    #     serializer = userSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class userDetailView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
    queryset = userModel
    serializer_class = userSerializer
    lookup_field = 'username'
    # authentication_classes = [SessionAuthentication]
    permission_classes = [adminOrReadonlyPermission]
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    # def get(self, request, username):
    #     try:
    #         userObject = userModel.objects.get(username=username)
    #         userDataSerializer = userSerializer(userObject)
    #         return Response(userDataSerializer.data)
    #     except:
    #         return Response({'Error':'user Not Found'}, status=status.HTTP_404_NOT_FOUND)
    # def put(self, request, username):
    #     try:
    #         userObject = userModel.objects.get(username=username)
    #         serializer = userSerializer(userObject, data=request.data)
    #         if serializer.is_valid():
    #             serializer.save()
    #             return Response(serializer.data)
    #         else:
    #             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #     except:
    #         return Response({'Error':'user Not Found'}, status=status.HTTP_404_NOT_FOUND)


class propertiesListView(APIView):
    def get(self, request):
        params = dict(request.GET)
        if params:
            if params.get('latest') and params['latest'][0]=='true':
                propertiesObjects = propertyModel.objects.all().order_by('-createdAt')
                serializer = propertiesSerializer(propertiesObjects, many=True)
                return Response(serializer.data[:3])
            if params.get('type') and params['type'][0] not in ['buy', 'rent', 'sold']:
                return Response({'Error':'Not Acceptable'}, status=status.HTTP_406_NOT_ACCEPTABLE)
            if params.get('type') and params.get('city'):
                if params['type'][0] == 'buy':
                    params['type'][0] = 'sale'
                propertiesObjects = propertyModel.objects.filter(slug__icontains=params['city'][0], saleStatus__icontains = params['type'][0])
            elif params.get('type'):
                if params['type'][0] == 'buy':
                    params['type'][0] = 'sale'
                propertiesObjects = propertyModel.objects.filter(saleStatus__icontains = params['type'][0])
            elif params.get('city'):
                propertiesObjects = propertyModel.objects.filter(slug__icontains=params['city'][0])
            else:
                propertiesObjects = propertyModel.objects.all()
            paginator = propertiesPagination()
            result_page = paginator.paginate_queryset(propertiesObjects, request)
            serializer = propertiesSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data) 
           
        else:
            propertiesObjects = propertyModel.objects.all()
            paginator = propertiesPagination()
            result_page = paginator.paginate_queryset(propertiesObjects, request)
            serializer = propertiesSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data) 
    def post(self, request):
        serializer = propertiesSerializer(data=request.data)
        # addUser = self.request.user
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class propertyDetailView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
    # authentication_classes = [BasicAuthentication]
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [SessionAuthentication]
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [SessionAuthentication]
    # permission_classes = [IsAuthenticatedOrReadOnly]
    # authentication_classes = [SessionAuthentication]
    queryset = propertyModel
    serializer_class = propertySerializer
    lookup_field = 'slug'
    permission_classes = [propertyOwnerOrReadonlyPermission]
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    # authentication_classes = [TokenAuthentication]
    
    # def get(self,request, slug):
    #     try:
    #         propertyDetails = propertyModel.objects.get(slug=slug)
    #         serializer = propertySerializer(propertyDetails)
    #         return Response(serializer.data)
    #     except:
    #         return Response({'Error':'property Not Found'}, status=status.HTTP_404_NOT_FOUND)
    # def put(self, request, slug):
    #     propertyDetails = propertyModel.objects.get(slug=slug)
    #     serializer = propertySerializer(propertyDetails, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)