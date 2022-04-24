<template>
  <div class="grid grid-cols-5">
    <div class="col-span-4"></div>
    <div class="text-right pr-5">
      <InformationCircleIcon @click="$emit('set-panel','about')" class="h-5 w-5 float-right app-bt mr-2" />
      <ClockIcon @click="$emit('set-panel','tracks')" class="h-5 w-5 float-right app-bt mr-2" />
      <InboxInIcon @click="$emit('set-panel','streetsAhead')" class="h-5 w-5 float-right app-bt mr-2" />
      <MapIcon @click="$emit('set-panel','map')" class="h-5 w-5 float-right app-bt mr-2" />
      <HomeIcon @click="$emit('set-panel','home')" class="h-5 w-5 float-right app-bt mr-2" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { HomeIcon } from "@heroicons/vue/outline"
import { MapIcon } from '@heroicons/vue/outline'
import { InboxInIcon } from "@heroicons/vue/outline"
import { ClockIcon } from "@heroicons/vue/outline"
import { InformationCircleIcon } from "@heroicons/vue/outline"

const PROPS = defineProps({ panel: String })
  // const emit = defineEmits(['set-panel'])

/*
                          ______
                         / ____ `.
 _   __  __   _   .---.  `'  __) |
[ \ [  ][  | | | / /__\\ _  |__ '.
 \ \/ /  | \_/ |,| \__.,| \____) |
  \__/   '.__.'_/ '.__.' \______.'
*/
onMounted(() => {
  nav(PROPS.panel)
})

watch(() => [PROPS.panel], (newp, oldp) => {
  nav(PROPS.panel)
})

const nav = (el) => {
  let element = document.querySelector(`#${el}`);
  element.scrollIntoView({ block: 'end', behavior: 'smooth' })
}
</script>
