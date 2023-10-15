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
  data() {
    return {
      movies: [], // Tablica filmów z pliku JSON
    };
  },
  computed: {
    uniqueGenres() {
      const genres = _.chain(this.movies)
          .map("genres")
          .flatten()
          .uniq()
          .value();
      return genres;
    },
  },
  methods: {
    moviesByGenre(genre) {
      return _.filter(this.movies, (movie) => _.contains(movie.genres, genre));
    },
    loadMoviesFromJson() {
      fetch("/data/movies.json")
          .then((response) => response.json())
          .then((data) => {
            const first100Movies = data.slice(0, 100);
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
