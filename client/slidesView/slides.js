/**
 * Set Session Globals
 */




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
  
});

var fetchDep = new Tracker.Dependency;

var handle = Tracker.autorun(function() {

  if(Session.get('isViewing')) {
    var slideDeck = SlideDecks.findOne({_id:Session.get('sd_id')});
    if ( slideDeck ) {
      Session.set('rowPosition', slideDeck.currentSlide[0]);
      Session.set('colPosition', slideDeck.currentSlide[1]);
    }
  } 
  
});

// var validatePageNum = function(page) {
//   if ( page < 1 ) {
//     return false;
//   } else if ( page > Session.get('_slideLength') ) {
//     return false;
//   }
//   return true;
// };

// // Predicate Function
// var isPresentor = function() {
//   fetchDep.depend();
//   if ( Session.get('isSession') ) {
//     return Session.get('_presenter_id') === Meteor.userId();
//   }
//   return true;
// };


// var goPage = function(pg) {
//   if ( !validatePageNum(pg) ) return ;

//   if (Session.get('isSession')) {
//     _goPage_session(pg);
//   } else{
//     _goPage_nonSession(pg);
//   }

// };

// var _goPage_session = function(pg) {
//   Session.set("opacity",0);
  
//   Meteor.setTimeout(function(){
//     PresentSessions.update({_id:Session.get('_ps_id')}, {$set: {'page': pg}});
//     Session.set('_page',pg);
//     Session.set("opacity",100);
//   },200);
// };

// var _goPage_nonSession = function(pg) {
//   Session.set("opacity",0);
  
//   Meteor.setTimeout(function(){
//     Router.go('/slides/'+Session.get("_sd_id")+"/"+pg);
//     Session.set("opacity",100);
//   },200);
// };

// var next = function() {
//   goPage(Session.get("_page") + 1);
// };

// var prev = function() {
//   goPage(Session.get("_page") - 1);
// };

/**
 * QRCode Loader
 */

// Tracker.autorun( function() {
//   if (Session.get('_page') === 0) {
//     $("#qrcode")
//     .qrcode({width: 400,height: 400,text: "http://leospot.pio.tw/sessions/" + Session.get('_ps_id')});
//   } else {
//     $("#qrcode").hide();
//   }
// });



