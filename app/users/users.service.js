{
  angular.module('meganote.users')
    .service('UsersService', [
      '$http',
      'API_BASE',
      'AuthToken',
      'CurrentUser',
      'Flash',
      ($http, API_BASE,
      AuthToken,
      CurrentUser, Flash) => {
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
            return $http.post(`${API_BASE}/session/`, {
              user
            })
            .then(
              (res) => {
                if(CurrentUser.get().isLoggedIn !== true){
                  Flash.create('danger', 'Failed to log in.');
                }
                else {
                  Flash.create('success', 'Logged in successfully');
                  AuthToken.set(res.data.user);
                  CurrentUser.set(res.data.user);
                }

              }
            );
          }
        }
        return new UsersService();

      }]);
}
