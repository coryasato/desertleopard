/**
 * Markdown Form Helpers
 */

Template.createPresentation.events({
  'click .createBtn': function(evt, template) {
    evt.preventDefault(); 
    var mdRaw = template.find('#mdRawTextArea').value;
    var title = template.find('#presentationTitle').value;

    Meteor.call('createSlideDeck', {'mdRaw':mdRaw, 'title':title}, function(err) {
      if(err) { console.log(err); }
      Router.go('/list');
    }); 
  } 
});
