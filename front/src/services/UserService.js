import api from '../http'

export default class UsersService {
    static fetchUsers() {
        return api.get('/users')
    } 
}