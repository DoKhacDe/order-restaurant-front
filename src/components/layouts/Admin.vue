<template>
  <div class="dashboard">
    <div class="bg-blue-101">
      <HeaderAdmin/>
    </div>
    <div class="container w-full">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import HeaderAdmin from "@/components/HeaderAdmin.vue";
</script>
<style lang="scss" scoped>
.dashboard {
  @apply w-full;
}
</style>