{
  angular.module('meganote', [
    'ui.router',
    'ngFlash',
    'textAngular',
    'meganote.notes',
    'meganote.notesForm',
    'meganote.users',
    'meganote.signUp',
    'meganote.signIn',
  ])
    .config(config);

  config.$inject = ['$urlRouterProvider'];
  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/sign-up/');
  }
}
