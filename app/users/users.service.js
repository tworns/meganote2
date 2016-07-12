{
  angular.module('meganote.users')
    .service('UsersService', [
      '$http',
      'API_BASE',
      'AuthToken',
      'CurrentUser',
      'Flash',
      '$state', ($http, API_BASE,
      AuthToken,
      CurrentUser, Flash, $state) => {
        const apiURI = `${API_BASE}users/`;
        class UsersService {
          //create user
          create(user) {
            return $http.post(`${apiURI}`, {
              user
            })
              .then(
                (res) => {
                  AuthToken.set(res.data.authToken);
                  CurrentUser.set(res.data.user);
                }
              );
          }
          //update user
          update(user){
            return $http.put(`${apiURI}${user._id}`,{
              user}).then(res => {
                CurrentUser.set(res.data.user);
                //console.log(res.data);
              });
          }

          //login
          login(user){
            this.message = 'Unable to log user in.';
            return $http.post(`${API_BASE}sessions/`, {
              user
            })
            .then(
              (res) => {
                AuthToken.set(res.data.user);
                CurrentUser.set(res.data.user);
                if(!CurrentUser.signedIn()){
                  Flash.create('danger', 'Failed to log in.');
                }
                else {
                  Flash.create('success', 'Logged in successfully');
                  $state.go('notes.form');
                }

              }
            );
          }
        }
        return new UsersService();

      }]);
}
