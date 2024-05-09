import { createRouter, createWebHistory } from 'vue-router'
import FilmsList from '@/views/FilmsList.vue'
import DetailFilm from '@/views/DetailFilm.vue'
import RegisterUser from '@/views/RegisterUser.vue'
import LoginUser from '@/views/LoginUser.vue'
import comUser from '@/views/ComUser.vue'
import CategoriesFilms from '@/views/CategoriesFilms.vue'
import store from '../store'
import UpdateFilm from '@/views/UpdateFilm.vue'
import CreateFilm from '@/views/CreateFilm.vue'
import DashboardUsers from '@/views/AdminUsersList.vue'
import createCateg from '@/views/CreateCateg.vue'
import UpdateCateg from '@/views/UpdateCateg.vue'




const routes = [
  {
    path: '/',
    name: 'filmsList',
    component: FilmsList
  },
  {
    path: '/films/:id',
    name: 'detailFilm',
    component: DetailFilm,
    props: true

  },
  {
    path: '/comment/:id',
    name: 'comUser',
    component: comUser,
    beforeEnter: (to, from, next) => {
      if(store.getters.isLoggedIn) {
        next()
      } else {
        next('/login')
      }
    }

  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUser
  },
  {
    path: '/login',
    name: 'login',
    component: LoginUser
  },
  {
    path: '/categories/:id/films',
    name: 'categoryFilms',
    component: CategoriesFilms
  },
  {
    path: '/create',
    name: 'createFilm',
    component: CreateFilm,
    beforeEnter: (to, from, next) => {
      if(store.getters.isAdmin) {
        next()
      } else {
        next('/')
      }
    }

  },
  {
    path: '/UpdateFilm/:id',
    name: 'UpdateFilm',
    component: UpdateFilm,
    beforeEnter: (to, from, next) => {
      if(store.getters.isAdmin) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardUsers,
    beforeEnter: (to, from, next) => {
      if(store.getters.isAdmin) {
        next()
      } else {
        next('/')
      }
    }

  },
  {
    path: '/createCateg',
    name: 'createCateg',
    component: createCateg,
    beforeEnter: (to, from, next) => {
      if(store.getters.isAdmin) {
        next()
      } else {
        next('/')
      }
    }

  },
  {
    path: '/updateCateg/:id',
    name: 'UpdateCateg',
    component: UpdateCateg,
    beforeEnter: (to, from, next) => {
      if(store.getters.isAdmin) {
        next()
      } else {
        next('/')
      }
    }

  }
  
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
