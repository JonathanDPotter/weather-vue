<script setup lang="ts">
import api from "@/api";
import zipOrNav from "@/enums/zipOrNav";
import { ref } from "vue";
import { useStore } from "vuex";

const zipCode = ref<string>("");
const store = useStore();

const handleSubmit = async () => {
  const zipCoords = await api.geoapify.getCoordsFromZip(zipCode.value);
  console.log(zipCoords);
  if (zipCoords.longitude) {
    store.commit("setZipCoords", zipCoords);
    store.commit("setSelectedLocation", zipOrNav.Zip);
    store.commit("setShowLocationModal", false);
  }
};
</script>

<template>
  <div class="position-absolute top-0 left-0 d-flex bg-shadow modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-bg-light">
        <div class="modal-header">
          <h5 class="modal-title">Enter Zip</h5>
        </div>
        <div class="modal-body">
          <form action="submit" @submit.prevent="handleSubmit">
            <label for="zipcode" class="mx-4">Zip Code</label>
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              pattern="[0-9]*"
              v-model="zipCode"
            />
          </form>
          <div class="modal-footer">
            <button
              @click="store.commit('setShowLocationModal', false)"
              class="btn btn-secondary"
            >
              cancel
            </button>
            <button class="btn btn-primary" @click="handleSubmit">Go!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
