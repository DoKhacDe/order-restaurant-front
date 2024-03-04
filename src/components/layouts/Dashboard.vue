<template>
  <div class="dashboard">
    <div class="bg-[#e6624f]">
      <Header/>
    </div>
      <div class="container w-full">
        <router-view></router-view>
      </div>
  </div>
</template>
<script lang="ts" setup>


import Header from "@/components/Header.vue";
</script>
<style lang="scss" scoped>
.dashboard {
  @apply w-full;
}
</style>