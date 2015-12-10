Template.postDetail.helpers({
    ownPost: function() {    return Meteor.userId()&&this.userId == Meteor.userId();  },
    creationDateView:function() {    return this.creationDate.toLocaleDateString('dd-m-yy');  },
    textView:function() {
        var decoded = $('<div/>').html(this.text).text();
        return decoded;
    }
});
