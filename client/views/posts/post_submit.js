Template.postSubmit.events({
    'submit form': function (e) {
        e.preventDefault();
        var post = {
            seoUrl: $(e.target).find('[name=seoUrl]').val(),
            title: $(e.target).find('[name=title]').val(),
            published: $(e.target).find('[name=published]').is(':checked'),
            text: $(e.target).find('[name=text]').val(),
            summary: $(e.target).find('[name=summary]').val()
        };
        Meteor.call('postInsert', post,
            function (error, result) {
                if (error)
                    return throwError(error.reason);

                // show this result but route anyway
                if (result.postExists)
                    throwError('This link has already been posted');

                Router.go('postPage', {_id: result._id});
            }
        );
    }
});