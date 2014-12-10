/**
 * Markdown Form Helpers
 */
Template.createPresentation.helpers({
  colPosition: function() {
    return Session.get('colPosition');
  },
  rowPosition: function() {
    return Session.get('rowPosition');
  }
});


Template.createPresentation.events({
  'click .createBtn': function(evt, template) {
    evt.preventDefault(); 
    var mdRaw = 'Markdown';
    var title = 'Title';

    Meteor.call('createSlideDeck', {'mdRaw':mdRaw, 'title':title}, function(err) {
      if(err) { console.log(err); }
      Router.go('/list');
    }); 
  }, 

  'click .publishBtn': function(evt, template) {
    evt.preventDefault();
    // Reset Default Positions on PUBLISH
    Session.set('colPosition', 0);
    Session.set('rowPosition', 0);

    // Store Last Session Slide to DB
  },

  'click .newColumn': function(evt, template) {
    evt.preventDefault();


  }
});

/**
 * Create Session Variables
 */

Session.setDefault('colPosition', 0);
Session.setDefault('rowPosition', 0);


