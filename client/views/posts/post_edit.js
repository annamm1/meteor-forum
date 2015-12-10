Template.postEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            seoUrl: $(e.target).find('[name=seoUrl]').val(),
            title: $(e.target).find('[name=title]').val(),
            published: $(e.target).find('[name=published]').is(':checked'),
            text: $(e.target).find('[name=text]').val(),
            summary: $(e.target).find('[name=summary]').val()
        }

        Posts.update(currentPostId, {$set: postProperties}, function(error) {
            if (error) {
                // display the error to the user
               throwError(error.reason);
            } else {
                Router.go('postPage', {_id: currentPostId});
            }
        });
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});
