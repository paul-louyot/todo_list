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
      position: tasks.value.length + 1,
    })
    idCounter++;
    inputText.value = ''
  });
}
createTasks()

const undoneTasks = computed(()=>{
  return tasks.value.filter(task=>!task.done).sort((a, b)=> a.position - b.position)
})
const doneTasks = computed(()=>{
  return tasks.value.filter(task=>task.done)
})
const onDelete = (id)=>{
  const index = tasks.value.findIndex(task => task.id === id)
  tasks.value.splice(index, 1)
  fixPositions();
}
const lastPosition = computed(()=>{
  const length = undoneTasks.value.length
  return undoneTasks.value[length - 1]?.position
})
const onDelay = (id) => {
  const task = undoneTasks.value.find(task => task.id === id)
  task.position = lastPosition.value + 1;
  fixPositions()
}
const fixPositions = ()=>{
  let position = 1;
  undoneTasks.value.forEach((task)=>{
    task.position = position;
    position++;
  })
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-4 space-y-4">
    <div class="flex flex-col gap-4">

      <textarea class="textarea shadow rounded" :placeholder="placeholder" v-model="inputText"
      @keyup.ctrl.enter.exact="onEnter"
      @keyup.meta.enter.exact="onEnter"></textarea>
      <button class="btn btn-primary btn-sm rounded shadow" @click="createTasks">Create tasks</button>
    </div>
  <!-- <div class="card shadow">
    <div class="card-body p-4 sm:p-8">
      <textarea class="textarea textarea-bordered" :placeholder="placeholder" v-model="inputText"
      @keyup.ctrl.enter.exact="onEnter"
      @keyup.meta.enter.exact="onEnter"></textarea>
      <button class="btn btn-primary btn-sm" @click="createTasks">Create tasks</button>
    </div>
  </div> -->
  <div class="flex flex-col gap-4 relative w-100">
    <TransitionGroup name="list">
        <AppTask
          class="w-100"
          v-for="task in undoneTasks" :key="task.id"
          :text="task.text" v-model="task.done"
          :showDelay="undoneTasks.length > 1"
          @delete="onDelete(task.id)"
          @delay="onDelay(task.id)"
        />
      <AppTask v-for="task in doneTasks" :key="task.id" v-model="task.done" :text="task.text"/>
    </TransitionGroup>
  </div>

  <!-- <div v-if="tasks.length" class="card shadow">
    <div class="card-body p-4 sm:p-8">

    </div>
  </div> -->
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
