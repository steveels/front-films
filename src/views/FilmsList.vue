<template>
  <div class="films-container">
    <!-- Titre principal -->
    <h1 class="films-title">Liste des films</h1>

    <!-- Boutons d'administration (visibles uniquement pour les administrateurs) -->
    <div v-if="isAdmin" class="admin-buttons">
      <button @click="createPost" class="btn btn-primary">Ajouter un film</button>
      <button @click="createCateg" class="btn btn-secondary">Ajout & Gestion de catégorie</button>
    </div>

    <!-- Conteneur principal pour les cartes de films -->
    <div class="card-container">
      <!-- Carte de film -->
      <div class="film-card" v-for="film in AllfilmsData" :key="film.id">
        <div class="film-title">{{ film.title }}</div>
        <div class="film-content">{{ film.content }}</div>
        <img v-if="film.image" :src="film.image" alt="">
        <div class="film-release-date">Date de sortie : {{ formatDate(film.date_de_sortie) }}</div>
        <button @click="viewDetail(film.id)" class="btn btn-info">Détails</button>

        <!-- Bouton de like/unlike (visible uniquement pour les utilisateurs connectés) -->
        <div v-if="isLoggedIn" class="like-button">
          <button @click="likeFilm(film.id)" :class="{ 'liked': film.liked }" class="btn btn-like">
            {{ film.liked ? 'Unlike' : 'Like' }}
          </button>
        </div>

        <!-- Boutons d'administration (visibles uniquement pour les administrateurs) -->
        <div v-if="isAdmin" class="admin-buttons">
          <button @click="editPost(film.id)" class="btn btn-warning">Modifier</button>
          <button @click="deletePost(film.id)" class="btn btn-danger">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import filmService from '@/services/filmService';
  import { mapGetters,mapActions} from 'vuex';
import { mapState } from 'vuex';


  export default {
    data() {
      return {
        AllfilmsData: [],
        errorMessage: ''
      }
    },
    computed:{
    ...mapGetters(['isLoggedIn','userEmail', 'isAdmin']),
    ...mapState(['categories', 'userRoles']),
    ...mapActions(['loginUser']),
    
    isAdmin() {
      return this.userRoles.includes('ROLE_ADMIN');
    }
    
    
  },
    methods: {
      async fetchFilms() {
        try {
          const res = await filmService.getFilms();
       
          this.AllfilmsData = res.data;
        } catch (error) {
          console.log(error)
        }
      },

      async likeFilm(id) {
  try {
    const filmIndex = this.AllfilmsData.findIndex(film => film.id === id);
    if (filmIndex !== -1) {
      if (this.AllfilmsData[filmIndex].liked) {
        // Unliker le film
        await filmService.unlikeFilm(id);
        this.AllfilmsData[filmIndex].liked = false;
      } else {
        // Liker le film
        await filmService.likeFilm(id);
        this.AllfilmsData[filmIndex].liked = true;
      }
    }
    this.fetchFilms(); // Rafraîchir la liste des films
  } catch (error) {
    this.errorMessage = error.response.data.message;
  }
},
      createPost(){
        this.$router.push({name: 'createFilm'});
    },
    createCateg(){
        this.$router.push({name: 'createCateg'});
    },
      viewDetail(id){
        this.$router.push({name: 'detailFilm', params: {id}});
    },
    editPost(id){
      this.$router.push({name: 'UpdateFilm', params: {id}});

    },
    deletePost(id){
        filmService.deletePost(id)
                    .then(() => {
                        this.fetchFilms();
                    })
                    .catch(error => {
                        console.log(error)
                    })
        },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
      }
    },
    created() {
      this.fetchFilms();
    }
  }
  </script>
  
  <style scoped>
/* Styles pour le conteneur principal */
.films-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Styles pour le titre principal */
.films-title {
  text-align: center;
  margin-bottom: 20px;
}

/* Styles pour les boutons d'administration */
.admin-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.admin-buttons .btn {
  margin: 0 10px;
}

/* Styles pour le conteneur de cartes de films */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
}

/* Styles pour les cartes de films */
.film-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background-color: #f9f9f9;
}

.film-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}

.film-content {
  margin-bottom: 10px;
}

.film-release-date {
  margin-bottom: 10px;
  color: #666;
}

.like-button {
  margin-bottom: 10px;
}

/* Styles pour les boutons */
.btn {
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-info {
  background-color: #17a2b8;
  color: #fff;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-like {
  background-color: #28a745;
  color: #fff;
}

.btn-like.liked {
  background-color: #dc3545;
}
</style>