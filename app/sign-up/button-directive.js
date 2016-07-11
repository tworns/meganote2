{
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
      template: `<div class = "user-links" >
      <span ng-show = "vm.signedIn()">Signed in as: {{vm.user().name}}</span>
      <span ng-show = "!vm.signedIn()"> <a ui-sref ="sign-up">Sign up for Meganote today!</a></span>
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
