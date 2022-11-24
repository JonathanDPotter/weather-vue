<script setup lang="ts">
import { defineProps } from "vue";
import Icurrent from "@/interfaces/current";
import Iforecast from "@/interfaces/forecast";

interface Iprops {
  title: string;
  weather: Icurrent | Iforecast;
}

const { title, weather } = defineProps<Iprops>();
</script>

<template>
  <div class="weather-info card">
    <div class="card-header">
      <p class="card-title">{{ title }}</p>
    </div>
    <div class="card-body">
      <p class="card-text">{{ weather.current.temp_f }}&deg;</p>
      <p class="card-text">{{ weather.current.condition.text }}</p>
      <p class="card-text">
        Wind {{ weather.current.wind_dir }} {{ weather.current.wind_mph }}mph
      </p>
      <img
        :src="weather.current.condition.icon"
        :alt="weather.current.condition.text"
        height="100"
      />
    </div>
  </div>
</template>
