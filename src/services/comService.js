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

  createPost(id, content) {
    const data = { content };
    return apiClient.post(`/comment/${id}`, data);
  },
  getComment(id) {
    return apiClient.get(`/comment/${id}`);
  },
  deleteComment(id){
    return apiClient.delete('/comment/' + id);
},
likecom(id){
  return apiClient.post('/comment/' + id + '/likeCom');
},
unlikecom(id){
  return apiClient.post('/comment/' + id + '/unlikeCom');
}


    
   
}