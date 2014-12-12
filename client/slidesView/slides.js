/**
 * Set Session Globals
 */

var fetchDep = new Tracker.Dependency;

var handle = Tracker.autorun(function() {
  var foundSessionOrNonSession = true;
  if ( Session.get('isSession') ) {
    foundSessionOrNonSession = PresentSessions.findOne({_id:Session.get('_ps_id')});
    if ( foundSessionOrNonSession ) {
      Session.set('_sd_id', foundSessionOrNonSession.slideDeck_id);
      Session.set('_presenter_id', foundSessionOrNonSession.presenter_id);
      Session.set('_page', foundSessionOrNonSession.page);
    }
  }

  if ( foundSessionOrNonSession ) {
    Meteor.subscribe('slideDecks',{_id:Session.get('_sd_id')});

    var foundSlideDeck = SlideDecks.findOne({_id:Session.get('_sd_id')});
    if ( foundSlideDeck ) {
      Session.set('_title', foundSlideDeck.title);
      _mdSlides = foundSlideDeck.mdSlides;
      Session.set('_slideLength', _mdSlides.length);
      _mdSlides.unshift('');
      fetchDep.changed();
      // handle.stop();
    }
  }

});

var validatePageNum = function(page) {
  if ( page < 1 ) {
    return false;
  } else if ( page > Session.get('_slideLength') ) {
    return false;
  }
  return true;
};

// Predicate Function
var isPresentor = function() {
  fetchDep.depend();
  if ( Session.get('isSession') ) {
    return Session.get('_presenter_id') === Meteor.userId();
  }
  return true;
};

/**
 * Slide Helpers
 */

Template.slides.helpers({
  isPresentor: isPresentor,

  _ps_id: function() {
    return Session.get('_ps_id');
  },
  _page: function() {
    fetchDep.depend();
    return Session.get("_page");
  },
  _slideLength: function() {
    return Session.get('_slideLength');
  },
  markDownSource: function(n) {
    fetchDep.depend();
    if (_mdSlides) {
      if ( n === 0 ) {
        return '#'+Session.get("_title");
      } else {
        return _mdSlides[n];
      }
    }
  },
  opacity: function () {
    return Session.get("opacity");

  },
  slideLength: function(){
    return Session.get('slideLength');
  }
});
  
/**
 * Slide Events
 */

Template.slides.events({
  'click #next': function () {
    next();
  },
  'click #prev': function () {
    prev();
  }
});


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



