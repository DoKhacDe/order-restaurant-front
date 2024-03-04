<template>
  <div>
    <h1 class="text-center text-[32px] font-medium">Step 2</h1>
    <div class="mt-3 font-medium">Please Select a Restaurant</div>
    <select class="input-base" v-model="selectedRes" @change="addItem">
      <option :value="MEAL_DEFAULT_VALUE">---</option>
      <template v-for="item in restaurants" :key="item.id">
        <option :value="item.id">{{ item.name }}</option>
      </template>
    </select>
    <div class="error" v-show="error">
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import {useStore} from "vuex";
import {GET_RESTAURANT} from "@/store/restaurants";
import {GET_STEP} from "@/store/step";

const MEAL_DEFAULT_VALUE = -1;
const selectedRes = ref(MEAL_DEFAULT_VALUE);
const error = ref('');
const store = useStore();


const restaurants = computed(() => {
  return store.getters.restaurants;
})

onMounted(() => {
  store.dispatch(GET_RESTAURANT)
})

const isNext = computed(() => store.getters.isNext);

watch(isNext, (newValue) => {
  if (newValue) {
    addItem();
  }
});

const addItem = () => {
  if (selectedRes.value === MEAL_DEFAULT_VALUE) {
    error.value = 'Please select this field.'
    store.dispatch(GET_STEP, {  isValidStep2: false});
    return;
  }
  error.value = ''
  const stepData = {
    restaurant: selectedRes.value,
    isValidStep2: true,
  };
  store.dispatch(GET_STEP, stepData);
};
</script>

<style lang="scss" scoped>

</style>
