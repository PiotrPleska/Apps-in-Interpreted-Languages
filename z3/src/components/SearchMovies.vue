<template>
  <div class="SearchMovies">
    <form>
      <div class="form-group">
        <label for="inputTitle">Tytuł</label>
        <input v-model="searchCriteria.title" type="text" id="inputTitle" class="form-control" placeholder="Podaj tytuł lub fragment tytułu filmu">
      </div>
      <div class="form-group row">
        <label class="col-sm-4 col-form-label" for="inputProductionFrom">Rok produkcji od:</label>
        <div class="col-sm-8">
          <input v-model="searchCriteria.productionFrom" type="text" id="inputProductionFrom" class="form-control" placeholder="Liczba naturalna z przedziału 1900-2019">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4 col-form-label" for="inputProductionTo">Rok produkcji do:</label>
        <div class="col-sm-8">
          <input v-model="searchCriteria.productionTo" type="text" id="inputProductionTo" class="form-control" placeholder="Liczba naturalna z przedziału 1900-2019">
        </div>
      </div>
      <div class="form-group">
        <label for="inputCast">Obsada</label>
        <input v-model="searchCriteria.cast" type="text" id="inputCast" class="form-control" placeholder="Imię i nazwisko">
      </div>
      <div class="form-group row">
        <button class="btn btn-info col-sm-12" @click="searchMovies()">Szukaj</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchMovies",
  data() {
    return {
      movies : [],
      searchCriteria: {
        title: "",
        productionFrom: "",
        productionTo: "",
        cast: ""
      }
    };
  },
  mounted() {
    this.loadMovies();
  },
  methods: {
    loadMovies() {
      // Wczytaj dane z pliku JSON przy użyciu względnej ścieżki wewnątrz projektu Vue.js
      fetch("/data/movies.json") // Zakładając, że plik JSON jest w katalogu public/data/
          .then((response) => response.json())
          .then((data) => {
            this.movies = data;
          })
          .catch((error) => {
            console.error("Błąd wczytywania danych:", error);
          });
    },
    searchMovies() {
      // Przykładowa implementacja wyszukiwania filmów na podstawie kryteriów
      const filteredMovies = this.movies.filter(movie => {
        const titleMatch = movie.title.toLowerCase().includes(this.searchCriteria.title.toLowerCase());
        const productionYearMatch = (
            (!this.searchCriteria.productionFrom || movie.year >= parseInt(this.searchCriteria.productionFrom)) &&
            (!this.searchCriteria.productionTo || movie.year <= parseInt(this.searchCriteria.productionTo))
        );
        const castMatch = movie.cast.some(actor => actor.toLowerCase().includes(this.searchCriteria.cast.toLowerCase()));
        return titleMatch && productionYearMatch && castMatch;
      });

      // Aktualizacja wyświetlanych filmów
      //const filteredMoviesStr = JSON.stringify(filteredMovies, null, 2);

      this.emitter.emit("filteredMovies", filteredMovies);


    }
  }
}
</script>

<style scoped>
.form-group {
  padding: 10px;
}
</style>