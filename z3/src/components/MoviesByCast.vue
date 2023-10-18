<template>
  <div class="MoviesByCast">
    <h1>Filmy wg obsady</h1>
    <ul>
      <li v-for="cast in uniqueCast" :key="cast">
        {{ cast }}
        <ol>
          <li v-for="movie in moviesByCast(cast)" :key="movie.title">
            {{ movie.title }}
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from "underscore"; // Import biblioteki Underscore.js

export default {
  name: "MoviesByCast",
  props:{
    movies :Array
  },
  data() {
    return {
      localMovies: [], // Tablica filmów z pliku JSON
    };
  },
  computed: {
    uniqueCast() {
      const cast = _.chain(this.localMovies)
          .map("cast")
          .flatten()
          .uniq()
          .sort()
          .value();
      return cast;
    },
  },
  methods: {
    moviesByCast(cast) {
      const movies = _.filter(this.localMovies, (movie) => _.contains(movie.cast, cast));
      return _.sortBy(movies,'title');
    },
    sliceMovies() {
    
            const first100Movies = this.movies.slice(200, 300);
            this.localMovies = first100Movies;
      
    },
  },
  mounted() {
    this.localMovies = this.movies;
    this.sliceMovies();
  },
};
</script>

<style scoped>
/* Dodaj style, jeśli są potrzebne */
</style>
