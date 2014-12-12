/**
 * Root Page Helpers
 */

Template.intro.events({
  'click .makeNewPresentation': function(evt, template) {
    evt.preventDefault();
    var slideColumnId;
    // Create Slide Column
    Meteor.call('insertSlideColumns', {'columnTitle': 'TEST', 'slides': [''], 'lastIndex': 0}, function(err, data) {
      if(err) { console.log(err); }

      slideColumnId = data;

      // Create Slide Deck
      Meteor.call('insertSlideDeck', {'owner': Meteor.userId(), 'columnIds': [slideColumnId], 'presentationTitle': 'TEMP', currentSlide: [0, 0]}, function(err, data) {
        if(err) { console.log(err); }

        // Store SlideDeck session_id
        Session.set('currentSlideDeck', data);
      });
    });
    
    Router.go('/create');
  }
});