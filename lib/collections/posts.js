Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function(userId, post) { return ownsDocument(userId, post); },
    remove: function(userId, post) { return ownsDocument(userId, post); }
});
Posts.deny({
    update: function(userId, post, fieldNames) {
            return (_.without(fieldNames, 'seoUrl', 'title', 'text', 'published', 'summary').length > 0);
}});
Meteor.methods({
    postInsert: function (postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            seoUrl: String,
            title: String,
            published:Boolean,
            text: String,
            summary: String
        });
        var postWithSameLink = Posts.findOne({seoUrl: postAttributes.seoUrl});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }
        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username?user.username:(user.emails&&user.emails.length>0?user.emails[0].address:""),
            creationDate: new Date(),
            commentsCount: 0
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        };
    }
});