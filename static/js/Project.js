function Project (params) {
    this.params = params;

    this.ajax = new Ajax();

    this.initedRatings = [];

    this.loadProjectItems = function () {
        this.ajax.makeCall({
            url: this.params.ajaxUrl,
            type: 'get',
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

        var that = this;
        var rating = $('.ui.rating')
            .rating({
                    onRate: function (rate) {
                        that.onRate(rate, $(this));
                    }
                })
        ;
    };

    this.renderProjectItem = function (obj) {
        var itemNode = mkE({
            tag: 'div',
            className: 'ui card',
            attr: {
                'data-slug': obj.slug
            },
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
                            text: obj.author
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
                            href: '/project/view/' + obj.slug,
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
                                        'data-rating': Math.round(obj.rating),
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

        console.log(itemNode);
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

    this.onRate = function (rate, object) {
        var slug = object.parents('div.ui.card').data('slug');

        if ($.inArray(slug, this.initedRatings) < 0) {
            this.initedRatings.push(slug);

            return false;
        }

        this.ajax.makeCall({
            url: '/ratings/add/',
            successCallback: $.proxy(this.onRateCallback, this),
            data: {
                'rate': rate,
                'app_label': 'projects',
                'model': 'project',
                'slug': slug
            }
        });
    };

    this.onRateCallback = function (data) {

    };
}