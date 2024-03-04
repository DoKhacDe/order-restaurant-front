<template>
  <div class="m-10 bg-white p-10">
    <Stepper :steps="steps" :currentStep="currentStep" :validate="false">
      <template v-slot="{ step }">
        <keep-alive>
          <component :is="getStepComponent(step)" class="content"/>
        </keep-alive>
      </template>
    </Stepper>
  </div>
</template>

<script setup lang="ts">
import Stepper from "@/components/Stepper.vue";
import {ref} from "vue";
import Step1 from "@/components/Order/Step1.vue";
import Step2 from "@/components/Order/Step2.vue";
import Step3 from "@/components/Order/Step3.vue";
import Step4 from "@/components/Order/Step4.vue";

const steps = ['Step 1', 'Step 2', 'Step 3', 'Review'];
const currentStep = ref(0);

const getStepComponent = (step) => {
  switch (step) {
    case 0:
      return Step1;
    case 1:
      return Step2;
    case 2:
      return Step3;
    case 3:
      return Step4;
    default:
      return null;
  }
};
</script>

<style lang="scss" scoped>
.content {
  @apply max-w-[600px] min-h-[300px] py-3 px-3 mt-6 mx-auto shadow-xl shadow-gray-101 rounded-xl;
}
</style>
