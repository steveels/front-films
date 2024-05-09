<template>
    <div class="form-container">
      <h1 class="form-title">Modifier une catégorie</h1>
      <form @submit.prevent="submitCateg" class="form">
        <div class="form-group">
          <label for="title" class="form-label">Nom :</label>
          <input type="text" id="title" v-model="categ.name" class="form-input" required>
        </div>
        <button type="submit" class="btn btn-primary">Modifier</button>
      </form>
    </div>
  </template>

<script>
import filmService from '@/services/filmService'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      categ: {
        id: this.$route.params.id || null,
        name: ''
      }
    }
  },
  methods: {
    ...mapActions(['fetchCategories']),
   
    submitCateg() {
      if (this.categ.id) {
        // Mettre à jour une catégorie existante
        filmService.updateCateg(this.categ.id, this.categ)
          .then(() => {
            this.$router.push({ name: 'createCateg' })
            this.fetchCategories()
          })
          .catch(error => {
            console.error(error)
          })
      } 
    }
  },
  
}
</script>









<style>
.form-container {
  max-width: 400px;
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
.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
}

/* Styles pour les boutons du formulaire */
.btn {
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
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