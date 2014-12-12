if ( Meteor.isClient ) {

  Meteor.moveRight = function(){
    return Meteor.moveHorizontal(1);
  }

  Meteor.moveLeft = function() {
    return Meteor.moveHorizontal(-1);
  }

  Meteor.moveDown = function(){
    return Meteor.moveVertical(1);
  }

  Meteor.moveUp = function(){
    return Meteor.moveVertical(-1);
  }

  Meteor.moveHorizontal = function(direction) {
    Session.set('colPosition', Session.get('colPosition') + direction);
    var slide = Meteor.getSlideText(null, Session.get('colPosition'), true);
    console.log("Moved right | Column:", Session.get('colPosition'), slide);

    // Sets Row Position to New Columns Last Index Property
    Session.set('rowPosition', Meteor.getLastIndex(Session.get('colPosition')));
    return slide;
  }

  Meteor.moveVertical = function(direction){
    Session.set('rowPosition', Session.get('rowPosition') + direction);
    var slide = Meteor.getSlideText(Session.get('rowPosition'), Session.get('colPosition'), false);

    // Update lastIndex
    Meteor.updateLastIndex(Session.get('rowPosition'), Session.get('colPosition'));

    return slide;
  }

  Meteor.updateLastIndex = function(rowIndex, columnIndex) {
    var slideDeckObj = SlideDecks.findOne({_id: Session.get('currentSlideDeck')});
    var columnId = slideDeckObj.columnIds[columnIndex];

    Meteor.call('updateSlideColumn', columnId, {$set: {"lastIndex": rowIndex}});  
  }

  Meteor.getLastIndex = function(columnIndex) {
    var slideDeckObj = SlideDecks.findOne({_id: Session.get('currentSlideDeck')});
    var columnId = slideDeckObj.columnIds[columnIndex];
    var slideColumnObject = SlideColumns.findOne({_id: columnId});
    return slideColumnObject.lastIndex;
  }

  Meteor.getSlideText = function(rowIndex, columnIndex, columnMove) {
    var slideDeckObj = SlideDecks.findOne({_id: Session.get('currentSlideDeck')});
    var columnId = slideDeckObj.columnIds[columnIndex];  
    var slideColumnObject = SlideColumns.findOne({_id: columnId});

    if (columnMove) {
      return slideColumnObject.slides[slideColumnObject.lastIndex];
    } else {
      return slideColumnObject.slides[Session.get('rowPosition')];
    }
  }

  Meteor.getColumnsCount = function() {
    var colCount = SlideDecks.findOne({_id: Session.get('currentSlideDeck')});

    return colCount.columnIds.length;
  }

  Meteor.getRowsCount = function(){
    var slideDeckObj = SlideDecks.findOne({_id: Session.get('currentSlideDeck')});
    var columnId = slideDeckObj.columnIds[Session.get('colPosition')];
    var currentColumn = SlideColumns.findOne({_id: columnId});

    return currentColumn.slides.length;
  }

};