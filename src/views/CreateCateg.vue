<template>
    <div class="container">
      <div class="form-container">
        <h1 class="form-title">Ajouter une catégorie</h1>
        <form @submit.prevent="submitCateg" class="form">
          <div class="form-group">
            <label for="title" class="form-label">Nom de la catégorie :</label>
            <input type="text" id="title" v-model="categ.name" class="form-input" required>
          </div>
          <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
      </div><h1 class="form-title">Vos catégories</h1>
      <div class="category-list">
        
        <div v-for="category in categories" :key="category.id" class="category-item">
          <h3 class="category-name">{{ category.name }}</h3>
          <div class="category-actions">
            <button @click="updateCateg(category.id)" class="btn btn-primary">Modifier</button>
            <button @click="deleteCateg(category.id)" class="btn btn-danger">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </template>


  <script>
  import filmService from '@/services/filmService';
  import { mapActions } from 'vuex';
  import { mapState } from 'vuex';
    import store from '@/store';

    export default {
          data(){
              return {
                  categ: {
                      name: ''
                     
                  }
              }
          },
          computed: {
            ...mapState(['categories', 'userRoles']),
          },
          methods: {
              ...mapActions(['fetchCategories']),
    submitCateg() {
      filmService.addCateg(this.categ)
        .then(() => {
          this.$router.push({ name: 'filmsList' });
         
          store.dispatch('fetchCategories');
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateCateg(id){
        this.$router.push({name: 'UpdateCateg', params: {id}})

    },
    deleteCateg(id){
        filmService.deleteCateg(id)
                    .then(() => {
                        this.fetchCategories();
                    })
                    .catch(error => {
                        console.log(error)
                    })
        },
  
          },
 
    }
  </script>
  
  <style scoped>
  /* Styles pour le conteneur du formulaire */
  .container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Styles pour le conteneur du formulaire */
.form-container {
  max-width: 400px;
  margin: 0 auto 20px;
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

.btn-danger {
  background-color: #dc3545;
  color: #fff;
  border: none;
}

.btn-danger:hover {
  background-color: #c82333;
}

/* Styles pour la liste des catégories */
.category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.category-item {
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  text-align: center;
  width: 300px;
}

.category-name {
  font-size: 18px;
  margin-bottom: 10px;
}

.category-actions {
  display: flex;
  justify-content: center;
}
  </style>