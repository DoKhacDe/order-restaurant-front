<template>
  <div class="m-10">
    <h1 class="text-[28px] font-bold">List order</h1>
    <div class="mt-3">
      <table class="border-collapse border border-slate-400 w-full">
        <tr class="bg-gray-103">
          <th class="border border-slate-300">ID</th>
          <th class="border border-slate-300">CUSTOMER</th>
          <th class="border border-slate-300">PHONE</th>
          <th class="border border-slate-300">EMAIL</th>
          <th class="border border-slate-300">MEAL</th>
          <th class="border border-slate-300">RESTAURANT</th>
          <th class="border border-slate-300">PEOPLE</th>
          <th class="border border-slate-300">ACTION</th>
        </tr>
        <tr v-for="(item, index) in orders" :key="index">
          <td class="border border-slate-300 text-center">{{item.id}}</td>
          <td class="border border-slate-300 text-center">{{item.user_name}}</td>
          <td class="border border-slate-300 text-center">{{item.phone}}</td>
          <td class="border border-slate-300 text-center">{{item.email}}</td>
          <td class="border border-slate-300 text-center">{{item.meal.name}}</td>
          <td class="border border-slate-300 text-center">{{item.restaurant.name}}</td>
          <td class="border border-slate-300 text-center">{{item.people}}</td>
          <td class="border border-slate-300 flex justify-center">
            <span class="text-red-200 cursor-pointer" @click="view(item.id)">
              <img src="../../assets/images/icon/view.png" alt="view"/>
            </span>
          </td>
        </tr>
      </table>
      <div class="text-blue text-right hover:text-blue-101">
        <a href="/">Go to Homepage</a>
      </div>

    </div>
  </div>
</template>
<script lang="ts" setup>
import {GET_LIST_ORDER} from "@/store/order";
import {onMounted, computed, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();
const orders = computed(() => {
  return store.getters.orders;
})

onMounted(() => {
  store.dispatch(GET_LIST_ORDER);
})

const view = (id) => {
  router.push('/admin/detail-order/' + id)
}
</script>