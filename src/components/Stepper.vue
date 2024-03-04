<template>
  <div class="stepper-container">
    <div v-for="(item, index) in props.steps" :key="index" :class="{'w-full': index !== lastIndex}">
      <div :class="{'order-last': index === lastIndex}" class="step w-full">
        <div class="step-number" :class="step === index ? 'active':'bg-[#bbbbbb]'">{{ index + 1 }}</div>
        <div class="step-label" :class="step === index ? 'active-text':'text-[#bbbbbb]'">{{ item }}</div>
        <div class="driver" v-if="index !== lastIndex"></div>
      </div>
    </div>
  </div>
  <div class="step-content">
    <slot :step="step"></slot>
  </div>
  <div class="box-button">
    <button class="btn-base"
            :class="step > 0 ? 'bg-[#e4e4e4]' : 'text-[#e4e4e4]'"
            :disabled="step === 0"
            @click="previous(step)"
    >
      Previous
    </button>
    <button class="btn-base"
            :class="step < lastIndex ? 'bg-[#e4e4e4]' : 'text-[#e4e4e4]'"
            :disabled="step === lastIndex"
            @click="next(step)"
    >
      Next
    </button>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, onMounted, ref, defineEmits, computed} from "vue";
import {useStore} from "vuex";
import {GET_STEP, SET_IS_NEXT} from "@/store/step";

const step = ref(0)
const lastIndex = ref(0)
const emits = defineEmits(["update:currentStep"]);
const store = useStore();
const stepDetail = ref();
const props = defineProps({
  steps: {
    type: Array,
    default: () => [],
  },
  validate: {
    type: Boolean,
    default: () => true,
  }
})

onMounted(() => {
  lastIndex.value = props.steps.length - 1
  let stepData = {
    meal: null,
    people: 1,
    restaurant_id: null,
    dishes: ''
  }
  if (!localStorage.getItem('order_dishes')) {
    localStorage.setItem('order_dishes', JSON.stringify(stepData));
  } else {
    let data = localStorage.getItem('order_dishes')
    stepDetail.value = JSON.parse(data)
  }
  store.dispatch(GET_STEP)
})

const previous = (index) => {
  step.value = index - 1;
  emits("update:currentStep", index);
  store.commit(`${SET_IS_NEXT}`, false);
};

const stepObject = computed(() => {
  return store.getters.step
})

const next = (index) => {
  store.commit(`${SET_IS_NEXT}`, true);
  const currentStep = `isValidStep${index + 1}`;
  if (stepObject.value?.[currentStep]) {
    step.value = index + 1;
    emits("update:currentStep", index);
    store.commit(`${SET_IS_NEXT}`, false);
  }
};
</script>
<style lang="scss" scoped>
.stepper-container {
  @apply flex justify-center;
}

.step {
  @apply flex items-center w-full;
}

.active {
  @apply font-bold bg-[#e6624f];
}

.active-text {
  @apply font-bold text-[#e6624f];
}

.step-number {
  @apply w-8 h-8 rounded-full flex items-center justify-center text-white;
}

.step-label {
  @apply ml-2;
}

.driver {
  @apply mx-auto w-[50%] border-b border-b-[#bbbbbb];
}

.box-button {
  @apply w-full mt-5 flex justify-between;
  .btn-base {
    @apply w-[130px] h-[30px] rounded;
  }
}
</style>

