{
  angular.module('meganote.signUp').directive('xtLogin',xtLogin);

  function xtLogin(){
    return {
      templateUrl: 'app/sign-up/button.html',
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
    vm.btnTxt = 'login';
    vm.user = CurrentUser.get();
    if(AuthToken.get() === undefined){
      vm.btnTxt = 'login';
      vm.logout();
    }
    else {
      vm.btnTxt = 'logout';
      vm.login();
    }

    function logout (){
      AuthToken.clear();
      CurrentUser.clear();
      $state.go('signUp');
    }
    function login (){
      CurrentUser.set(vm.user);
      AuthToken.set(vm.user);
      $state.go('notes');
    }
  }
}
