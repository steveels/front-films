<template>
  <div v-if="detailFilm" class="detail-container">
    <div class="card-container">
      <div class="film-details">
        <h2 class="film-title">{{ detailFilm.title }}</h2>
        <p class="film-content">{{ detailFilm.content }}</p>
        <p class="film-release-date">Date de sortie : {{ formatDate(detailFilm.date_de_sortie) }}</p>
        <button @click="com(detailFilm.id)" class="btn btn-primary">Commenter</button>
      </div>
    </div>

    <div class="comments-section">
      <h2 class="comments-title">Liste des commentaires</h2>
      <div class="card-container">
        <div class="comment-card" v-for="com in commentData" :key="com.id">
          <p class="comment-content">{{ com.content }}</p>
          <div class="comment-meta">
            <span>Commenté par : {{ com.user }}</span>
            <span>Le : {{ com.date_commentaire }}</span>
          </div>
          <div v-if="isLoggedIn" class="comment-actions">
            <button
              @click="toggleLike(com.id)"
              :class="{ 'liked': isLiked(com.id), 'unliked': !isLiked(com.id) }"
              class="btn btn-like"
            >
              {{ isLiked(com.id) ? 'Unlike' : 'Like' }}
            </button>
          </div>
          <div v-if="isAdmin" class="comment-actions">
            <button @click="deleteComment(com.id)" class="btn btn-danger">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import filmService from '@/services/filmService';
 import comService from '@/services/comService';
 import { mapGetters,mapActions} from 'vuex';
 import { mapState } from 'vuex';
 
export default {
    data(){
        return {
            detailFilm: null,
            commentData: [],
            likedComments: []
        }
    },
    computed:{
    ...mapGetters(['isLoggedIn','userEmail']),
    ...mapState(['categories', 'userRoles']),
    ...mapActions(['loginUser']),
    
    isAdmin() {
      return this.userRoles.includes('ROLE_ADMIN');
    }
    
    
  },
    methods: {
        fetchFilms(){
            let id = this.$route.params.id;
            filmService.getFilm(id)
            .then(res => {
               this.detailFilm = res.data ;
              
               this.fetchComments(id);
            })
            .catch(error => {
                console.log(error)
            })
        },
        fetchComments(id) {
  comService.getComment(id)
    .then(res => {
      this.commentData = res.data; // Accéder à commentData avec this
      
    })
    .catch(error => {
      console.log(error);
    });
},
deleteComment(id){
        comService.deleteComment(id)
                    .then(() => {
                      this.commentData = this.commentData.filter(com => com.id !== id);
                    })
                    .catch(error => {
                        console.log(error)
                    })
        },
        toggleLike(commentId) {
    const isLiked = this.isLiked(commentId);
    if (isLiked) {
      // Unliker le commentaire
      comService.unlikecom(commentId)
        .then(() => {
          this.likedComments = this.likedComments.filter(id => id !== commentId);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // Liker le commentaire
      comService.likecom(commentId)
        .then(() => {
          this.likedComments.push(commentId);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  isLiked(commentId) {
    return this.likedComments.includes(commentId);
  },
       

        formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
      },
    
      com(id){
        this.$router.push({name: 'comUser' , params: {id}});
      }
    },
    
    created(){
        this.fetchFilms();
        let id = this.$route.params.id;
        this.fetchComments.bind(this)(id); 
    }

}
</script>


<style scoped>
/* Styles pour le conteneur principal */
.detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Styles pour le conteneur de carte */
.card-container {
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

/* Styles pour les détails du film */
.film-details {
  text-align: center;
}

.film-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.film-content {
  margin-bottom: 10px;
}

.film-release-date {
  margin-bottom: 20px;
  color: #666;
}

/* Styles pour la section des commentaires */
.comments-section {
  margin-top: 40px;
}

.comments-title {
  text-align: center;
  margin-bottom: 20px;
}

/* Styles pour les cartes de commentaires */
.comment-card {
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.comment-content {
  margin-bottom: 10px;
}

.comment-meta {
  margin-bottom: 10px;
  color: #666;
}

.comment-meta span {
  margin-right: 10px;
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
}

/* Styles pour les boutons */
.btn {
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-like {
  background-color: #28a745;
  color: #fff;
  border: none;
}

.btn-like.liked {
  background-color: #dc3545;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
  border: none;
}
</style>