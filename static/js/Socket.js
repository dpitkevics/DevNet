function Socket (params) {
    this.socketUrl = params.socketUrl;

    this.io = null;

    this.connect = function () {
        this.io = io.connect(this.socketUrl);

        this.attachSocketEvents();
    };

    this.attachSocketEvents = function () {
        this.io.on('message', $.proxy(this.onMessage, this));
    };

    this.onMessage = params.onMessage;

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