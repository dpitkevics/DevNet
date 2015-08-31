from django.conf import settings

# define the minimal weight of a tag in the tagcloud
RATINGS_MIN = getattr(settings, 'RATINGS_MIN', 0)

# define the maximum weight of a tag in the tagcloud 
RATINGS_MAX = getattr(settings, 'RATINGS_MAX', 10)
