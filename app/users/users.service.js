{
  angular.module('meganote.users')
    .service('UsersService', [
      '$http',
      'API_BASE',
      'AuthToken',
      'CurrentUser',
      ($http, API_BASE,
      AuthToken,
      CurrentUser) => {
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
        }
        return new UsersService();

      }]);
}
