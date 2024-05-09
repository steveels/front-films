<template>
  <div class="register-container">
    <h1 class="register-title">Inscription</h1>
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="email" class="form-label">E-mail :</label>
        <input type="email" id="email" v-model="userdata.email" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="name" class="form-label">Nom :</label>
        <input id="name" v-model="userdata.name" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="firstname" class="form-label">Prénom :</label>
        <input id="firstname" v-model="userdata.firstname" class="form-input" required>
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
export default {
  data(){
      return {
           userdata: {}
        }
    },
    methods:{
      async register(){
        try {
          await userService.register(this.userdata)
          console.log('User registered successfully!')
          this.$router.push('/login')
        } catch (error) {
          console.log(error)
        }
      }
      
    }

}
</script>

<style scoped>
/* Styles pour le conteneur d'inscription */
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Styles pour le titre */
.register-title {
  text-align: center;
  margin-bottom: 20px;
}
.register-form{
  display: flex;
  flex-direction: column;
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