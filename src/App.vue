<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="brand-link">Movies</router-link>
    </div>
<p v-if="isLoggedIn">Bonjour, {{ userEmail }}</p>
    <div class="navbar-menu">
      <div class="dropdown">
        <button class="dropbtn">Catégories</button>
        <div class="dropdown-content">
          <a
            href=""
            @click.prevent="filterFilmsByCategory(category.id)"
            v-for="category in categories"
            :key="category.id"
            >{{ category.name }}</a
          >
        </div>
      </div>

      <span v-if="!isLoggedIn">
        <router-link to="/register" class="nav-link">Inscription</router-link>
        <router-link to="/login" class="nav-link">Connexion</router-link>
      </span>

      <span v-else class="user-info">
         <span v-if="isAdmin">
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        </span>
        <button @click="logout" class="btn btn-danger">Déconnexion</button>
       
      </span>
    </div>
  </nav>

  <router-view />
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { mapState } from 'vuex';





export default {

  data(){
    return {
      tablecateg: [],
      films: []
    }
  },

  computed:{
    ...mapGetters(['isLoggedIn','userEmail']),
    ...mapState(['categories', 'userRoles']),
    isAdmin() {
      return this.userRoles.includes('ROLE_ADMIN');
    }
    
    
  },

  methods:{
    ...mapActions(['logoutUser']),
    logout(){
      this.logoutUser();
      this.$router.push('/login');
    },
    filterFilmsByCategory(id){
      this.$router.push({name: 'categoryFilms', params: {id}});

    },


  
  },

  created(){
    this.$store.dispatch('fetchCategories')
  }
  
}

</script>

<style scoped>
/* Styles pour la barre de navigation */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}

/* Styles pour le lien de la marque */
.brand-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
}

/* Styles pour le menu de navigation */
.navbar-menu {
  display: flex;
  align-items: center;
}

/* Styles pour les liens de navigation */
.nav-link {
  color: #fff;
  text-decoration: none;
  margin-left: 20px;
}

/* Styles pour le menu déroulant */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #333;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* Styles pour les informations de l'utilisateur */
.user-info {
  display: flex;
  align-items: center;
}

.user-info p {
  margin-right: 10px;
}

/* Styles pour les boutons */
.btn {
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}
</style>

