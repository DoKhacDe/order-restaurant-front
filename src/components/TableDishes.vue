<template>
  <table class="border-collapse border border-slate-400 w-full">
    <tr>
      <th class="border border-slate-300">Dish</th>
      <th class="border border-slate-300">Quality</th>
    </tr>
    <tr v-for="(item, index) in listDishes" :key="index">
      <td class="border border-slate-300 text-center">{{item.name}}</td>
      <td class="border border-slate-300 text-center">{{item.quality}}</td>
      <td class="border border-slate-300 text-center" v-show="isEdit">
        <span class="text-red-200 cursor-pointer" @click="DelItem(item.id)">Xóa</span>
      </td>
    </tr>
  </table>
</template>
<script lang="ts" setup>
import {defineEmits, defineProps} from "vue/dist/vue";

const props = defineProps({
  listDishes: {
    type: Array,
    default: () => [],
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(["deleteItem"]);

const DelItem = (id) => {
  emits("deleteItem", id);
}
</script>