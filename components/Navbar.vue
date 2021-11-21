<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light container">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <nuxt-link exact no-prefetch active-class="active" class="nav-link" to="/">
            Home
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link active-class="active" class="nav-link" to="/about">
            About
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link active-class="active" class="nav-link" to="/users">
            Users
          </nuxt-link>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {

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
