export default class UserParser {

    static responseToUser(response, user) {
        user.id = response.data.id;
        user.email = response.data.email;
        user.password = response.data.password;
        user.firstName = response.data.firstName;
        user.lastName = response.data.lastName;
        user.roles = response.data.roles;
        user.departments = response.data.departments;
        user.shortName = user.firstName.substring(0,1) + user.lastName.substring(0,1);
        user.avatar = response.data.avatar;
        return user;
    }
}
