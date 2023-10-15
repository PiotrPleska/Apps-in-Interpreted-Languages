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
  data() {
    return {
      movies: [], // Tablica filmów z pliku JSON
    };
  },
  computed: {
    uniqueCast() {
      const cast = _.chain(this.movies)
          .map("cast")
          .flatten()
          .uniq()
          .value();
      return cast;
    },
  },
  methods: {
    moviesByCast(cast) {
      return _.filter(this.movies, (movie) => _.contains(movie.cast, cast));
    },
    loadMoviesFromJson() {
      fetch("/data/movies.json")
          .then((response) => response.json())
          .then((data) => {
            const first100Movies = data.slice(200, 300);
            this.movies = first100Movies;
          })
          .catch((error) => {
            console.error("Błąd wczytywania danych:", error);
          });
    },
  },
  mounted() {
    this.loadMoviesFromJson();
  },
};
</script>

<style scoped>
/* Dodaj style, jeśli są potrzebne */
</style>
