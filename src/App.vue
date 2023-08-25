<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import navBar from '../src/components/navBar.vue'
</script>

<template>
  <div class="container-fluid">
    <div class="row align-items-center d-flex flex-row flex-nowrap">
      <div class="col-2"> 
        <header>
          <navBar />
        </header>
      </div>
      <div class="col-10 justify-content-center"> 
        <RouterView />
      </div>
    </div>
  </div>
</template>
