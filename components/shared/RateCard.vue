<template>
    <div class="pt-8 w-full">
              <div class="flex">
                <div class="flex-shrink-0"><img class="lazyload h-11 w-11 rounded-full bg-gray-100" :src="my_rate.user.image"  height="44" width="44" alt="" /></div>
                <div class="space-y-3">
                  <div class="ms-3 pt-1 text-sm font-semibold">
                    <div>{{`${my_rate.user.first_name} ${my_rate.user.last_name}`}}</div>
                    <div class="flex items-center justify-start pt-2">
                        <svg v-for="i in Math.floor(rateComputed) ?? 1" class="flex-shrink-0 text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            aria-hidden="true" height="18" width="18">
                            <path fill-rule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <svg v-for="i in  Math.ceil(5 - rateComputed)" class="flex-shrink-0 text-gray-200"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            aria-hidden="true" height="18" width="18">
                            <path fill-rule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                  </div>
                  <div class="ms-3  max-w-prose text-justify text-[13px] leading-loose text-gray-700">{{  my_rate.comment  }}</div>
                </div>
              </div>
            </div>
</template>

<script lang="ts" setup >
import type {Rate} from '~/types';
const props = defineProps<{my_rate: Rate}>();
const {my_rate} = toRefs(props)
const {professional_rate, communication_rate, delivery_rate, again_rate, expertise_rate, quality_rate} = toRefs(my_rate.value)
const rateComputed = computed(()=> {
  return (professional_rate.value + communication_rate.value + delivery_rate.value + again_rate.value + expertise_rate.value + quality_rate.value) / 6;
})
</script>