
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
    getFilms(){
        return apiClient.get('/films');

    },
    getFilm(id){
        return apiClient.get('/films/' + id);
    },

    getCategories(){
        return apiClient.get('/categories');
    },
    addCateg(categ){
      return apiClient.post('/categories',categ);

    },
    updateCateg(id, data) {
      return apiClient.put(`/categories/${id}`, data);
    },
    deleteCateg(categoryId){
      return apiClient.delete(`/categories/${categoryId}`);
    },
  
    getFilmsByCategory(categoryId) {
      return apiClient.get(`/categories/${categoryId}/films`);
    },
    createFilm(post){
      return apiClient.post('/films', post);
  },
    UpdateFilm(id, data){
        return apiClient.put(`/films/${id}`, data);
    },
    deletePost(id){
      return apiClient.delete('/films/' + id);
  },
  likeFilm(id){
    return apiClient.post('/films/' + id + '/like');
  },
  unlikeFilm(id){
    return apiClient.post('/films/' + id + '/unlike');
  }
   

   
}