<template>
  <div class="MoviesByGenres">
    <h1>Filmy wg gatunku</h1>
    <ul>
      <li v-for="genre in uniqueGenres" :key="genre">
        {{ genre }}
        <ol>
          <li v-for="movie in moviesByGenre(genre)" :key="movie.title">
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
  name: "MoviesByGenres",
  props:{
    movies:Array
  },
  data() {
    return {
      localMovies: [], // Tablica filmów z pliku JSON
    };
  },
  computed: {
    uniqueGenres() {
      const genres = _.chain(this.localMovies)
          .map("genres")
          .flatten()
          .uniq()
          .sort()
          .value();
      return genres;
    },
  },
  methods: {
    moviesByGenre(genre) {
      const movies = _.filter(this.localMovies, (movie) => _.contains(movie.genres, genre));
      const sort_movies = _.sortBy(movies,'title')
      return  sort_movies
    },
    sliceMovies() {
            const first100Movies = this.movies.slice(0, 100);
            this.localMovies = first100Movies; 
          }
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
