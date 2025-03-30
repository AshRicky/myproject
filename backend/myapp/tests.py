from django.test import TestCase
from .models import Item
from rest_framework.test import APIClient
from rest_framework import status

class ItemTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.item1 = Item.objects.create(name="Laptop", category="Electronics", price=1200.00)
        self.item2 = Item.objects.create(name="Phone", category="Electronics", price=800.00)

    # 1. Test if Item model is working
    def test_item_creation(self):
        self.assertEqual(Item.objects.count(), 2)

    # 2. Test GET /api/items/
    def test_get_items(self):
        response = self.client.get("/api/items/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    # 3. Test POST /api/items/
    def test_create_item(self):
        data = {"name": "Tablet", "category": "Electronics", "price": 500.00}
        response = self.client.post("/api/items/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Item.objects.count(), 3)

    # 4. Test GET /api/items/<id>/
    def test_get_item(self):
        response = self.client.get(f"/api/items/{self.item1.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Laptop")

    # 5. Test PUT /api/items/<id>/ (Update)
    def test_update_item(self):
        data = {"name": "Updated Laptop", "category": "Electronics", "price": 1500.00}
        response = self.client.put(f"/api/items/{self.item1.id}/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.item1.refresh_from_db()
        self.assertEqual(self.item1.name, "Updated Laptop")

    # 6. Test DELETE /api/items/<id>/
    def test_delete_item(self):
        response = self.client.delete(f"/api/items/{self.item1.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Item.objects.count(), 1)


# Create your tests here.
