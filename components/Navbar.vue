<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light container">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <nuxt-link exact no-prefetch active-class="active" class="nav-link" to="/">
            Home
          </nuxt-link>
        </li>
      </ul>

      <form @submit.prevent="onSubmit" class="d-flex">
<!--        <b-form-select v-model="selected" :options="options"></b-form-select>-->
        <select v-model="controls.genres" class="form-select  me-2">
          <option value="" selected>Search genres film</option>
          <option v-for="(item, key) in options" :key="key" :value="item.value" >
            {{item.text}}
          </option>
        </select>
        <input v-model="controls.search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>

    </div>
  </nav>
</template>

<script>
  export default {
    head: {
      title: `Вход в панель администратора | ${process.env.appName}`
    },
    data() {
      return {
        controls: {
          genres: '',
          search: ''
        },
        selected: null,
        options: [
          { value: 0, text: 'Action' },
          { value: 1, text: 'Adventures' },
          { value: 2, text: 'Comedy' },
          { value: 3, text: 'Drama' },
          { value: 4, text: 'Horror' },
          { value: 5, text: 'Westerns' },
        ]
      }
    },
    mounted() {},
    methods: {
      async onSubmit() {
        const formData = {
          search: this.controls.search,
          genres: this.controls.genres
        }
        console.log(formData)
        await this.$store.dispatch('films/loadF', formData)
      }
    }
  }
</script>

<style scoped>
  .navbar{
      display: flex;
      justify-content: center;
  }
  .navbar-collapse{
    display: flex;
    justify-content: space-between;
  }
</style>
