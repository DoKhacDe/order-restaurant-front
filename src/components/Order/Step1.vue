<template>
  <div>
    <h1 class="text-center text-[32px] font-medium">Step 1</h1>
    <div class="mt-3 font-medium">Please Select a meal</div>
    <select class="input-base" v-model="selectedMeal" @change="addItem">
      <option :value="MEAL_DEFAULT_VALUE">---</option>
      <option :value="MEAL_BREAKFAST">Breakfast</option>
      <option :value="MEAL_LUNCH">Lunch</option>
      <option :value="MEAL_DINNER">Dinner</option>
    </select>
    <div class="error" v-show="error">
      <span>{{ error }}</span>
    </div>
    <div class="mt-3 font-medium">Please Enter Number of people</div>
    <input type="number" min="1" :max="MAX_PEOPLE" class="input-base" v-model="people" @input="addItem"/>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, computed} from 'vue';
import {useStore} from 'vuex';
import {GET_STEP} from '@/store/step';

const MEAL_DEFAULT_VALUE = 0;
const MEAL_BREAKFAST = 1;
const MEAL_LUNCH = 2;
const MEAL_DINNER = 3;
const MAX_PEOPLE = 10;

const selectedMeal = ref(MEAL_DEFAULT_VALUE);
const people = ref(1);
const error = ref('');
const store = useStore();

const isNext = computed(() => store.getters.isNext);

watch([people, isNext], ([newValue]) => {
  if (newValue > MAX_PEOPLE) {
    people.value = MAX_PEOPLE;
  }
  if (isNext.value) {
    addItem();
  }
});

const addItem = () => {
  if (selectedMeal.value === MEAL_DEFAULT_VALUE) {
    error.value = 'Please select this field.'
    store.dispatch(GET_STEP, {  isValidStep1: false});
    return;
  }
  error.value = ''
  const stepData = {
    meal: selectedMeal.value,
    people: people.value,
    isValidStep1: true,
  };
  store.dispatch(GET_STEP, stepData);
};
</script>

<style lang="scss" scoped>
</style>
