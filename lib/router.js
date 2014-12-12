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

Router.route('/create_question',{
  name: 'createQuestion'
});

Router.route('/sessions/:sd_id', function(){

  this.layout('slideLayout');

  Session.set('isViewing', true);
  Session.set('currentSlideDeck', this.params.sd_id);
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
