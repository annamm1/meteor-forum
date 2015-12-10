Comments = new Meteor.Collection('comments');

Meteor.methods({
    commentInsert: function (commentAttributes) {
        check (Meteor.userId(), String);
        check(commentAttributes, {
            postId: String,
            body: String
        });

        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);

        if (!post)
            throw new Meteor.Error('invalid-comment', 'You must comment on a post');

        comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.username?user.username:(user.emails&&user.emails.length>0?user.emails[0].address:""),
            submitted: new Date()
        });

        // update the post with the number of comments
        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        // create the comment, save the id
        comment._id = Comments.insert(comment);

        createCommentNotification(comment);

        return comment._id;
    }
});
