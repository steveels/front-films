<template>
  <div class="films-container">
    <h2 class="films-title">Liste des films</h2>
    <ul class="films-list">
      <li v-for="film in films" :key="film.id" class="film-item">
        <div >
          <h3 class="film-title">{{ film.title }},</h3>
          <p class="film-content">{{ film.content }}</p>
          <p class="film-release-date">Date de sortie : {{ formatDate(film.date_de_sortie) }}</p>
          <div v-if="isLoggedIn" class="like-button">
          <button @click="likeFilm(film.id)" :class="{ 'liked': film.liked }" class="btn btn-like">
            {{ film.liked ? 'Unlike' : 'Like' }}
          </button>
        </div>
          <button @click="viewDetail(film.id)" class="btn btn-info">Détails</button>
         
          
        </div>
      </li>
    </ul>
  </div>
</template>
  
  <script>
  import filmService from '@/services/filmService'

  import { mapGetters,mapActions} from 'vuex';
import { mapState } from 'vuex';
  
  export default {
    data() {
    return {
      films: [],
      AllfilmsData: [],
    }
  },
  created() {
    this.fetchFilmsByCategory()
    this.fetchFilms()
  },
  computed:{
    ...mapGetters(['isLoggedIn','userEmail', 'isAdmin']),
    ...mapState(['categories', 'userRoles']),
    ...mapActions(['loginUser']),
    
    isAdmin() {
      return this.userRoles.includes('ROLE_ADMIN');
    }
    
    
  },
  watch: {
    '$route.params.id'() {
      this.fetchFilmsByCategory()
    }
  },
  methods: {
    fetchFilmsByCategory() {
      const categoryId = this.$route.params.id
      filmService.getFilmsByCategory(categoryId)
        .then(response => {
          this.films = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },

formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
      },
      viewDetail(id){
        this.$router.push({name: 'detailFilm', params: {id}});
    },
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
    const filmIndex = this.films.findIndex(film => film.id === id);
    if (filmIndex !== -1) {
      if (this.films[filmIndex].liked) {
        // Unliker le film
        await filmService.unlikeFilm(id);
        this.films[filmIndex].liked = false;
      } else {
        // Liker le film
        await filmService.likeFilm(id);
        this.films[filmIndex].liked = true;
      }
    }
  } catch (error) {
    this.errorMessage = error.response.data.message;
  }
},

  },
  
  
}

</script>

<style scoped>
/* Styles pour le conteneur principal */
.films-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Styles pour le titre */
.films-title {
  text-align: center;
  margin-bottom: 20px;
}

/* Styles pour la liste de films */
.films-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
}

/* Styles pour les éléments de la liste */
.film-item {
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* Styles pour les cartes de films */


.film-title {
  font-size: 18px;
  margin-bottom: 10px;
}
.like-button {
  margin-bottom: 10px;
}
.btn-like {
  background-color: #28a745;
  color: #fff;
}

.btn-like.liked {
  background-color: #dc3545;
 
}
</style>