/**
 * Create Session Variables
 */

Session.setDefault('colPosition', 0);
Session.setDefault('rowPosition', 0);

/**
 * Markdown Form Helpers
 */

Template.createPresentation.helpers({
  colPosition: function() {
    return Session.get('colPosition') + 1;
  },
  rowPosition: function() {
    return Session.get('rowPosition') + 1;
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
    var markDownText = template.find('.markDownText').value;
    var columnId;

    // Saving Current Slide
    saveSlide(Session.get('rowPosition'), Session.get('colPosition'), markDownText);

    Meteor.call('insertSlideColumns', {'columnTitle': 'TEST', 'slides': [''], 'lastIndex': 0}, function(err, data) {
      if(err) {  console.log(err); }
      columnId = data;

      // Updates Current Slide.slides with New Column
      Meteor.call('updateSlideDeck', Session.get('currentSlideDeck'), {$push: {'columnIds': columnId}});
    });

    // Increments colPosition
    Session.set('colPosition', (Session.get('colPosition') + 1));
    Session.set('rowPosition', 0);
  },

  'click .newRow': function(evt, template) {
    evt.preventDefault();
    var markDownText = template.find('.markDownText').value;

    // Updates current slide at current coordinates
    saveSlide(Session.get('rowPosition'), Session.get('colPosition'), markDownText);

    // Increments rowPosition
    Session.set('rowPosition', (Session.get('rowPosition') + 1));

    // Creates empty string for new row
    saveSlide(Session.get('rowPosition'), Session.get('colPosition'), '');

    //TODO INCREMENT LAST INDEX
    template.find('.markDownText').value = '';
  }
});

/**
 * Helper Functions
 */

function saveSlide(row, column, text) {
  var slidesIndexObject = {};
  var slideDeckObj = SlideDecks.findOne({_id: Session.get('currentSlideDeck')});
  var columnId = slideDeckObj.columnIds[column];
  
  slidesIndexObject['slides.' + row] = text;
  Meteor.call('updateSlide', columnId, {$set: slidesIndexObject});
}



