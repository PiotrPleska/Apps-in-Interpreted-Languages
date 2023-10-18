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
    <div class="form-group row">
    <button class="btn btn-info col-sm-4"  @click="showMore">Pokaż więcej</button>
    <span class="info-text col-sm-4 text-center" style="font-weight: bold;">Liczba filmów: {{ this.displayedMovies.length }}/{{ this.localMovies.length }}</span>
    <button class="btn btn-info col-sm-4"  @click="reset">RESET</button>
  </div>
  </div>
</template>

<script>
export default {
  name: "TableWithVideos",
  props: {
    movies :Array
  },
  data() {
    return {
      localMovies: [],
      displayedMovies: [], // Filmy do wyświetlenia
      itemsPerPage: 10, // Ilość filmów na stronie
      currentPage: 1,
    };
  },
  
  mounted() {
    //alert("table"+this.movies);
    this.localMovies = this.movies;
    this.updateDisplayedMovies();
    this.emitter.on("filteredMovies", (data) => {
      // alert(data)
      this.localMovies = data;
      this.updateDisplayedMovies();
    });
  },

  methods: {
    updateDisplayedMovies() {
      // Aktualizacja wyświetlanych filmów na podstawie bieżącej strony i ilości filmów na stronie;
      const end = this.itemsPerPage*this.currentPage;
      this.displayedMovies = this.localMovies.slice(0, end);
    },
    showMore() {
      //localMovies to wszystkie 
      // Obsługa przycisku "Pokaż więcej"
      this.currentPage++; // Przejdź do kolejnej strony
      this.updateDisplayedMovies(); // Zaktualizuj wyświetlane filmy
    },
    reset() {
      //localMovies to wszystkie 
      // Obsługa przycisku "Pokaż więcej"
      this.currentPage = 1; // Przejdź do kolejnej strony
      this.updateDisplayedMovies(); // Zaktualizuj wyświetlane filmy
    },
  },
};
</script>