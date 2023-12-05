<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import genreStore from '@/stores/genre'


const isLoading = ref(false);

const movies = ref([]);

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')


onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('tv')
  isLoading.value = false
})

const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  });
  movies.value = response.data.results;
  isLoading.value = false;
};  

</script>
<template>
  <div class="container">

    <h1>Filmes</h1>
    <ul class="genre-list">
      <li 
        v-for="genre in genreStore.genres" 
        :key="genre.id" 
        @click="listMovies(genre.id)" 
        class= "genre-item"
        :class="{ active: genre.id === genreStore.currentGenreId }">
      {{ genre.name }}</li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />

  </div>
  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">

      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
        <p class="movie-genres">
          <span  v-for="genre_id in movie.genre_ids" :key="genre_id" @click="listMovies(genre_id)"
            :class="{ active: genre_id === genreStore.currentGenreId }" style="display: flex;justify-content: space-between;">
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
      </div>
    </div>
  </div>

  <div class="rodape">
    <h3>IFMOVIES</h3>
  </div>
</template>
<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin-bottom: 2rem;
}
.genre-item {
  margin-top: 20px;
  border-radius: 15px;
  width: none;
  height: 50px;
  display: flex;
  align-items: center;
  border: 1px solid black;
  padding: 0.5rem;
  color: black;
  transition: 0.5s;
}
.genre-item:hover {
  cursor: pointer;
  background-color: black;
  color: #fff;
}
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
.movie-card {
  width: 15rem;
  height: 31rem;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid black;
}
.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 5px 5px 0 0;
}
.movie-details {
  padding: 0 0.5rem;
}
.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}
.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}
.movie-genres span {
  background-color: transparent;
  border: 1px solid green;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  color: green;
  font-size: 0.8rem;
  font-weight: bold; 
}
.movie-genres span:hover {
  cursor: pointer;
  background-color: black;
}
.rodape {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: #fff;
  padding: 1rem;
}
.active {
  background-color: black;
  color: #fff;
  font-weight: bolder;
}
.movie-genres span.active {
  background-color: black;
  font-weight: bolder;
}
</style>