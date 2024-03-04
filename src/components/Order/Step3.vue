<template>
  <div>
    <h1 class="text-center text-[32px] font-medium">Step 3</h1>
    <div class="grid grid-cols-2 gap-3">
      <div>
        <div class="mt-3 font-medium">Please Select a Dish</div>
        <select class="input-base" v-model="selectedDish">
          <template v-for="item in dishes" :key="item.id">
            <option :value="item">{{ item.name }}</option>
          </template>
        </select>
        <div class="error" v-show="error">
          <span>{{ error }}</span>
        </div>
      </div>
      <div>
        <div class="mt-3 font-medium">Please Enter the serving quantity</div>
        <input type="number" min="1" :max="MAX_SERVICE" class="input-base" v-model="service"/>
      </div>
    </div>
    <div class="mt-2">
      <button class="bg-gray-103 rounded px-3 py-2" @click="addDishes">Thêm</button>
      <div class="error" v-show="error2">
        <span>{{ error2 }}</span>
      </div>
    </div>
    <div class="grid grid-cols-4 mt-3">
      <div><h2 class="font-bold">Dishes:</h2></div>
      <div class="col-span-3">
       <TableDishes :list-dishes="listDishes" @delete-item="DelItem" :isEdit="isEdit"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import {useStore} from "vuex";
import {GET_STEP} from "@/store/step";
import {GET_DISHES} from "@/store/dishes";
import TableDishes from "@/components/TableDishes.vue";

const DISH_DEFAULT_VALUE = 0;
const selectedDish = ref({
  id: DISH_DEFAULT_VALUE,
  name: '',
  quality: 1
});
const error = ref('');
const error2 = ref('');
const isEdit = ref(true);
const store = useStore();
const MAX_SERVICE = 10;
const service = ref(1);
const listDishes = ref([]);
const dishes = computed(() => {
  return store.getters.dishes;
})
const stepDetail = computed(() => {
  return store.getters.step;
})

const totalDishesServing = ref(0)

onMounted(() => {
  selectedDish.value.id = DISH_DEFAULT_VALUE
  store.dispatch(GET_STEP)
  store.dispatch(GET_DISHES, {
    meal_id: stepDetail.value.meal,
    restaurant_id: stepDetail.value.restaurant,
  })
})

const isNext = computed(() => store.getters.isNext);

watch(stepDetail, (newValue) => {
  if (newValue) {
    store.dispatch(GET_DISHES, {
      meal_id: newValue.meal,
      restaurant_id: newValue.restaurant,
    })
  }
}, {immediate:true, deep:true});

watch(listDishes, (newValue) => {
  const total = newValue.reduce((total, dish) => total + (dish.quality || 0), 0);
  totalDishesServing.value = total
  if (totalDishesServing.value) {
    saveData()
  }
}, {immediate:true, deep:true});

watch(isNext, (newValue) => {
  if (newValue) {
    saveData()
  }
});

watch(service, (newValue) => {
  if (newValue > MAX_SERVICE) {
    service.value = MAX_SERVICE;
  }
});

const saveData = () => {
  if(listDishes.value.length === 0) {
    error2.value = 'Please add dish.'
    store.dispatch(GET_STEP, {  isValidStep3: false});
  }
  else if (totalDishesServing.value < stepDetail.value.people) {
    error2.value = 'The total number of dishes must be greater than the number of people and a maximum of 10 dishes.'
    store.dispatch(GET_STEP, {  isValidStep3: false});
  }
  else {
    error2.value = ''
    const stepData = {
      dishes: JSON.stringify(listDishes.value),
      isValidStep3: true,
    };
    store.dispatch(GET_STEP, stepData);
  }
}
const addDishes = () => {
  if (selectedDish.value.id <= DISH_DEFAULT_VALUE) {
    error.value = 'Please select this field.'
    return;
  }
  error.value = ''
  let objDish = {
    id: selectedDish.value.id,
    name: selectedDish.value.name,
    quality: service.value,
  }
  const existingDishIndex = listDishes.value.findIndex(dish => dish.id === objDish.id);
  if (existingDishIndex !== -1) {
    listDishes.value[existingDishIndex].quality = objDish.quality;
  } else {
    listDishes.value.push(objDish);
  }
  saveData()
  service.value = 1
};

const DelItem = (id) => {
  const indexToRemove = listDishes.value.findIndex((item:any) => item.id === id);

  if (indexToRemove !== -1) {
    listDishes.value.splice(indexToRemove, 1);
    saveData()
  }
};

</script>

<style lang="scss" scoped>

</style>
