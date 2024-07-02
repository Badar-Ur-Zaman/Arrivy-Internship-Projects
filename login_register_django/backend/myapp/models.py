from django.db import models

class AuthUser(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    username = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    # Add other fields as necessary

    class Meta:
        managed = False  # No migrations will be created for this model
        db_table = 'auth_user'
