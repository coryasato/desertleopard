SlideColumns = new Mongo.Collection('slideColumns');

/**
 * Slide Columns Server Block
 */

if( Meteor.isServer ) {
  Meteor.publish('slideColumns');

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
    'slideColumnsInsert': function(doc) {
      var _id = SlideColumns.insert(doc);
      return _id;
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
      Meteor.subscribe('slideColumns');
    }
  });
} /*** END CLIENT BLOCK ***/