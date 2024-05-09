
import axios from 'axios' ;


const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});
export default {
    register(userdata){
        return apiClient.post('/register', userdata);
    },

    login(credentials){
        return apiClient.post('/login', credentials);
    },

    logout(){
        return apiClient.post('/logout');
    },
    AdminUsersList(id){
        return apiClient.patch('/users/' + id);
    },
    AdminUsers(){
      return apiClient.get('/users')
    }
   
}