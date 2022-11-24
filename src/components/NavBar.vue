<script setup lang="ts">
import { useStore } from "vuex";
import { ref, watch } from "vue";
import api from "@/api";
import Icoords from "@/interfaces/coords";
import zipOrNav from "@/enums/zipOrNav";
import LocationModal from "@/components/LocationModal.vue";
import ImpLogo from "@/components/ImpLogo.vue";

const store = useStore();

const locationString = ref<string | null>(null);

const getCoordsFromNavigator = () => {
  navigator.geolocation.getCurrentPosition((response) => {
    const { latitude, longitude } = response.coords;

    store.commit("setNavCoords", {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    });
  });
};

const getCity = async (location: Icoords) => {
  const city = await api.geoapify.getCity(
    location.latitude,
    location.longitude
  );

  locationString.value = city;
};

const getWeather = () => {
  !store.state.navCoords && getCoordsFromNavigator();
  store.state.navCoords &&
    store.state.selectedLocation === zipOrNav.Nav &&
    getCity(store.state.navCoords);
  store.state.zipCoords &&
    store.state.selectedLocation === zipOrNav.Zip &&
    getCity(store.state.zipCoords);
};

const onZipButtonClick = () => {
  store.commit("setShowLocationModal", true);
};

const onLocationButtonClick = () => {
  store.commit("setSelectedLocation", zipOrNav.Nav);
  store.commit("setShowLocationModal", false);
};

watch(
  store.state,
  () => {
    getWeather();
  },
  { immediate: true }
);
</script>

<template>
  <header class="text-bg-dark vh-20 container-fluid">
    <div class="row">
      <div class="col d-flex align-items-center">
        <ImpLogo height="32" fill="#ececec" />
        <h1 class="d-inline">Weather Imp</h1>
      </div>
      <div class="col d-flex align-items-end">
        <p v-if="locationString">{{ locationString }}</p>
        <div v-else class="d-flex align-items-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <span class="mx-2">Getting location...</span>
        </div>
      </div>
      <div class="col py-2 px-4">
        <button
          v-if="store.state.selectedLocation === zipOrNav.Nav"
          class="btn btn-secondary float-end"
          @click="onZipButtonClick"
        >
          Use Zip
        </button>
        <button
          v-else
          class="btn btn-secondary float-end"
          @click="onLocationButtonClick"
        >
          Use Location
        </button>
      </div>
    </div>
    <div class="row w-100">
      <nav class="w-100 d-flex justify-content-around">
        <router-link to="/">Current</router-link>
        <router-link to="/hourly">Hourly</router-link>
        <router-link to="/threeday">3 Day</router-link>
      </nav>
    </div>
    <div v-if="store.state.showLocationModal">
      <LocationModal />
    </div>
  </header>
</template>
