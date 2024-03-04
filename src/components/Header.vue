<template>
  <div class="header">
    <div class="title">
      I'M HUNGRY, YOU TOO!
    </div>
    <div class="search">
      <input type="text" placeholder="Search for restaurants"/>
    </div>
    <div class="flex justify-end items-center">
      <img src="@/assets/images/icon/phone.svg" alt="phone"/>
      <span class="font-bold text-white ml-3">Hotline: 0398.913.042</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header {
  @apply w-full min-h-[80px] container grid grid-cols-4 items-center px-5;
  .title {
    @apply font-bold text-[28px] text-[#fff];
  }
  .search {
    @apply col-span-2 w-full bg-white rounded-2xl px-3;
    input {
      @apply w-full h-[40px] focus:outline-none pl-5;
      background: url("@/assets/images/icon/search.svg") no-repeat left center;
      background-size: 14px;
    }
  }
}
</style>