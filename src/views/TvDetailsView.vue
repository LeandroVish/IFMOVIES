<script setup>
import { onMounted } from 'vue';
import { useTvStore } from '@/stores/tv';

const tvStore = useTvStore();

const props = defineProps({
    tvId: {
        type: String,
        required: true,
    },
});

onMounted(async () => {
    await tvStore.getTvDetail(props.tvId);
});
</script>

<template>
    <div class="main">
        <div class="content">
            <img
             :src="`https://image.tmdb.org/t/p/w185${tvStore.currentTv.poster_path}`"
             :alt="tvStore.currentTv.name"
             class="tv-poster" />

            <div class="details">
                <h1>{{ tvStore.currentTv.name }}</h1>
                <p>Tagline: {{ tvStore.currentTv.tagline }}</p>
                <p>Overview {{ tvStore.currentTv.overview }}</p>
                <p>Avaliação: {{ tvStore.currentTv.vote_average }}</p>
            </div>
        </div>
    </div>

    <p>Produtoras</p>
    <div class="companies">
        <template v-for="company in tvStore.currentTv.production_companies" :key="company.id">
            <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`" :alt="company.name" />
            <p v-else>{{ company.name }}</p>
        </template>
    </div>
</template>

<style scoped>
.main {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 5rem;
}
.content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
}
.tv-poster {
  max-width: 300px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.details {
  flex: 1;
}
.details p {
  margin-bottom: 8px;
}
.companies {
    display: flex;
    flex-direction: row;
    column-gap: 3rem;
    align-items: center;
    margin-bottom: 2rem;
}
</style>