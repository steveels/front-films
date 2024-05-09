<template>
  <div class="form-container">
    <h1 class="form-title">Ajouter un film</h1>
    <form @submit.prevent="submitPost" class="form">
      <div class="form-group">
        <label for="title" class="form-label">Titre:</label>
        <input type="text" id="title" v-model="post.title" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="content" class="form-label">Contenu:</label>
        <textarea id="content" v-model="post.content" class="form-textarea" required></textarea>
      </div>
      <div class="form-group">
  <label for="img" class="form-label">Image</label>
  <input type="file" id="img" class="form-input" accept="image/*" @change="handleImageUpload">
  <img v-if="post.image" :src="post.imagePreview" alt="">
</div>
      <div class="form-group">
        <label for="date" class="form-label">Date de sortie:</label>
        <input type="text" id="date" v-model="post.date_de_sortie" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="categ" class="form-label">Catégorie :</label>
        <select id="categ" v-model="post.filmscateg" class="form-select" required>
          <option v-for="category in categories" :key="category.id" :value="category.name">{{ category.name }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>


<script>
import filmService from '@/services/filmService';
import { mapState } from 'vuex';
  export default {
        data(){
            return {
                post: {
                    title: '',
                    content: '',
                    date_de_sortie: '',
                    filmscateg: '',
                    image: ''
                },
                imagePreview: null
               
            }
        },
        computed: {
  ...mapState(['categories'])
},
created() {
  this.$store.dispatch('fetchCategories');
},
        methods: {
          handleImageUpload(event) {
    const file = event.target.files[0];
    this.post.image = file;
    this.imagePreview = URL.createObjectURL(file);
    console.log(this.imagePreview);
  },
            submitPost(){
                filmService.createFilm(this.post)
                .then(() => {
                    this.$router.push({name: 'filmsList'});
                })
                .catch(error => {
                    console.log(error.response.data);
                })
            }

        },
  
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
.form-textarea,
.form-select {
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