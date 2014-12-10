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
      // Show newest questions first
      return Questions.find({}, {sort: {createdAt: -1}});
    },
    fetch: ['owner']
  });

  Meteor.methods({
  // "submit .new-question": function(event) {
  
  'createQuestion': function(question) {
    // This function is called when the new question form is submitted
        check(question,{
            text: String
        });

        // Questions.insert({
        //   text: text,
        //   createdAt: new Date() // current time
        // });
        question.owner = Meteor.userId();
        // Clear form
        // event.target.text.value = "";

        // Prevent default form submit
         var sd_id = Questions.insert(question);
      return sd_id;
      },
      'toggle-checked': function () {
        // Set the checked property to the opposite of its current value
        Questions.update(this._id, {$set: {checked: ! this.checked}});
      },
      'delete': function () {
        Questions.remove(this._id);
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





