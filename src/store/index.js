import { createStore } from 'vuex'
import userService from '@/services/userService'
import filmService from '@/services/filmService'


export default createStore({
  state: {
    user: null,
    categories: [],
    userRoles: []
    
  },
  getters: {
    isLoggedIn: state => !!state.user,
  userEmail: state => state.user ? state.user.email : null,
  isAdmin: state => state.userRoles.includes('ROLE_ADMIN')
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserRoles(state, roles) {
      state.userRoles = roles;
    },
    clearUser(state) {
      state.user = null;
      state.userRoles = [];
    },
    setCategories(state, categories) {
      state.categories = categories
    }
  },
  actions: {
    loginUser({ commit }, { email, roles }) {
      const user = { email };
      commit('setUser', user);
      commit('setUserRoles', roles);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('roles', JSON.stringify(roles));
    },
    async logoutUser({commit}){
      try {
        await userService.logout();
        commit('clearUser');
        localStorage.removeItem('user');
        localStorage.removeItem('roles');
      } catch (err) {
        console.log(err);
      }
  },
  loadUserFromStorage({ commit }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const roles = JSON.parse(localStorage.getItem('roles'));
    if (user && roles) {
      commit('setUser', user);
      commit('setUserRoles', roles);
    }
  },
  async fetchCategories({ commit }) {
    try {
      const response = await filmService.getCategories();
      commit('setCategories', response.data);
    } catch (err) {
      console.log(err);
    }
  }
 
}
})