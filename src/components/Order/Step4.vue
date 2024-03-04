<template>
  <div>
    <h1 class="text-center text-[32px] font-medium">Review</h1>
    <Form v-slot="{ handleSubmit }">
    <div class="grid grid-cols-5 mt-2">
      <strong class="col-span-2">Meal</strong>
      <div class="col-span-3">{{meal_name}}</div>
    </div>
    <div class="grid grid-cols-5 mt-2">
      <strong class="col-span-2">No. of people</strong>
      <div class="col-span-3">{{stepDetail.people}}</div>
    </div>
    <div class="grid grid-cols-5 mt-2">
      <strong class="col-span-2">Restaurant</strong>
      <div class="col-span-3">{{detailRestaurant.name}}</div>
    </div>
    <div class="grid grid-cols-5 mt-2">
      <strong class="col-span-2">Dishes</strong>
      <div class="col-span-3">
        <TableDishes :list-dishes="dishes" :isEdit="false"/>
      </div>
    </div>
    <div class="grid grid-cols-5 mt-2">
      <strong class="col-span-2">Customer: <span class="text-red-200">*</span></strong>
      <div class="col-span-3">
        <Field name="customer" rules="required" v-slot="{field}">
          <input class="input-base" v-model="customer" v-bind="field"/>
          <div class="error">
            <ErrorMessage name="customer"/>
          </div>
        </Field>
      </div>
    </div>
      <div class="grid grid-cols-5 mt-2">
        <strong class="col-span-2">Phone: <span class="text-red-200">*</span></strong>
        <div class="col-span-3">
          <Field name="phone" rules="required" v-slot="{field}">
            <input class="input-base" v-model="phone" v-bind="field"/>
            <div class="error">
              <ErrorMessage name="phone"/>
            </div>
          </Field>
        </div>
      </div>
      <div class="grid grid-cols-5 mt-2">
        <strong class="col-span-2">Email: <span class="text-red-200">*</span></strong>
        <div class="col-span-3">
          <Field name="email" rules="required|email" v-slot="{field}">
            <input class="input-base" v-model="email" v-bind="field"/>
            <div class="error">
              <ErrorMessage name="email"/>
            </div>
          </Field>
        </div>
      </div>
    <div class="flex justify-center mt-3">
      <button class="bg-green-500 rounded px-3 py-2" @click.prevent="handleSubmit(saveOrder)">Submit</button>
    </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import {useStore} from "vuex";
import {GET_STEP} from "@/store/step";
import {DETAIL_RESTAURANT} from "@/store/restaurants";
import {SAVE_ORDER} from "@/store/order";
import TableDishes from "@/components/TableDishes.vue";
import {Form, Field, ErrorMessage} from 'vee-validate';
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();
const meal_name = ref('')
const dishes = ref([])
const customer = ref('')
const phone = ref('')
const email = ref('')

//computed
const stepDetail = computed(() => {
  return store.getters.step;
})
const detailRestaurant = computed(() => {
  return store.getters.detailRestaurant;
})

onMounted(() => {
  store.dispatch(GET_STEP)
  if(stepDetail.value) {
    store.dispatch(DETAIL_RESTAURANT, {id: stepDetail.value.restaurant})
  }
})

watch(stepDetail, (newValue) => {
  const mealMap = {
    1: 'Breakfast',
    2: 'Lunch',
    3: 'Dinner'
  };
  if (newValue) {
    meal_name.value = mealMap[newValue.meal] || 'Unknown';
    dishes.value = JSON.parse(newValue.dishes)
  }
});

const saveOrder = () => {
  const data = {
    meal_id: stepDetail.value.meal,
    restaurant_id: stepDetail.value.restaurant,
    people: stepDetail.value.people,
    dishes: stepDetail.value.dishes,
    user_name: customer.value,
    phone: phone.value,
    email: email.value
  }

  store.dispatch(SAVE_ORDER, data).then(response => {
    if (response.status && response.data) {
      router.push('/order-completed?id=' + response.data.id)
      store.dispatch(GET_STEP, {})
    }
  })
}
</script>

<style lang="scss" scoped>

</style>
