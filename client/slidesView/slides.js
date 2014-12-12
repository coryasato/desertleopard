/**
 * Slide Helpers
 */

Template.slides.helpers({
  markDownSource: function() {
    return Meteor.getSlideText(Session.get('rowPosition'), Session.get('colPosition'), false);
  }
});
  
/**
 * Slide Events
 */

Template.slides.events({
  'click .qrCodeShow': function(evt, template) {
    $("#qrcode").qrcode({width: 400,height: 400, render: 'table', text: "http://10.6.17.255:3000/sessions/" + Session.get('currentSlideDeck')});
  }
});

Template.slides.famousEvents({
  'keypress': function(evt, fview) {
    if(evt.shiftKey && evt.which === 39) {

    }
  }
});

var handle = Tracker.autorun(function() {
  if(Session.get('isViewing')) {
    var slideDeck = SlideDecks.findOne({_id:Session.get('currentSlideDeck')});
    if ( slideDeck ) {
      Session.set('rowPosition', slideDeck.currentSlide[0]);
      Session.set('colPosition', slideDeck.currentSlide[1]);
    }
  }  
});





