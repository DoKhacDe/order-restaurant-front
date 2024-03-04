<template>
  <div class="m-10 bg-white">
    <button @click="router.go(-1)">Back</button>
    <h1 class="text-[28px] font-bold">Detail order</h1>
    <div v-if="orderDetail">
      <div class="grid grid-cols-5 mt-2">
        <strong class="col-span-2">Customer</strong>
        <div class="col-span-3">{{orderDetail.user_name ? orderDetail.user_name : ''}}</div>
      </div>
      <div class="grid grid-cols-5 mt-2">
        <strong class="col-span-2">Phone</strong>
        <div class="col-span-3">{{orderDetail.phone ? orderDetail.phone : ''}}</div>
      </div>
      <div class="grid grid-cols-5 mt-2">
        <strong class="col-span-2">Email</strong>
        <div class="col-span-3">{{orderDetail.email ? orderDetail.email : ''}}</div>
      </div>
      <div class="grid grid-cols-5 mt-2">
        <strong class="col-span-2">Meal</strong>
        <div class="col-span-3">{{orderDetail.meal ? orderDetail.meal.name : ''}}</div>
      </div>
      <div class="grid grid-cols-5 mt-2">
        <strong class="col-span-2">No. of people</strong>
        <div class="col-span-3">{{orderDetail.people ? orderDetail.people : ''}}</div>
      </div>
      <div class="grid grid-cols-5 mt-2">
        <strong class="col-span-2">Restaurant</strong>
        <div class="col-span-3">{{orderDetail.restaurant ? orderDetail.restaurant.name : ''}}</div>
      </div>
      <div class="grid grid-cols-5 mt-2">
        <strong class="col-span-2">Dishes</strong>
        <div class="col-span-3">
          <TableDishes :list-dishes="dishes" :isEdit="false"/>
        </div>
      </div>
    </div>
    <a href="/admin/order"></a>
  </div>
</template>

<script setup lang="ts">
import {GET_DETAIL_ORDER} from "@/store/order";
import {onMounted, computed, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import TableDishes from "@/components/TableDishes.vue";

const store = useStore();
const route = useRoute();
const dishes = ref([]);
const router = useRouter();

const orderDetail = computed(() => {
  return store.getters.orderDetail;
})

watch(orderDetail, (newValue) => {
  if (newValue) {
    if(newValue && newValue.order_dish) {
      dishes.value = newValue.order_dish.map(item => ({
        quality: item.quality,
        name: item.dish.name
      }));
    }
  }
});

onMounted(() => {
  const id = route.params.id
  store.dispatch(GET_DETAIL_ORDER, id)
})
</script>

<style lang="scss" scoped>

</style>
