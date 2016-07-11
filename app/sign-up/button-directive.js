(function(){
  angular.module('meganote.signUp').directive('xtLogin',xtLogin);

  function xtLogin(){
    return {
      templateUrl: '/sign-up/button.html',
      restrict: 'E',
      controller: ButtonController,
      controllerAs: 'vm',
      scope: {},
    };
  }
  ButtonController.$inject = ['$state','AuthToken', 'CurrentUser'];
  function ButtonController($state, AuthToken, CurrentUser){
    var vm = this;
    vm.logout = logout;
    vm.login = login;
    vm.isLoggedIn = isLoggedIn;
    vm.btnTxt = 'Login';
    vm.user = CurrentUser.get();


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
