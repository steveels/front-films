<template>
  <div class="login-container">
    <h1 class="login-title">Connexion</h1>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="email" class="form-label">E-mail :</label>
        <input type="email" id="email" v-model="userdata.email" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="pwd" class="form-label">Mot de passe :</label>
        <input type="password" id="pwd" v-model="userdata.password" class="form-input" required>
      </div>
      <button type="submit" class="btn btn-primary">Valider</button>
    </form>
  </div>
</template>

<script>
import userService from '@/services/userService';
import { mapActions } from 'vuex';


export default {
data(){
 return{
    userdata:{},
    errorMessage: ''
   }

},
methods:{
 ...mapActions(['loginUser']),
 

 async login(){
   try{
    const response = await userService.login(this.userdata);
        console.log('User logged in successfully!');
        console.log('Response:', response);

        // Récupérer les rôles de l'utilisateur depuis la réponse
        const roles = response.data.roles;

        // Stocker les rôles de l'utilisateur dans le store Vuex
        this.loginUser({ email: this.userdata.email, roles });
     this.$router.push('/')
   }catch(error){
     console.log(error);
     this.errorMessage = error.response.data.message;
     
   }
 }
}

}
</script>

<style scoped>
/* Styles pour le conteneur de connexion */
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Styles pour le titre */
.login-title {
  text-align: center;
  margin-bottom: 20px;
}

/* Styles pour le message d'erreur */
.error-message {
  color: #dc3545;
  margin-bottom: 10px;
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