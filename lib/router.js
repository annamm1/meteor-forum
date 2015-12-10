Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return [Meteor.subscribe('notifications')]
    }
});
PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: {creationDate: -1}, limit: this.postsLimit()};
    },
    subscriptions: function() {
        this.postsSub = Meteor.subscribe('publishedPosts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.posts().count() === this.postsLimit();
        var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
        return {
            ready: this.postsSub.ready,
            posts: this.posts(),
            nextPath: hasMore ? nextPath : null
        };
    }
});

Router.map(function () {
    this.route('postPage', {
        path: '/posts/:_id',
        waitOn: function () {
            return [Meteor.subscribe('comments', this.params._id),
            Meteor.subscribe('singlePost', this.params._id)];
        },
        data: function () {
            return Posts.findOne(this.params._id);
        }
    });
    this.route('postEdit', {
        path: '/posts/:_id/edit',
        waitOn: function() {
            return Meteor.subscribe('singlePost', this.params._id);
        },
        data: function () {
            return Posts.findOne(this.params._id);
        }
    });
    this.route('/submit', {
        name: 'postSubmit',
        progressTick : false
    });
    this.route('postsList', {
        path: '/:postsLimit?',
        controller: PostsListController
    });
});

var requireLogin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: ['postSubmit', 'postEdit']});
Router.before(function () {
    clearErrors();
    this.next();
});