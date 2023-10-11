<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <SearchMovies msg="SearchMovies"/>
  <TableWithVideos msg="Table with videos"/>
  <MoviesByCast msg="MoviesByCast"/>
  <MoviesByGenres msg="MoviesByGenres"/>
</template>

<script>
import SearchMovies from './components/SearchMovies.vue'
import MoviesByGenres from "@/components/MoviesByGenres.vue";
import MoviesByCast from "@/components/MoviesByCast.vue";
import TableWithVideos from "@/components/TableWithVideos.vue";

export default {
  name: 'App',
  components: {
    SearchMovies,
    MoviesByGenres,
    MoviesByCast,
    TableWithVideos
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
