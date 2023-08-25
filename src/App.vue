<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import navBar from '../src/components/navBar.vue'
</script>

<template>
  <div class="container-fluid">
    <div class="row align-items-center d-flex flex-row flex-nowrap">
      <div class="col-1 col-md-2 "> 
        <header>
          <navBar />
        </header>
      </div>
      <div class=" col-11 col-md-10 justify-content-center"> 
        <RouterView />
      </div>
    </div>
  </div>
</template>
