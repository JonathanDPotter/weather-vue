<script setup lang="ts">
import { IforecastDay } from "@/interfaces/forecast";
import { defineProps } from "vue";
interface Iprops {
  forecast: IforecastDay;
}

const { forecast } = defineProps<Iprops>();
</script>

<template>
  <div class="weather-info card mx-auto">
    <div class="card-header">
      <h3 class="card-title">
        {{
          `${new Date(forecast.hour[0].time).toLocaleDateString([], {
            month: "short",
            weekday: "short",
            day: "numeric",
          })}`
        }}
      </h3>
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-around">
        <div class="high">
          <h4 class="card-title">High</h4>
          <p class="card-text">{{ forecast.day.maxtemp_f }}&deg;</p>
        </div>
        <div class="card-text">
          <h4 class="card-title">Low</h4>
          <p class="card-text">{{ forecast.day.mintemp_f }}&deg;</p>
        </div>
      </div>
      <div class="precip-wind">
        <h4 v-if="forecast.day.daily_chance_of_rain > 0">Chance of Rain</h4>
        <p v-if="forecast.day.daily_chance_of_rain > 0" class="chance-rain">
          {{ forecast.day.daily_chance_of_rain }}%
        </p>

        <div v-if="forecast.day.daily_chance_of_snow > 0">
          <h4 class="card-title">Chance of Snow:</h4>
          <p class="card-text">{daily_chance_of_snow}%</p>
        </div>
        <h4 v-if="forecast.day.totalprecip_in" class="card-title">
          Total Precipitation:
        </h4>
        <p v-if="forecast.day.totalprecip_in" class="card-text">
          {{ forecast.day.totalprecip_in }} in
        </p>
        <h4 class="card-title">Winds up to:</h4>
        <p class="card-text">{{ Math.round(forecast.day.maxwind_mph) }} MPH</p>
      </div>
      <h4 class="card-title">{{ forecast.day.condition.text }}</h4>
      <img
        :src="forecast.day.condition.icon"
        :alt="forecast.day.condition.text"
        height="100"
      />
    </div>
  </div>
</template>
