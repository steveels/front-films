<template>
    <div class="form-container">
      <h1 class="form-title">Ajouter un post</h1>
      <form @submit.prevent="submitPost" class="form">
        <div class="form-group">
          <label for="content" class="form-label">Contenu :</label>
          <textarea id="content" v-model="post.content" class="form-textarea" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Valider</button>
      </form>
    </div>
  </template>
<script>
import comService from '@/services/comService';
export default {
    data(){
        return {
            post:{
                content:''
            }
        }
    },
    methods: {
        async submitPost() {
        const id = this.$route.params.id; // Récupérer l'id du film depuis les paramètres de la route
        try {
            await comService.createPost(id, this.post.content); // Passer l'id et le contenu du post à la méthode createPost
            this.$router.push('/'); // Rediriger vers la page de connexion après la création du post
        } catch (error) {
            console.log(error);
        }
    },
    
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
.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
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