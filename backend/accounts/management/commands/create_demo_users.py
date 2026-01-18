from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Create demo users for testing'

    def handle(self, *args, **options):
        # Create demo users
        demo_users = [
            {
                'username': 'admin',
                'password': 'admin123',
                'email': 'admin@healthbridge.com',
                'first_name': 'Admin',
                'last_name': 'User',
                'role': 'ADMIN',
                'phone_number': '9876543210',
                'is_staff': True,
                'is_superuser': True,
            },
            {
                'username': 'doctor1',
                'password': 'demo123',
                'email': 'doctor1@healthbridge.com',
                'first_name': 'Dr. Rajesh',
                'last_name': 'Kumar',
                'role': 'DOCTOR',
                'phone_number': '9876543211',
            },
            {
                'username': 'coworker1',
                'password': 'demo123',
                'email': 'coworker1@healthbridge.com',
                'first_name': 'Priya',
                'last_name': 'Sharma',
                'role': 'COWORKER',
                'phone_number': '9876543212',
            },
        ]

        for user_data in demo_users:
            username = user_data['username']
            password = user_data.pop('password')
            
            # Check if user already exists
            if User.objects.filter(username=username).exists():
                self.stdout.write(
                    self.style.WARNING(f'User {username} already exists, skipping...')
                )
                continue
            
            # Create user
            user = User.objects.create_user(**user_data)
            user.set_password(password)
            user.save()
            
            self.stdout.write(
                self.style.SUCCESS(f'Successfully created user: {username}')
            )

        self.stdout.write(
            self.style.SUCCESS('Demo users created successfully!')
        )
