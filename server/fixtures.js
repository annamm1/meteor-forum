if (Posts.find().count() === 0) {
    Posts.insert({
        title: 'Post 1',
        published: true,
        creationDate: new Date(),
        seoUrl: 'post_1',
        author: 'unknown',
        commentsCount: 0,
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
        ' reprehenderit in voluptate velit esse cillum dolore ' +
        'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
    });

    Posts.insert({
        title: 'Post  2',
        published: true,
        creationDate: new Date(),
        seoUrl: 'post_2',
        author: 'unknown',
        commentsCount: 0,
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
        ' reprehenderit in voluptate velit esse cillum dolore ' +
        'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
    });

    Posts.insert({
        title: 'Post  3',
        published: true,
        creationDate: new Date(),
        seoUrl: 'post_3',
        author: 'unknown',
        commentsCount: 0,
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
        ' reprehenderit in voluptate velit esse cillum dolore ' +
        'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
    });

    var postId = Posts.insert({
        title: 'Post  4',
        published: true,
        creationDate: new Date(),
        seoUrl: 'post_4',
        author: 'unknown',
        commentsCount: 2,
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
        ' reprehenderit in voluptate velit esse cillum dolore ' +
        'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
    });
    // create two users
    var tomId = Meteor.users.insert({
        profile: {name: 'Tom Coleman'}
    });
    var tom = Meteor.users.findOne(tomId);
    var sachaId = Meteor.users.insert({
        profile: {name: 'Sacha Greif'}
    });
    var sacha = Meteor.users.findOne(sachaId);
    var now = new Date().getTime();
    Comments.insert({
        postId: postId,
        userId: tom._id,
        author: tom.profile.name,
        submitted: now - 5 * 3600 * 1000,
        body: 'Interesting project Sacha, can I get involved?'
    });

    Comments.insert({
        postId: postId,
        userId: sacha._id,
        author: sacha.profile.name,
        submitted: now - 3 * 3600 * 1000,
        body: 'You sure can Tom!'
    });

    for (var i = 0; i < 10; i++) {
        Posts.insert({
            title: 'Test post #' + i,
            author: sacha.profile.name,
            userId: sacha._id,
            commentsCount: 0,
            published: true,
            creationDate: new Date(),
            seoUrl: 'post_4',
            summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            text: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
        });
    }
}
