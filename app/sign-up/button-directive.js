{
  angular.module('meganote.signUp').directive('xtLogin',

  [  'CurrentUser', 'AuthToken', (CurrentUser, AuthToken) => {
    class ButtonController {
      constructor () {

      }
      user() {
        return CurrentUser.get();
      }
      signedIn() {
        return CurrentUser.signedIn();
      }
      logout() {
        CurrentUser.clear();
        AuthToken.clear();
      }
    }

    return {
      template: `<div class = "user-links">
      <span ng-show = "vm.signedIn()">
       <a  class = "profile" ui-sref = "user-profile"> Signed in as:{{vm.user().name}}</a>
        |
        <a ng-click = "vm.logout()" ui-sref = "sign-up">Logout</a>
      </span>
      <span ng-show = "!vm.signedIn()">
        <a ui-sref ="sign-up">Sign up for Meganote today!</a>
        </span>
      </div>`,
      restrict: 'E',
      controller: ButtonController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
    };
  }]
  );
}
