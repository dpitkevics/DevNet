function Project (params) {
    this.params = params;

    this.ajax = new Ajax();

    this.loadProjectItems = function () {
        this.ajax.makeCall({
            url: this.params.getProjectsUrl,
            successCallback: $.proxy(this.loadProjectItemsCallback, this)
        });
    };

    this.loadProjectItemsCallback = function (data) {
        this.renderProjectItems(data);
    };

    this.renderProjectItems = function (data) {
        for (var i in data) {
            var obj = data[i];

            this.renderProjectItem(obj);
        }

        $('.ui.rating')
            .rating()
        ;
    };

    this.renderProjectItem = function (obj) {
        var itemNode = mkE({
            tag: 'div',
            className: 'ui card',
            els: [
                {
                    tag: 'div',
                    className: 'content',
                    els: [
                        {
                            tag: 'div',
                            className: 'right floated meta',
                            text: moment(obj.created).format("Do MMM, YYYY")
                        },
                        {
                            tag: 'img',
                            className: 'ui avatar image',
                            attr: {
                                src: obj.author_avatar
                            }
                        },
                        {
                            tag: 'span',
                            text: obj.author_name
                        }
                    ]
                },
                {
                    tag: 'div',
                    className: 'image',
                    els: [
                        {
                            tag: 'img',
                            attr: {
                                src: obj.preview_image
                            }
                        }
                    ]
                },
                {
                    tag: 'div',
                    className: 'content',
                    els: [
                        {
                            tag: 'a',
                            className: 'header',
                            text: obj.title
                        }
                    ]
                },
                {
                    tag: 'div',
                    className: 'extra content',
                    els: [
                        {
                            tag: 'span',
                            className: 'right floated',
                            els: [
                                {
                                    tag: 'div',
                                    className: 'ui rating',
                                    attr: {
                                        'data-rating': obj.rating,
                                        'data-max-rating': 5
                                    }
                                }
                            ]
                        },
                        {
                            tag: 'i',
                            className: 'users icon'
                        },
                        {
                            tag: 'span',
                            text: obj.contributor_count + ' contributors'
                        }
                    ]
                }
            ]
        });

        itemNode.append(this.node);
    };

    this.renderProjectPanel = function () {
        this.loadProjectItems();

        this.node = mkE({
            tag: 'div',
            className: 'ui cards'
        });

        $("#project-feed").html(this.node);
    };
}