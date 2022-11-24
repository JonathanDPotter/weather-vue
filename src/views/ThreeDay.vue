<script setup lang="ts">
import api from "@/api";
import Icoords from "@/interfaces/coords";
import Iforecast from "@/interfaces/forecast";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import Forecast from "@/components/Forecast.vue";
import zipOrNav from "@/enums/zipOrNav";
import Loading from "@/components/Loading.vue";

const store = useStore();

const coords = ref<Icoords | null>(null);
const weather = ref<Iforecast | null>(null);

watch(coords, async () => {
  if (coords.value) {
    const response = await api.weather.getThreeDay(coords.value);

    weather.value = response?.data;
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
  <div>
    <h2>Three Day Forecast</h2>
    <div v-if="weather" class="container-fluid">
      <div class="row justify-content-evenly">
        <div
          class="col h-100"
          v-for="(day, index) in weather.forecast.forecastday"
          :key="`forecastDay${index}`"
        >
          <Forecast :forecast="day" />
        </div>
      </div>
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>
