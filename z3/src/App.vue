
<template>
  <h1>Baza filmów</h1>
  <div id="App">
    <SearchMovies :movies="movies"/>
    <TableWithVideos :movies="movies"/>
    <MoviesByGenres :movies="movies"/>
    <MoviesByCast :movies="movies"/>
  </div>
</template>

<script>
import SearchMovies from './components/SearchMovies.vue'
import MoviesByGenres from "@/components/MoviesByGenres.vue";
import MoviesByCast from "@/components/MoviesByCast.vue";
import TableWithVideos from "@/components/TableWithVideos.vue";
import data from "@/../public/data/movies.json";


export default {
  created() {
    this.loadMovies();
  },
  components: {
    SearchMovies,
    MoviesByGenres,
    MoviesByCast,
    TableWithVideos
  },
  name: 'App',
  data() {
    return {
      movies: []  // Declare the movies array in the data section
    };
  },

methods:{
  loadMovies() {
            this.movies = data;
    }
},


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