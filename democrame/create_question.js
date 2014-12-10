if (Meteor.isClient) {

Template.createQuestion.helpers({
  questions : function () {
    return Questions.find();
  }
});

Template.createQuestion.events({
  'submit .new-question': function (evt, template) {
     // var text = event.target.text.value;
     evt.preventDefault(); 
     var text = template.find('#theText').value;
    Meteor.call('createQuestion', {'text':text}, function(err) {
      if(err) { console.log(err); }
    }); 
  } 
});

}