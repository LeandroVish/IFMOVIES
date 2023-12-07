<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import genreStore from '@/stores/genre'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false);
const tvs = ref([]);

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const listTvs = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  tvs.value = response.data.results
  isLoading.value = false;
};

function openTv(tvId) {
  router.push({ name: 'TvDetails', params: { tvId } });
}

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('tv');
  isLoading.value = false;
})
</script>

<template>
  <h1>Programas de TV</h1>
  <ul class="genre-list">
    <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      @click="listTvs(genre.id)"
      class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }"
    >
      {{ genre.name }}
    </li>
  </ul>

  <loading v-model:active="isLoading" is-full-page />

  <div class="Tv-list">
    <div v-for="Tv in tvs" :key="Tv.id" class="Tv-card">
      <img
        :src="`https://image.tmdb.org/t/p/w500${Tv.poster_path}`"
        :alt="Tv.name"
        @click="openTv(Tv.id)"
      />
      <div class="Tv-details">
        <p class="Tv-title">{{ Tv.name }}</p>
        <p class="Tv-first-air-date">{{ formatDate(Tv.first_air_date) }}</p>
        <p class="Tv-genres">
          <span
            v-for="genre_id in Tv.genre_ids"
            :key="genre_id"
            @click="listTvs(genre_id)"
            :class="{ active: genre_id === genreStore.currentGenreId }"
          >
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
      </div>
    </div>
  </div>
  <div class="footer">
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

.Tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.Tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid black;
  border-radius: 15px;
}

.Tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 5px 5px 0 0;
}

.Tv-details {
  padding: 0 0.5rem;
}

.Tv-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.Tv-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.Tv-genres span {
  background-color: transparent;
  border: 1px solid green;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  color: green;
  font-size: 0.8rem;
  font-weight: bold;
}

.Tv-genres span:hover {
  cursor: pointer;
  background-color: black;
}

.active {
  background-color: black;
  color: #fff;
  font-weight: bolder;
}

.Tv-genres span.active {
  background-color: black;
  font-weight: bolder;
}
.footer {
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
</style>