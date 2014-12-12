SlideColumns = new Mongo.Collection('slideColumns');

/**
 * Slide Columns Server Block
 */

if( Meteor.isServer ) {
  Meteor.publish('slideColumns', function() {
    return SlideColumns.find({});
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

    'updateSlideColumn': function(id, doc, callback) {
      SlideColumns.update(id, doc, callback);
    }
  });

} /*** END SERVER BLOCK ***/

/**
 * Slide Columns Client Block
 */

if( Meteor.isClient ) {
  Tracker.autorun(function(){
    Meteor.subscribe('slideColumns');
  });
} /*** END CLIENT BLOCK ***/