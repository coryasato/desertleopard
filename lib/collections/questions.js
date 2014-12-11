Questions = new Mongo.Collection("questions");
if ( Meteor.isServer ) {
  Meteor.publish('questions', function( query ){
    if ( query ) {
      return Questions.find(query);
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

  Meteor.methods({
  // "submit .new-question": function(event) {
  createQuestion: function(question) {
    // This function is called when the new question form is submitted
        check(question,{
            text: String
        });
        question.owner = Meteor.userId();
        question.createdAt = new Date();
        question.rating = 0;
        question.votes=0;
        var sd_id = Questions.insert(question);
      return sd_id;
      },
  remove: function(id, rule){
        console.log('removing this item: ' + id);
        Questions.remove({_id: id});
    },

  // update: function(id, rule){
  //       console.log('removing this item: ' + id);
  //       Questions.update({_id: id});
  //   },
    voteYes: function(id, rule){
          console.log('Voting for this item: ' + id);
          Questions.update({_id: id}, {$inc: {votes: 1, rating: 1}});  
    },
    voteNo: function(id, rule){
          console.log('Voting for this item: ' + id);
          Questions.update({_id: id}, {$inc: {votes: 1, rating:-1}});  
    }
});

}
if ( Meteor.isClient ) {
  Tracker.autorun(function(){
    if ( Meteor.userId() ) {
      Meteor.subscribe('questions',{owner:Meteor.userId()});
    }
  });
}





