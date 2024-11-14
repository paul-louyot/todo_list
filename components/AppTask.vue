<script setup>
import {XMarkIcon, ArrowDownIcon, CheckIcon, ArrowUturnLeftIcon} from '@heroicons/vue/24/outline';

const props = defineProps({
  text: String,
  id: Number,
  done: Boolean,
  showDelay: Boolean
})
const taskRef = ref()
const isHovered = useElementHover(taskRef)
const textRef = ref()
const emit = defineEmits(['delete', 'delay', 'check'])
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
  <div
    ref="taskRef"
    class="flex items-center gap-4 p-4 shadow rounded-lg bg-base-100"
    :class="{
      'shadow-md': isHovered,
      'task-done': done
    }"
  >
    <div
      class="task-text flex-1 truncate relative min-w-8 h-8 flex items-center"
      :class="{'line-through': done}"
      ref="textRef"
      :title="isTextEllipsized ? text : ''"
    >
      {{text}}
    </div>
    <div class="flex">
      <template v-if="!done && isHovered">
        <button v-if="showDelay" class="btn btn-sm btn-ghost px-2" @click="emit('delay')">
          <ArrowDownIcon class="size-5"/>
        </button>
        <button class="btn btn-sm btn-ghost px-2" @click="emit('delete')">
          <XMarkIcon class="size-5"/>
        </button>
      </template>
      <button class="btn btn-sm btn-ghost px-2" @click="emit('check')">
        <CheckIcon v-if="!done" class="size-5"/>
        <ArrowUturnLeftIcon v-else class="size-5"/>
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-done {
  /* same as textarea placeholder */
  color: #9ca3af;
}
</style>
