<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="text-bg-light min-vh-100">
    <NavBar />
    <div class="min-vh-75 position-relative">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
