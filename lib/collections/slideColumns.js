SlideColumns = new Mongo.Collection('slideColumns');

/**
 * Slide Columns Server Block
 */

if( Meteor.isServer ) {
  Meteor.publish('slideColumns', function(query) {
    if(query) {
      return SlideColumns.find(query);
    } else {
      return [];
    }
  });

  SlideColumns.allow({ 
    update: function (userId, doc, fields, modifier) {
      // can only change your own documents
      return true;
    },
    remove: function (userId, doc) {
      // can only remove your own documents
      return true;
    }
  });

  // CLIENT ACCESS METHODS
  
  Meteor.methods({
    'insertSlideColumns': function(doc) {
      var _id = SlideColumns.insert(doc);
      return _id;
    },

    'updateSlideColumn': function(id, doc) {
      SlideColumns.update(id, doc);
    }
  });

} /*** END SERVER BLOCK ***/

/**
 * Slide Columns Client Block
 */

if( Meteor.isClient ) {
  Tracker.autorun(function(){
    if ( Meteor.userId() ) {
      // SECOND ARGUMENT IS SESSION CURRENT SLIDE DECK ID?
      Meteor.subscribe('slideColumns', { owner: Meteor.userId() });
    }
  });
} /*** END CLIENT BLOCK ***/