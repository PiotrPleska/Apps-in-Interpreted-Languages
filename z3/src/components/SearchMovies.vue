<template>
  <div class="SearchMovies">
    <form>
      <div class="form-group row">
        <label class = "col-sm-2 " for="inputTitle">Tytuł</label>
        <div class = "col-sm-10">
          <input v-model="searchCriteria.title" type="text" id="inputTitle" class="form-control" placeholder="Podaj tytuł lub fragment tytułu filmu">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 " for="inputProductionFrom">Rok produkcji od:</label>
        <div class="col-sm-10">
          <input v-model="searchCriteria.productionFrom" type="text" id="inputProductionFrom" class="form-control" placeholder="Liczba naturalna z przedziału 1900-2019">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2" for="inputProductionTo">Rok produkcji do:</label>
        <div class="col-sm-10">
          <input v-model="searchCriteria.productionTo" type="text" id="inputProductionTo" class="form-control" placeholder="Liczba naturalna z przedziału 1900-2019">
        </div>
      </div>
      <div class="form-group row ">
        <label  class = "col-sm-2 " for="inputCast">Obsada</label>
        <div class = "col-sm-10">
          <input v-model="searchCriteria.cast" type="text" id="inputCast" class="form-control" placeholder="Imię i nazwisko">
        </div>
      </div>
      <div class="form-group row">
        <button class="btn btn-info col-sm-12" type="button" @click="searchMovies()">Szukaj</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchMovies",
  props: {
    movies :Array
  },
  data() {
    return {
      localMovies : [],
      searchCriteria: {
        title: "",
        productionFrom: "",
        productionTo: "",
        cast: ""
      }
    };
  },
  mounted() {
    this.localMovies = this.movies;
  },
  methods: {
    searchMovies() {
      // Przykładowa implementacja wyszukiwania filmów na podstawie kryteriów
      const filteredMovies = this.localMovies.filter(movie => {
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