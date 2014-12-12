SlideDecks = new Mongo.Collection('slideDecks');

/**
 * SlideDecks Server Block.  These will be "rows" of our slideColumns.
 */

if ( Meteor.isServer ) {
  Meteor.publish('slideDecks', function(){
    return SlideDecks.find();   
  });

  SlideDecks.allow({ // sends permission to allow client side to make these alterations to the collection
    update: function (userId, doc, fields, modifier) {
      // can only change your own documents
      return true;
    },
    remove: function (userId, doc) {
      // can only remove your own documents
      return true;
    }
  });

  // SlideDecks.deny({ // denies permission to client to perform these actions
  //   update: function (userId, docs, fields, modifier) {
  //     // can't change owners
  //     return _.contains(fields, 'owner');
  //   },
  //   remove: function (userId, doc) {
  //     // can't remove locked documents
  //     return doc.locked;
  //   }
  // });

  Meteor.methods({
    'insertSlideDeck': function(doc) {
      // Slide Deck id
      var slideDeckId = SlideDecks.insert(doc);
      return slideDeckId;
    },
    'updateSlideDeck': function(id, doc, callback) {
      SlideDecks.update(id, doc, callback);
    }
  });
}

/**
 * SlideDeck Client Block
 */

if ( Meteor.isClient ) {
  Tracker.autorun(function(){
    if ( Meteor.userId() ) {
      Meteor.subscribe('slideDecks');
    }
  });
}