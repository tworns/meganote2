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
                  Flash.create('success', 'Created User successfully');
                  AuthToken.set(res.data.authToken);
                  CurrentUser.set(res.data.user);
                },
                (res) => {
                  console.log(res);
                  console.log(!!res.errors);
                  if(res.data.message.toLowerCase() !=='user validation failed'){
                    Flash.create('warning', `Failed to create user: ${res.data.message}` );
                  }
                  else if(!res.errors){
                    Flash.create('warning', `Failed to create user: ${res.data.errors.username.message}`);
                  }
                  else{
                    Flash.create('warning', `Failed to create user: ${res.statusText}`);
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
                AuthToken.set(res.data.authToken);
                CurrentUser.set(res.data.user);
                Flash.create('success', 'Logged in successfully');
                $state.go('notes.form');
              },
                () => {
                  Flash.create('danger', 'Failed to log in.');
                }


            );
          }
        }
        return new UsersService();

      }]);
}
