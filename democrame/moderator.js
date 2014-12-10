Questions = new Mongo.Collection("questions");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.questions.helpers({
    questions: function() {
      // Show newest questions first
      return Questions.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.questions.events({
  "submit .new-question": function (event) {
    // This function is called when the new question form is submitted

    var text = event.target.text.value;

    Questions.insert({
      text: text,
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  }
});

  // In the client code, below everything else
  Template.question.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Questions.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function () {
      Questions.remove(this._id);
    }
  });


}


