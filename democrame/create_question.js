if (Meteor.isClient) {

Template.createQuestion.helpers({
  questions : function () {
    return Questions.find();
  },
  getSlideDeckId: function(){
    return Session.get('currentSlideDeck');
  }

});

Template.results.helpers({
  // countAllVotes :function(){
  //   var theCounts = Votes.find();
  //   return theCounts;
  // },
  countVotes: function(theQuestion){
    var theCounts = Votes.find({'question_id':theQuestion});
    return theCounts.count();
  }
});

Template.createQuestion.events({
  'submit .new-question': function (evt, template) {
     evt.preventDefault(); 
     var questionBody = {
          'text': template.find('#theText').value
        }
    Meteor.call('createQuestion', questionBody, Session.get('currentSlideDeck'), function(err) {
      if(err) { console.log(err); }
    }); 
  },
  'click #delete-question': function (evt, template) {
      evt.preventDefault();
      var rule = this;
      var id = evt.currentTarget.name;
      Meteor.call('remove', id, function(err) {
      console.log('Remove Clicked', id);
      if(err) { console.log(err); 
      }
    }); 
  },
  'click #vote-yes': function(evt, template){
    evt.preventDefault();
    var rule = this;
    var id = evt.currentTarget.name;
    Meteor.call('voteYes', id, function(err) {
      console.log('vote yes Clicked', id);
      if(err) { console.log(err); 
      }
    });
  } ,
  // 'click #vote-no': function(evt, template){
  //   evt.preventDefault();
  //   var rule = this;
  //   var id = evt.currentTarget.name;
  //   Meteor.call('voteNo', id, function(err) {
  //     console.log('vote yes Clicked', id);
  //     if(err) { console.log(err); 
  //     }
  //   });
  // }  
});

}