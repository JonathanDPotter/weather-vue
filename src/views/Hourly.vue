<script setup lang="ts">
import api from "@/api";
import zipOrNav from "@/enums/zipOrNav";
import Icoords from "@/interfaces/coords";
import Iforecast, { IforecastHour } from "@/interfaces/forecast";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import HourCast from "@/components/HourCast.vue";
import Loading from "@/components/Loading.vue";

const store = useStore();

const coords = ref<Icoords | null>(null);
const weather = ref<Iforecast | null>(null);
const hoursArray = ref<IforecastHour[]>([]);

watch(
  coords,
  async () => {
    if (coords.value) {
      const response = await api.weather.getThreeDay(coords.value);
      weather.value = response?.data;
    }
  },
  { immediate: true }
);

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

watch(weather, () => {
  if (weather.value)
    hoursArray.value = [
      ...weather.value.forecast.forecastday[0].hour,
      ...weather.value.forecast.forecastday[1].hour,
    ]
      .filter((item, i) => {
        const hour = new Date(item.time);
        const now = new Date();
        return hour > now;
      })
      .slice(0, 24);
});
</script>

<template>
  <div class="container-fluid">
    <div v-if="weather">
      <h2 class="my-4 text-center">Hourly Forecast</h2>
      <div class="w-100 d-flex flex-row flex-wrap justify-content-around">
        <div v-for="hour in hoursArray" :key="`Hour${hour.time_epoch}`">
          <HourCast :weather="hour" />
        </div>
      </div>
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>
