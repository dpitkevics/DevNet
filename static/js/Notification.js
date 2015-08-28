function Notification (params) {
    this.params = params;

    this.sendNotification = function (receiver, message, successCallback) {
        $.ajax({
            url: this.params.sendNotificationUrl,
            type: 'POST',
            data: {
                'receiver': receiver,
                'message': message
            },
            success: successCallback,
            beforeSend: $.proxy(function (xhr) {
                var csrftoken = this.params.socket.getCookie('csrftoken');
                xhr.setRequestHeader('X-CSRFToken', csrftoken);
            }, this)
        });
    };

    this.markAsRead = function () {
        $.ajax({
            url: this.params.markAsReadUrl,
            type: "POST",
            beforeSend: $.proxy(function (xhr) {
                var csrftoken = this.params.socket.getCookie("csrftoken");
                xhr.setRequestHeader('X-CSRFToken', csrftoken);
            }, this)
        });
    };

    this.setNotificationCounter = function (count) {
        $("#notification-count").text(count);
    };
}