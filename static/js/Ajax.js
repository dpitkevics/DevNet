function Ajax(params) {
    this.params = params || {};

    this.makeCall = function (params) {
        this.params = $.extend(this.params, params || {});

        $.ajax({
            url: this.params.url,
            type: this.params.type || 'post',
            data: this.params.data || {},
            success: this.params.successCallback || function () {},
            beforeSend: $.proxy(function (xhr) {
                var csrftoken = this.getCookie('csrftoken');
                xhr.setRequestHeader('X-CSRFToken', csrftoken);
            }, this)
        });
    };

    this.getCookie = function (name) {
        var cookieValue = null;

        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }

        return cookieValue;
    };
}