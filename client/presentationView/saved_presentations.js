/**
 * User Presentations Helpers.  List of all "decks" created.
 */

Template.Presentations.helpers({
  decks : function () {
    return SlideDecks.find({ owner:Meteor.userId() });
  }
});

Template.Presentations.events({
  'click #beginPresentation': function(evt, template) { 
    event.preventDefault();

    Session.set('currentSlideDeck', this._id);
    Session.set('rowPosition', 0);
    Session.set('colPosition', 0);

    // Set Coordinates to 0, 0
    Meteor.call('updateSlideDeck', this._id, {$set: {'currentSlide': [Session.get('rowPosition'), Session.get('colPosition')]}}); 

    Router.go('/sessions/' + this._id);
  },
  'click #reviewPresentation': function(evt, template) {
    event.preventDefault();
    
    Session.set('currentSlideDeck', this._id);
    Router.go('/create');
  },
  'click #viewModerator': function(evt, template){
    evt.preventDefault();
    Session.set('currentSlideDeck', this._id);
    console.log('This id is being set '+ this._id);
    Router.go('/create_question');
  }

});
