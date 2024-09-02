from django.db import models

class Post(models.Model):
    count = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.count

class Boxes(models.Model):
    listbox = models.TextField(max_length=100)
    checkbox = models.TextField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.listbox, self.checkbox
    
class UploadedFile(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name, self.file.verbose_name

class Member(models.Model):
    name = models.TextField(max_length=30)
    password = models.TextField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name, self.password
    
class UploadedProFileImage(models.Model):
    file = models.FileField(upload_to='uploads/profile/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name, self.file.verbose_name
    
class Comment(models.Model):
    comment = models.TextField(max_length=60)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.comment
    
class MapMarkerLocation(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.latitude, self.longitude