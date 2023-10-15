<template>
  <div class="TableWithVideos">
    <table class="table table-bordered table-hover">
      <thead>
      <tr>
        <th>Nr filmu</th>
        <th>Tytuł</th>
        <th>Rok produkcji</th>
        <th>Obsada</th>
        <th>Gatunki</th>
        <th>Opis</th>
        <th>Plakat</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(movie, index) in displayedMovies" :key="index">
        <td>{{ index + 1 }}.</td>
        <td>{{ movie.title }}</td>
        <td>{{ movie.year }}</td>
        <td>
            <span v-if="movie.cast">{{ movie.cast.join(', ') }}</span>
            <span v-else>No cast information</span>
          </td>
          <td>
            <span v-if="movie.genres">{{ movie.genres.join(', ') }}</span>
            <span v-else>No genre information</span>
          </td>
        <td>{{movie.extract}}</td>
        <td>
          <img :src="movie.thumbnail" :width="movie.thumbnail_width" :height="movie.thumbnail_height" />
        </td>
      </tr>
      </tbody>
    </table>
    <button @click="showMore">Pokaż więcej</button>
  </div>
</template>

<script>
export default {
  name: "TableWithVideos",
  data() {
    return {
      movies: [], // Tu przechowujemy wszystkie filmy z pliku JSON
      displayedMovies: [], // Filmy do wyświetlenia
      itemsPerPage: 10, // Ilość filmów na stronie
      currentPage: 1,
    };
  },
  created() {
    this.loadMovies();
  },
  mounted() {
    this.emitter.on("filteredMovies", (data) => {
      // alert(data)
      console.log("a")
      this.movies = data;
      this.updateDisplayedMovies();
    });
  },

  methods: {

    loadMovies() {
      // Wczytaj dane z pliku JSON przy użyciu względnej ścieżki wewnątrz projektu Vue.js
      fetch("/data/movies.json") // Zakładając, że plik JSON jest w katalogu public/data/
          .then((response) => response.json())
          .then((data) => {
            this.movies = data;
            this.updateDisplayedMovies();
          })
          .catch((error) => {
            console.error("Błąd wczytywania danych:", error);
          });
    },
    updateDisplayedMovies() {
      // Aktualizacja wyświetlanych filmów na podstawie bieżącej strony i ilości filmów na stronie;
      const end = this.itemsPerPage*this.currentPage;
      this.displayedMovies = this.movies.slice(0, end);
    },
    showMore() {
      // Obsługa przycisku "Pokaż więcej"
      this.currentPage++; // Przejdź do kolejnej strony
      this.updateDisplayedMovies(); // Zaktualizuj wyświetlane filmy
    },
  },
};
</script>