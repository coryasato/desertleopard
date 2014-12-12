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

    Meteor.call('createPresentSessions',
               { slideDeck_id:this._id, presenter_id:Meteor.userId() }, 
               function(err, ps_id) {
       Router.go('/sessions/' + ps_id);
    });
  },
  'click #reviewPresentation': function(evt, template) {
    event.preventDefault();
    
    Session.set('currentSlideDeck', this._id);
    Router.go('/create');
  }
});
