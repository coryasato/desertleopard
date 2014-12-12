if (Meteor.isClient) {

Template.createQuestion.helpers({
  questions : function () {
    if(Session.get('currentSlideDeck')){
      return Questions.find({'slidedeck_id': Session.get('currentSlideDeck')}, {sort: {createdAt:-1}});
    }else{
      Router.go('/list');
    }
  },
  getSlideDeckId: function(){
    currentSlideDeckId = Session.get('currentSlideDeck');
    console.log(currentSlideDeckId);
    return currentSlideDeckId;
  }

});

Template.question.helpers({
 
  getTheTime: function(theQuestion){
    var theCounts = Questions.find({'_id':theQuestion});
    var dateToPass;
     theCounts.forEach(function (post) { dateToPass = post.createdAt });
    return moment(dateToPass).fromNow();
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
       template.find('#theText').value = "";
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

  // Template.home.rendered = function(){
  //     var element = $("#wrapper");
  //     if(!element.hasClass("app")){
  //         element.addClass("app"); 
  //     }
  // }

}