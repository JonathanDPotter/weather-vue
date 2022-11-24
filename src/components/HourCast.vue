<script setup lang="ts">
import { IforecastHour } from "@/interfaces/forecast";
import { defineProps } from "vue";

interface Iprops {
  weather: IforecastHour;
}

const { weather } = defineProps<Iprops>();
</script>

<template>
  <div class="weather-info card">
    <div class="card-header">
      <h3 class="card-title">
        {{
          new Date(weather.time).toLocaleDateString([], {
            month: "short",
            weekday: "short",
            day: "numeric",
          })
        }}
      </h3>
    </div>
    <div class="card-body">
      <p class="card-text">
        {{
          new Date(weather.time)
            .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            .replace(/^\b0/g, "")
        }}
      </p>
      <p class="card-text">{{ weather.temp_f }}&deg;</p>
      <p class="card-text">{{ weather.condition.text }}</p>
      <p v-if="weather.chance_of_rain > 0" class="card-text">
        Chance of Precipitation {{ weather.chance_of_rain }}%
      </p>
      <p v-if="weather.chance_of_snow > 0" class="card-text">
        Chance of Precipitation {{ weather.chance_of_snow }}%
      </p>
      <p class="card-text">
        Wind {{ weather.wind_dir }} {{ Math.round(weather.wind_mph) }}mph
      </p>
      <img
        :src="weather.condition.icon"
        :alt="weather.condition.text"
        height="100"
      />
    </div>
  </div>
</template>
