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
export default {
  name: "MoviesByGenres",
  data() {
    return {
      movies: [], // Tablica filmów z pliku JSON
    };
  },
  computed: {
    uniqueGenres() {
      // Uzyskaj unikalne gatunki filmów
      const genres = new Set();
      this.movies.forEach((movie) => {
        movie.genres.forEach((genre) => {
          genres.add(genre);
        });
      });
      return Array.from(genres);
    },
  },
  methods: {
    moviesByGenre(genre) {
      // Filtruj filmy danego gatunku
      return this.movies.filter((movie) => movie.genres.includes(genre));
    },
    loadMoviesFromJson() {
      // Wczytaj dane z pliku JSON
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
