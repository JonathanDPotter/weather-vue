<script setup lang="ts">
import { watch, ref } from "vue";
import Icoords from "@/interfaces/coords";
import Icurrent from "@/interfaces/current";
import api from "@/api";
import { useStore } from "vuex";
import zipOrNav from "@/enums/zipOrNav";
import CurrentWeather from "@/components/CurrentWeather.vue";
import Loading from "@/components/Loading.vue";

const coords = ref<Icoords | null>(null);
const weather = ref<Icurrent | null>(null);
const store = useStore();

watch(coords, async () => {
  if (coords.value) {
    const response = await api.weather.getCurrent(coords.value);
    if (response) {
      weather.value = response;
    }
  }
});

watch(
  store.state,
  () => {
    if (store.state.navCoords && store.state.selectedLocation === zipOrNav.Nav)
      coords.value = store.state.navCoords;
    if (store.state.zipCoords && store.state.selectedLocation === zipOrNav.Zip)
      coords.value = store.state.zipCoords;
  },
  { immediate: true }
);
</script>

<template>
  <div class="h-100 w-100 d-flex flex-column">
    <h2 class="my-4 text-center">Current Weather</h2>
    <div v-if="weather" class="col mx-auto">
      <CurrentWeather title="Current" :weather="weather" />
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>
