export default class UserParser {

    static responseToUser(response, user) {
        user.email = response.data.email;
        user.password = response.data.password;
        user.firstName = response.data.firstName;
        user.lastName = response.data.lastName;
        user.roles = response.data.roles;
        return user;
    }
}
