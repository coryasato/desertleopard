Questions = new Mongo.Collection("questions");
Votes = new Mongo.Collection("votes");


if ( Meteor.isServer ) {
  Meteor.publish('questions', function( query ){
    if ( query ) {
      return Questions.find(query);
    } else {
      return [];
    }
  });

  Meteor.publish('votes', function( query ){
    if ( query ) { 
      return Votes.find(query);
    } else {
      return [];
    }
  });
  Questions.deny({

  });

  Questions.allow({
    insert: function() {
    },
    remove: function(){
    }
  });

  Votes.deny({

  });

  Votes.allow({
    insert: function() {
    },
    remove: function(){
    }
  });

  Meteor.methods({
    createQuestion: function(question, slidedeck_id) {
    // This function is called when the new question form is submitted
        check(question,{
            text: String
        });
        // question.slideDeck_id = SlideDecks.findOne({_id: currentSlideDeck});
    

        question.slidedeck_id = slidedeck_id;
        question.owner = Meteor.userId();
        question.createdAt = new Date();
        var sd_id = Questions.insert(question);
      return sd_id;
    },
    remove: function(id, rule){
        console.log('removing this item: ' + id);
        Questions.remove({_id: id});
    },

    voteYes: function(id){
          console.log('Voting for this item: ' + id);
          var vote = {};
          // if(Votes.find({_id: id})){
          //    Votes.update({_id: id}, {user_id: Meteor.userId(), question_id: id});  
          // }else{
              vote.question_id = id;
              vote.user_id = Meteor.userId();
              vote.answer = true;
              vote.createdAt = new Date();

              var vote_id = Votes.insert(vote);
            return vote_id;
          // }

    },
    // voteNo: function(id, rule){
    //       console.log('Voting for this item: ' + id);
    //       Votes.update({_id: id}, {$inc: {votes: 1, rating:-1}});  
    // },

});

}
if ( Meteor.isClient ) {
  Tracker.autorun(function(){
    if ( Meteor.userId() ) {
      Meteor.subscribe('questions',{owner:Meteor.userId()});
      Meteor.subscribe('votes',{user_id:Meteor.userId()});
    }
  });
}





