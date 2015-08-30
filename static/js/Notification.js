function Notification (params) {
    this.params = params;

    this.ajax = new Ajax();

    this.notificationButton = $("#notification-button");

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

        var itemNode = mkE({
            tag: 'div',
            className: 'row',
            els: [
                {
                    tag: 'div',
                    className: 'col-md-12',
                    els: [
                        {
                            tag: 'div',
                            className: 'col-md-3',
                            els: [
                                {
                                    tag: 'i',
                                    className: 'fa fa-flag notification-icon' + (obj.unread ? ' color-green' : '')
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            className: 'col-md-8',
                            els: [
                                {
                                    tag: 'div',
                                    className: 'row',
                                    els: [
                                        {
                                            tag: 'div',
                                            className: 'col-md-12',
                                            els: [
                                                {
                                                    tag: 'h4',
                                                    text: obj.level
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tag: 'div',
                                    className: 'row',
                                    els: [
                                        {
                                            tag: 'div',
                                            className: 'col-md-12',
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
                                    className: 'row',
                                    els: [
                                        {
                                            tag: 'div',
                                            className: 'col-md-12',
                                            els: [
                                                {
                                                    tag: 'small',
                                                    text: moment(obj.timestamp).timeSince() + " ago"
                                                }
                                            ]
                                        }
                                    ]
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
                    className: 'col-md-12',
                    els: [
                        {
                            tag: 'input',
                            className: 'form-control',
                            prop: {
                                placeholder: 'Search...'
                            }
                        },
                        {
                            tag: 'ul',
                            className: 'nav nav-tabs nav-justified',
                            prop: {
                                role: 'tablist'
                            },
                            els: [
                                {
                                    tag: 'li',
                                    className: 'active',
                                    attr: {
                                        role: 'presentation'
                                    },
                                    els: [
                                        {
                                            tag: 'a',
                                            href: '#notifications-all',
                                            text: 'All',
                                            attr: {
                                                'aria-controls': 'notifications-all',
                                                'role': 'tab',
                                                'data-toggle': 'tab'
                                            }
                                        }
                                    ]
                                },
                                {
                                    tag: 'li',
                                    prop: {
                                        role: 'presentation'
                                    },
                                    els: [
                                        {
                                            tag: 'a',
                                            href: '#notifications-online',
                                            text: 'Online',
                                            attr: {
                                                'aria-controls': 'notifications-online',
                                                'role': 'tab',
                                                'data-toggle': 'tab'
                                            }
                                        }
                                    ]
                                },
                                {
                                    tag: 'li',
                                    prop: {
                                        role: 'presentation'
                                    },
                                    els: [
                                        {
                                            tag: 'a',
                                            href: '#notifications-offline',
                                            text: 'Offline',
                                            attr: {
                                                'aria-controls': 'notifications-offline',
                                                'role': 'tab',
                                                'data-toggle': 'tab'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        this.notificationItemNode = mkE({
                            tag: 'div'
                        })
                    ]
                }
            ]
        });

        this.notificationButton.on('click', $.proxy(this.toggleNotificationPanel, this));


        $('#notification-sidebar').html(this.node);
    };

    this.toggleNotificationPanel = function (event) {
        event.preventDefault();

        var nodeObject = $(this.node);
        var parentNode = nodeObject.parent();

        var pixelsFromRight = 0;

        if (parentNode.css('right').replace('px', '') == 0) {
            pixelsFromRight = -250;
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