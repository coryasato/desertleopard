Template.header.events({
  'click #logout': function(){
    if(Meteor.user){
      Meteor.logout();
    }
  }
});
