Template.postItem.helpers({
  ownPost: function() {    return Meteor.userId()&&this.userId == Meteor.userId();  },
  creationDateView:function() {    return this.creationDate.toLocaleDateString('dd-m-yy');  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});
