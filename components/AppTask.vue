<script setup>
import {XMarkIcon, ArrowDownIcon} from '@heroicons/vue/24/outline';

const props = defineProps({
  text: String,
  id: Number,
  showDelay: Boolean
})
const textRef = ref()
const model = defineModel()
const emit = defineEmits(['delete', 'delay'])
const isTextEllipsized = ref(false)
const checkEllipsis = useDebounceFn(() => {
  if (textRef.value) {
    isTextEllipsized.value = textRef.value.scrollWidth > textRef.value.clientWidth;
  }
}, 100);

onMounted(checkEllipsis)
useEventListener(window, 'resize', checkEllipsis)

</script>

<template>
  <div  class="flex items-center gap-4 p-3 border rounded-lg bg-base-100">
    <div
      class="task-text flex-1 truncate relative min-w-8"
      :class="{'line-through': model}"
      ref="textRef"
      :title="isTextEllipsized ? text : ''"
    >
      {{text}}
    </div>
    <template v-if="!model">
      <div class="flex">
        <button v-if="showDelay" class="btn btn-sm btn-ghost" @click="emit('delay')">
          <ArrowDownIcon class="size-5"/>
        </button>
        <button class="btn btn-sm btn-ghost" @click="emit('delete')">
          <XMarkIcon class="size-5"/>
        </button>
      </div>
    </template>
    <input type="checkbox" class="checkbox" v-model="model"/>
  </div>
</template>
