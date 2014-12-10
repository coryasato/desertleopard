SlideDecks = new Mongo.Collection('slideDecks');

/**
 * SlideDecks Server Block.  These will be "rows" of our slideColumns.
 */

if ( Meteor.isServer ) {
  Meteor.publish('slideDecks', function( query ){
    if ( query ) {
      return SlideDecks.find(query);
    } else {
      return [];
    }
  });

  SlideDecks.allow({ // sends permission to allow client side to make these alterations to the collection
    update: function (userId, doc, fields, modifier) {
      // can only change your own documents
      return doc.owner === userId;
    },
    remove: function (userId, doc) {
      // can only remove your own documents
      return doc.owner === userId;
    },
    fetch: ['owner']
  });

  SlideDecks.deny({ // denies permission to client to perform these actions
    update: function (userId, docs, fields, modifier) {
      // can't change owners
      return _.contains(fields, 'owner');
    },
    remove: function (userId, doc) {
      // can't remove locked documents
      return doc.locked;
    },
    fetch: ['locked'] // no need to fetch 'owner'
  });

  Meteor.methods({
    'insertSlideDeck': function(doc) {
      // Slide Deck id
      var slideDeckId = SlideDecks.insert(doc);
      return slideDeckId;
    },
    'updateSlideDeck': function(id, doc) {
      SlideDecks.update(id, doc);
    }
  });
}

/**
 * SlideDeck Client Block
 */

if ( Meteor.isClient ) {
  Tracker.autorun(function(){
    if ( Meteor.userId() ) {
      Meteor.subscribe('slideDecks', { owner:Meteor.userId() });
    }
  });
}