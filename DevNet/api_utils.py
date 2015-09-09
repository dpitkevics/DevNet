from django.core.urlresolvers import reverse
from rest_framework.test import APIClient

import json


api_client = APIClient()


def get(url_name):
    response = api_client.get(reverse(url_name), format='json')

    return json.loads(response.content.decode('utf-8'))
