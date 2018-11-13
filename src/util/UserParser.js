export default class UserParser {

    static responseToUser(response, user) {
        console.log(response);
        console.log(user);
        user.id = response.data.id;
        user.email = response.data.email;
        user.password = response.data.password;
        user.firstName = response.data.firstName;
        user.lastName = response.data.lastName;
        user.roles = response.data.roles;
        // user.department = response.data.department.id;
        user.avatar = response.data.avatar;
        return user;
    }
}
