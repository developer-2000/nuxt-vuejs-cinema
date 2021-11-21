export const state = () => ({
  films: []
});

export const mutations = {
  // внести изменения в свойство
  setFilms(state, arr){
    state.films = arr
  }
};

export const actions = {
  // выбрать данные фильмов
  async loadF({commit, dispatch}, search = {search:'', genres:''}){
    const films = await this.$axios.$get('https://cinema-api-test.y-media.io/v1/movies?name='+search.search+'&genres='+search.genres);
    if(films.error_code == 0){
      // отдать данные сетеру
      commit('setFilms', films.data)
    }
    // вызов другова метода action с передачей данных
    // dispatch('nameMethod', arr)
  }
};

export const getters = {
  // взять данные свойства
  getFilms: state => state.films
};
