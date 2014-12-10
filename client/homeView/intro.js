/**
 * Root Page Helpers
 */

Template.intro.events({
  'click .makeNewPresentation': function(evt, template) {
    evt.preventDefault();
    var slideColumnId;
    // Create Slide Deck
    // Store SlideDeck session_id
    // Create Slide Column
    Meteor.call("slideColumnsInsert", {"columnTitle": "TEST", "slides": [], "lastIndex": 0}, function(err, data) {
      if(err) { console.log(err); }

      slideColumnId = data;

      console.log(slideColumnId);
    });
    // Upsert SlideCol_id into SlideDeck Columns Array
    Router.go('/create');
  }
});