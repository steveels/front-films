<template>
  <div class="users-container">
    <h1 class="users-title">Liste des utilisateurs</h1>
    <div class="users-list">
      <div v-for="user in users" :key="user.id" class="user-card">
        <div class="user-info">
          <p class="user-email">{{ user.email }}</p>
          <p class="user-name">{{ user.name }}</p>
          <p class="user-status">{{ user.bannir ? 'Banni' : 'Actif' }}</p>
        </div>
        <div class="user-actions">
          <button @click="banUser(user.id)" class="btn btn-danger">Bannir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from '@/services/userService';
export default {
    data(){
        return {
            users:[]
        }
    },
    methods:{
        async fetchUsers() {
        try {
          const res = await userService.AdminUsers();
          this.users = res.data;
        } catch (error) {
          console.log(error)
        }
      },
      banUser(id){
        userService.AdminUsersList(id)
        .then(()=>{
            this.fetchUsers();
        })
        .catch(error => {
          console.error(error);
        });
      }

    },
    created() {
    this.fetchUsers();
  }

}
</script>

<style scoped>
/* Styles pour le conteneur principal */
.users-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Styles pour le titre */
.users-title {
  text-align: center;
  margin-bottom: 20px;
}

/* Styles pour la liste d'utilisateurs */
.users-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}

/* Styles pour les cartes d'utilisateurs */
.user-card {
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Styles pour les informations d'utilisateur */


.user-email {
  font-weight: bold;
  margin-bottom: 5px;
}

.user-name {
  margin-bottom: 5px;
}

.user-status {
  color: #666;
}

/* Styles pour les actions d'utilisateur */


/* Styles pour les boutons */
.btn {
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
  border: none;
}
</style>