Template.navigation.events({
  'click #logout': function(){
    if(Meteor.user){
      Meteor.logout();
    }
  }
});
