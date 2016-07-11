(function(){
  angular.module('meganote.signUp').directive('xtLogin',

  [  'CurrentUser', (CurrentUser) => {
    class ButtonController {
      constructor () {

      }
      user() {
        return CurrentUser.get();
      }
      signedIn() {
        return CurrentUser.signedIn();
      }
    }

    return {
      template: `<div class = "user-links" ng-show = "vm.signedIn()">Signed in as: {{vm.user().name}} </div>`,
      restrict: 'E',
      controller: ButtonController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
    };
  }]
  );
  ButtonController.$inject = ['$state','AuthToken', 'CurrentUser'];
  function ButtonController($state, AuthToken, CurrentUser){
    var vm = this;
    vm.logout = logout;
    vm.login = login;
    vm.isLoggedIn = isLoggedIn;
    vm.btnTxt = 'Login';
    vm.user = CurrentUser.get();
    vm.username = vm.user.username;


    function isLoggedIn() {
      if(AuthToken.get() === undefined){
        vm.btnTxt = 'Login';
        return false;
      }
      else {
        vm.btnTxt = 'Logout';
        return true;
      }
    }
    function logout (){
      AuthToken.clear();
      CurrentUser.clear();
      $state.go('sign-up');
    }
    function login (){
      CurrentUser.set(vm.user);
      AuthToken.set(vm.user);
      $state.go('notes');
    }
  }
})();
