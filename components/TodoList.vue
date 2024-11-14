<script setup>
import { breakpointsTailwind } from '@vueuse/core'

// const TEST_INPUT = 'task 1\ntask2\ntask_3\nauirestauie\nnrstauinrestauienrs\nstue'

const tasks = ref([])
const inputText = ref('')
let idCounter = 0;
const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm
const smAndSmaller = breakpoints.smallerOrEqual('sm') // only smaller than lg

const isMac = computed(()=>{
  return navigator?.userAgent.includes('Mac')
})

const placeholder = computed(()=>{
  let string = 'one task per line'
  return string
  // if (smAndSmaller.value) return string;

  // if (isMac.value) return string + ' ⌘ + enter to create'
  // return string + ' ctrl + enter to create'
})

const createTasks = ()=>{
  const rawTasks = inputText.value.split('\n').filter(e=>e)
  rawTasks.forEach(element => {
    tasks.value.push({
      text: element,
      done: false,
      id: idCounter,
    })
    idCounter++;
    inputText.value = ''
  });
}
createTasks()

const undoneTasks = computed(()=>{
  return tasks.value.filter(task=>!task.done)
})
const doneTasks = computed(()=>{
  return tasks.value.filter(task=>task.done)
})
const lastUndoneIndex = computed(()=>{
  for (let i = tasks.value.length - 1; i >= 0; i--) {
    if (!tasks.value[i].done) return i;
  }
  return -1;
})
const insertAtIndex = (index, task) => {
  tasks.value.splice(index, 0, task)
}
const onDelay = (id) => {
  const index = tasks.value.findIndex(task => task.id === id)
  // remove task
  const task = tasks.value.splice(index, 1)[0]
  // insert it at right place
  insertAtIndex(lastUndoneIndex.value + 1, task)
}
const onCheck = (id) => {
  const task = tasks.value.find(task => task.id === id)
  const index = tasks.value.findIndex(task => task.id === id)
  const newIndex = task.done ? 0 : lastUndoneIndex.value + 1;
  task.done = !task.done
  tasks.value.splice(index, 1)
  insertAtIndex(newIndex, task)
}
const onDelete = (id) => {
  const index = tasks.value.findIndex(task => task.id === id)
  tasks.value.splice(index, 1)
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-4 space-y-4">
    <div class="flex flex-col gap-4">

      <textarea class="textarea shadow rounded" :placeholder="placeholder" v-model="inputText"
      autofocus
      @keyup.ctrl.enter.exact="onEnter"
      @keyup.meta.enter.exact="onEnter"></textarea>
      <button
        class="btn btn-primary btn-sm shadow"
        :class="{'invisible': inputText.length < 3}"
        @click="createTasks">Create tasks</button>
  </div>
  <div class="flex flex-col gap-4 relative w-100">
    <TransitionGroup name="list">
        <AppTask
          v-for="(task, index) in tasks"
          class="w-100"
          :key="task.id"
          v-bind="task"
          :showDelay="index !== lastUndoneIndex"
          @delete="onDelete(task.id)"
          @delay="onDelay(task.id)"
          @check="onCheck(task.id)"
        />
      <!-- <AppTask v-for="task in doneTasks" :key="task.id" v-model="task.done" :text="task.text"/> -->
    </TransitionGroup>
  </div>
</div>

</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.list-leave-active {
  position: absolute;
  left: 0;
  right: 0;
}</style>
