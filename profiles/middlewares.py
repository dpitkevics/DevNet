from django.core.urlresolvers import reverse
from django.http.response import HttpResponseRedirect


class LoginRequiredMiddleware(object):

    def process_request(self, request):
        if request.path_info.startswith('/profile') and not request.user.is_authenticated():
            return HttpResponseRedirect('%s?next=%s' % (reverse('account_login'), request.path_info))
