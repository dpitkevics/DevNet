function Notification (params) {
    this.params = params;

    this.ajax = new Ajax();

    this.loadNotificationItems = function (searchQuery) {
        var data;
        if (typeof searchQuery != 'undefined') {
            data = {
                query: searchQuery
            };
        } else {
            data = {};
        }

        this.ajax.makeCall({
            url: this.params.getNotificationUrl,
            successCallback: $.proxy(this.loadNotificationItemsCallback, this),
            data: data
        });
    };

    this.loadNotificationItemsCallback = function (data) {
        this.renderNotificationItems(data);

        $(this.searchNode).removeClass('loading');
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
                            text: obj.verb
                        },
                        {
                            tag: 'div',
                            className: 'description',
                            els: [
                                {
                                    tag: 'p',
                                    text: obj.description
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
                                        'src': obj.avatar
                                    }
                                },
                                {
                                    tag: 'span',
                                    text: obj.username
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
                    className: 'ui divider hidden'
                },
                this.searchNode = mkE({
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
                                }),
                                {
                                    tag: 'i',
                                    className: 'search icon'
                                }
                            ]
                        }
                    ]
                }),
                {
                    tag: 'div',
                    className: 'ui divider'
                },
                this.notificationItemNode = mkE({
                    tag: 'div'
                })
            ]
        });

        this.searchInputNode.addEventListener('keyup', $.proxy(this.onSearchInputChange, this));

        $('#notification-sidebar').html(this.node);
    };

    this.onSearchInputChange = function () {
        if (typeof this.timer == 'undefined') {
            this.timer = 0;
        }

        clearTimeout(this.timer);
        this.timer = setTimeout($.proxy(function () {
            $(this.searchNode).addClass('loading');
            this.loadNotificationItems($(this.searchInputNode).val());
        }, this), 500);
    };

    this.sendNotification = function (receiver, message, description, successCallback) {
        $.ajax({
            url: this.params.sendNotificationUrl,
            type: 'POST',
            data: {
                'receiver': receiver,
                'verb': message,
                'description': description
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