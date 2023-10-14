<template>
  <h1>Baza filmów</h1>
  <div id="App">
    <SearchMovies/>
    <TableWithVideos/>
    <MoviesByCast/>
    <MoviesByGenres/>
  </div>
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
  text-align: left;
  margin: 50px;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}
</style>