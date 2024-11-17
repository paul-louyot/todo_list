<script setup>
import {XMarkIcon, ArrowDownIcon, CheckIcon, ArrowUturnLeftIcon} from '@heroicons/vue/24/outline';

const props = defineProps({
  text: String,
  id: Number,
  done: Boolean,
  showDelay: Boolean,
})
const canHover = useCanHover()
const taskRef = ref()
const isHovered = useElementHover(taskRef)
const textRef = ref()
const willBeChecked = ref(false)
const emit = defineEmits(['delete', 'delay', 'check', 'revert', 'done'])
const isTextEllipsized = ref(false)
const checkEllipsis = useDebounceFn(() => {
  if (textRef.value) {
    isTextEllipsized.value = textRef.value.scrollWidth > textRef.value.clientWidth;
  }
}, 100);

onMounted(checkEllipsis)
useEventListener(window, 'resize', checkEllipsis)

const onCheck = () => {
  props.done ? emit('revert') : emit('done')
  if(props.done){
    emit('check')
  } else {
    willBeChecked.value = true;
    setTimeout(() => {
      emit('check');
      willBeChecked.value = false;
    }, 1000);
  }
}

</script>

<template>
  <div
    ref="taskRef"
    class="task"
    :class="{
      'task-will-be-checked': willBeChecked,
      'task-done': done,
      'task-undone': !done,
      'task-is-hovered': isHovered
    }"
  >
    <div
      class="task-text flex-1 truncate relative min-w-8 h-8 flex items-center"
      :class="{'line-through': done}"
      ref="textRef"
      :title="isTextEllipsized ? text : ''"
    >
      {{ text }}
    </div>

    <div class="flex" >
      <template v-if="!done && (isHovered || !canHover)">
        <button v-if="showDelay" class="btn btn-sm btn-ghost px-2 btn-delay" @click="emit('delay')">
          <ArrowDownIcon class="size-5"/>
        </button>
        <button class="btn btn-sm btn-ghost px-2 btn-delete" @click="emit('delete')">
          <XMarkIcon class="size-5"/>
        </button>
      </template>
      <button class="btn btn-sm btn-ghost px-2 btn-check" @click="onCheck">
        <CheckIcon class="size-5 icon-check"/>
        <ArrowUturnLeftIcon class="size-5 icon-uturn"/>
      </button>
    </div>

  </div>

</template>

<style scoped>
.task {
  @apply flex items-center gap-4 p-4 shadow rounded-lg bg-base-100;
}
.task.task-is-hovered {
  @apply shadow-md;
}
.task-will-be-checked {
  @apply line-through;
}

@keyframes pingg {
  75%, 100% {
    transform: scale(1.2);
    opacity: 0;
  }
}
.animate-scale {
  animation: pingg 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
.task-will-be-checked .btn-check {
  @apply animate-scale;
}
.task-will-be-checked .btn-delete, .task-will-be-checked .btn-delay {
  @apply opacity-0;
  transition: opacity 0.3s;
}
.task-done {
  /* same as textarea placeholder */
  color: #9ca3af;
}
.task-done .icon-check {
  @apply hidden;
}
.task-undone .icon-uturn {
  @apply hidden;
}
</style>
