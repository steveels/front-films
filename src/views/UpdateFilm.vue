<template>
  <div class="form-container">
    <h1 class="form-title">Modifier un film</h1>
    <form @submit.prevent="submitPost" class="form">
      <div class="form-group">
        <label for="title" class="form-label">Titre :</label>
        <input type="text" id="title" v-model="post.title" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="content" class="form-label">Contenu :</label>
        <textarea id="content" v-model="post.content" class="form-textarea" required></textarea>
      </div>
      <div class="form-group">
        <label for="date" class="form-label">Date de sortie :</label>
        <input type="text" id="date" v-model="post.date_de_sortie" class="form-input" required>
      </div>
      <button type="submit" class="btn btn-primary">Modifier</button>
    </form>
  </div>
</template>

<script>
import filmService from '@/services/filmService';
export default {
  data(){
    return {
      post:{
        id: this.$route.params.id,
        title: '',
        content: '',
        date_de_sortie: ''
      }
    }
  },
  methods:{
    fetchPost(){
      filmService.getFilm(this.post.id)
      .then(res =>this.post = res.data)
      .catch(error =>console.log(error))
    },
    submitPost(){
      filmService.UpdateFilm(this.post.id, this.post)
      .then(() => this.$router.push({name:'filmsList'}))
      .catch(error =>console.log(error))
      
    }
  },
    created(){
      this.fetchPost()
    }
    
    
  }

</script>

<style scoped>
/* Styles pour le conteneur du formulaire */
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Styles pour le titre du formulaire */
.form-title {
  text-align: center;
  margin-bottom: 20px;
}

/* Styles pour le groupe de champs du formulaire */
.form-group {
  margin-bottom: 20px;
}

/* Styles pour les labels du formulaire */
.form-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

/* Styles pour les champs de saisie du formulaire */
.form-input,
.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
}

.form-textarea {
  height: 150px;
}

/* Styles pour les boutons du formulaire */
.btn {
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>