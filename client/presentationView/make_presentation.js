/**
 * Create Session Variables
 */

Session.setDefault('colPosition', 0);
Session.setDefault('rowPosition', 0);

/**
 * UI Body Event Listeners
 */
var uiBodyEvents = Tracker.autorun(function() {
  
  UI.body.events({
    'keydown': function(evt) {
      var slide;
      var markDown;
      // Right Arrow Pressed
      if(evt.shiftKey && evt.which === 39 && Session.get('colPosition') < (getColumnsCount() - 1)) {
        // Get Markdown
        markDown = $('.markDownText').val();
        
        saveSlide(Session.get('rowPosition'), Session.get('colPosition'), markDown, function(err, data) {
          if(err) { console.log(err); }

          Session.set('colPosition', Session.get('colPosition') + 1);
          slide = getSlideText(null, Session.get('colPosition'), true);
          // Render Markdown
          console.log("Moved right | Column:", Session.get('colPosition'), slide);

          Session.set('rowPosition', getLastIndex(Session.get('colPosition')));
          $('.markDownText').val(slide);
        });

      }
      // Left Arrow Pressed
      else if(evt.shiftKey && evt.which === 37 && Session.get('colPosition') > 0) {
        // Get Markdown
        markDown = $('.markDownText').val();

        saveSlide(Session.get('rowPosition'), Session.get('colPosition'), markDown, function(err, data) {
          if(err) { console.log(err); }

          Session.set('colPosition', Session.get('colPosition') - 1);
          slide = getSlideText(null, Session.get('colPosition'), true);

          console.log("Moved left | Column:", Session.get('colPosition'), slide);

          Session.set('rowPosition', getLastIndex(Session.get('colPosition')));
          $('.markDownText').val(slide);
        });
      }
      // Down Arrow Pressed
      else if(evt.shiftKey && evt.which === 40 && Session.get('rowPosition') < getRowsCount() - 1){
        // Get Markdown
        markDown = $('.markDownText').val();

        saveSlide(Session.get('rowPosition'), Session.get('colPosition'), markDown, function(err, data) {
          if(err) { console.log(err); }

          Session.set('rowPosition', Session.get('rowPosition') + 1);
          slide = getSlideText(Session.get('rowPosition'), Session.get('colPosition'), false);

          // Update lastIndex
          updateLastIndex(Session.get('rowPosition'), Session.get('colPosition'));

          console.log("Moved down | Row:", Session.get('rowPosition'), slide);
          $('.markDownText').val(slide);
        });
      }
      // Up Arrow Pressed
      else if(evt.shiftKey && evt.which === 38 && Session.get('rowPosition') > 0){
        // Get Markdown
        markDown = $('.markDownText').val();

        saveSlide(Session.get('rowPosition'), Session.get('colPosition'), markDown, function(err, data) {
          if(err) { console.log(err); }

          Session.set('rowPosition', Session.get('rowPosition') - 1);
          slide = getSlideText((Session.get('rowPosition')), Session.get('colPosition'), false);

          // Update lastIndex
          updateLastIndex(Session.get('rowPosition'), Session.get('colPosition'));

          console.log("Moved up | Row:", Session.get('rowPosition'), slide);
          $('.markDownText').val(slide);
        });

      }
    }
  });
  
});

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
    // Store Last Session Slide to DB
    
    // Reset Default Positions on PUBLISH
    Session.set('colPosition', 0);
    Session.set('rowPosition', 0);

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
      Meteor.call('updateSlideDeck', Session.get('currentSlideDeck'), {$push: {'columnIds': columnId}}, function(err, data) {
        if(err) { console.log(err); }

        // Increments colPosition
        Session.set('colPosition', getColumnsCount() - 1);
        Session.set('rowPosition', 0);
        
      });
    });

    template.find('.markDownText').value = '';
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

    // Increments lastIndex position
    updateLastIndex(Session.get('rowPosition'), Session.get('colPosition'));

    // Clear textarea
    template.find('.markDownText').value = '';
  }
  
});

/**
 * Helper Functions
 */

function saveSlide(row, column, text, callback) {
  var slidesMarkdown = {};
  var slideDeckObj = SlideDecks.findOne({_id: Session.get('currentSlideDeck')});
  var columnId = slideDeckObj.columnIds[column];
  
  slidesMarkdown['slides.' + row] = text;
  Meteor.call('updateSlideColumn', columnId, {$set: slidesMarkdown}, callback);
}

function updateLastIndex(rowIndex, columnIndex) {
  var slideDeckObj = SlideDecks.findOne({_id: Session.get('currentSlideDeck')});
  var columnId = slideDeckObj.columnIds[columnIndex];

  Meteor.call('updateSlideColumn', columnId, {$set: {"lastIndex": rowIndex}});  
}

function getLastIndex(columnIndex) {
  var slideDeckObj = SlideDecks.findOne({_id: Session.get('currentSlideDeck')});
  var columnId = slideDeckObj.columnIds[columnIndex];
  var slideColumnObject = SlideColumns.findOne({_id: columnId});
  return slideColumnObject.lastIndex;
}

function getSlideText(rowIndex, columnIndex, columnMove) {
  var slideDeckObj = SlideDecks.findOne({_id: Session.get('currentSlideDeck')});
  var columnId = slideDeckObj.columnIds[columnIndex];  
  var slideColumnObject = SlideColumns.findOne({_id: columnId});

  if (columnMove) {
    return slideColumnObject.slides[slideColumnObject.lastIndex];
  } else {
    return slideColumnObject.slides[Session.get('rowPosition')];
  }
}

function getColumnsCount() {
  var colCount = SlideDecks.findOne({_id: Session.get('currentSlideDeck')});

  return colCount.columnIds.length;
}

function getRowsCount() {
  var slideDeckObj = SlideDecks.findOne({_id: Session.get('currentSlideDeck')});
  var columnId = slideDeckObj.columnIds[Session.get('colPosition')];
  var currentColumn = SlideColumns.findOne({_id: columnId});

  return currentColumn.slides.length;
}










