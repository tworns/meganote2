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
                  if(res.status === 200){
                    Flash.create('success', 'Created User successfully');
                    AuthToken.set(res.data.authToken);
                    CurrentUser.set(res.data.user);
                  }
                  else {
                    Flash.create('warning', `Failed to create User: ${res.statusText}` );
                  }
                }
              );
          }
          //update user
          update(user){
            return $http.put(`${apiURI}${user._id}`,{
              user}).then(res => {
                if(res.status === 200){
                  Flash.create('success', 'Updated successfully');
                  CurrentUser.set(res.data.user);
                }
                else {
                  Flash.create('warning', `Failed to update: ${res.statusText}`);
                }
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
