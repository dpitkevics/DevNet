function Notification (params) {
    this.params = params;

    this.ajax = new Ajax();

    this.loadNotificationItems = function () {
        this.ajax.makeCall({
            url: this.params.getNotificationUrl,
            successCallback: $.proxy(this.loadNotificationItemsCallback, this)
        });
    };

    this.loadNotificationItemsCallback = function (data) {
        this.renderNotificationItems(data);
    };

    this.renderNotificationItems = function (data) {
        mkE.clearNode(this.notificationItemNode);

        for (var i in data) {
            var obj = data[i];

            this.renderNotificationItem(obj);
        }
    };

    this.renderNotificationItem = function (obj) {
        if (obj.verb.length === 0) {
            return false;
        }

    //    <div class="ui link card">
    //    <div class="content">
    //        <div class="header">New contributor</div>
    //        <div class="description">
    //            <p>
    //                I am now contributing to "DevNet social network"
    //            </p>
    //        </div>
    //    </div>
    //
    //    <div class="extra content">
    //        <i class="clock icon"></i>
    //        10 minutes ago
    //    </div>
    //
    //    <div class="extra content">
    //        <div class="author">
    //            <img class="ui avatar image" src="http://semantic-ui.com/images/avatar/small/matt.jpg"> Matt
    //        </div>
    //    </div>
    //</div>

        var itemNode = mkE({
            tag: 'div',
            className: 'ui link card',
            els: [
                {
                    tag: 'div',
                    className: 'content',
                    els: [
                        {
                            tag: 'div',
                            className: 'header',
                            text: 'New contributor'
                        },
                        {
                            tag: 'div',
                            className: 'description',
                            els: [
                                {
                                    tag: 'p',
                                    text: obj.verb
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'div',
                    className: 'extra content',
                    els: [
                        {
                            tag: 'i',
                            className: 'clock icon'
                        },
                        {
                            tag: 'span',
                            text: moment(obj.timestamp).timeSince() + " ago"
                        }
                    ]
                },
                {
                    tag: 'div',
                    className: 'extra content',
                    els: [
                        {
                            tag: 'div',
                            className: 'author',
                            els: [
                                {
                                    tag: 'img',
                                    className: 'ui avatar image',
                                    attr: {
                                        'src': 'http://semantic-ui.com/images/avatar/small/matt.jpg'
                                    }
                                },
                                {
                                    tag: 'span',
                                    text: 'Matt'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        itemNode.append(this.notificationItemNode);
    };

    this.renderNotificationPanel = function () {
        this.loadNotificationItems();

        this.node = mkE({
            tag: 'div',
            id: 'notification-panel',
            els: [
                {
                    tag: 'div',
                    className: 'ui search',
                    els: [
                        {
                            tag: 'div',
                            className: 'ui icon input',
                            els: [
                                this.searchInputNode = mkE({
                                    tag: 'input',
                                    className: 'prompt',
                                    attr: {
                                        type: 'text',
                                        placeholder: 'Search...'
                                    }
                                })
                            ]
                        }
                    ]
                },
                {
                    tag: 'div',
                    className: 'ui divider'
                },
                this.notificationItemNode = mkE({
                    tag: 'div'
                })
            ]
        });

        $('#notification-sidebar').html(this.node);
    };

    this.toggleNotificationPanel = function (event) {
        event.preventDefault();

        var nodeObject = $(this.node);
        var parentNode = nodeObject.parent();

        var pixelsFromRight = 0;

        if (parentNode.css('right').replace('px', '') == 0) {
            pixelsFromRight = -250;
        } else {
            this.markAsRead();
        }

        parentNode.animate({
            right: pixelsFromRight
        }, 300);
    };

    this.sendNotification = function (receiver, message, successCallback) {
        $.ajax({
            url: this.params.sendNotificationUrl,
            type: 'POST',
            data: {
                'receiver': receiver,
                'verb': message
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