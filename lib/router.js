Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});


Router.route('/',{
  name: 'intro'
});

Router.route('/signup', {
  name: 'signup'
});

Router.route('/login',{
  name: 'login'
});

Router.route('/create',{
  name: 'createPresentation'
});

Router.route('/list',{
  name: 'Presentations'
});

Router.route('/poll',{
  name: 'hello'
});

Router.route('/results',{
  name: 'polling'
});

Router.route('/thumbs',{
  name: 'thumb'
});

Router.route('/thumbresults',{
  name: 'thumbresults'
});


// rp
Router.route('/create_question',{
  name: 'createQuestion'
});
// 

Router.route('slides/:_sd_id/:_page?', function(){
  this.layout('slideLayout');

  // var _page = parseInt(this.params._page ? this.params._page : 1);
  // console.log(this.params);
  // Session.set('_sd_id', this.params._sd_id);
  // Session.set('_page', _page);
  // Session.set('isSession', false);
  this.render('slides');
});

Router.route('/sessions/:sd_id', function(){

  this.layout('slideLayout');

  Session.set('isViewing', true);
  Session.set('sd_id', this.params.sd_id);
  this.render('slides');
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction(requireLogin, {only: 'createPresentation'});
