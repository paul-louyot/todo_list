<script setup>
// import { breakpointsTailwind } from '@vueuse/core'
// const TEST_INPUT = 'task 1\ntask2\ntask_3\nauirestauie\nnrstauinrestauienrs\nstue'

const tasks = ref([])
const inputText = ref('')
const markingAsDone = ref(false)
let idCounter = 0;
// const breakpoints = useBreakpoints(breakpointsTailwind)
// const largerThanSm = breakpoints.greater('sm') // only larger than sm
// const smAndSmaller = breakpoints.smallerOrEqual('sm') // only smaller than lg
// const isMac = computed(()=>{
//   return navigator?.userAgent.includes('Mac')
// })

const placeholder = computed(()=>{
  let string = 'one task per line'
  return string
  // if (smAndSmaller.value) return string;

  // if (isMac.value) return string + ' ⌘ + enter to create'
  // return string + ' ctrl + enter to create'
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
const createTasks = ()=>{
  const rawTasks = inputText.value.split('\n').filter(e => e)
  inputText.value = ''
  rawTasks.forEach(element => {
    const task = {
      text: element,
      done: false,
      id: idCounter,
    }
    insertAtIndex(lastUndoneIndex.value + 1, task)
    idCounter++;
  });
}
createTasks()

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
  const newIndex = task.done ? 0 : lastUndoneIndex.value;
  if (!task.done) markingAsDone.value = true;

  task.done = !task.done
  tasks.value.splice(index, 1)
  insertAtIndex(newIndex, task)
  if(markingAsDone.value){
    setTimeout(() => {
      markingAsDone.value = false;
    }, 1300);
  }
}
const onDelete = (id) => {
  const index = tasks.value.findIndex(task => task.id === id)
  tasks.value.splice(index, 1)
}
</script>

<template>
    <div class="flex flex-col gap-4 ">

      <textarea class="textareaa shadow rounded" :placeholder="placeholder" v-model="inputText"
      autofocus
      @keyup.ctrl.enter.exact="onEnter"
      @keyup.meta.enter.exact="onEnter"></textarea>
      <button
        class="btn btn-primary btn-sm shadow invisible opacity-0 transition-opacity duration-300 ease-linear"
        :class="{'visible-animate': inputText.length >= 3}"
        @click="createTasks">Create tasks</button>
    </div>
    <div class="flex flex-col gap-4 relative w-100" :class="{'marking-as-done': markingAsDone}">
      <TransitionGroup name="list">
          <AppTask
            v-for="(task, index) in tasks"
            class="w-100"
            :class="{
              'task--done': task.done,
              'task--undone': !task.done,
            }"
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

</template>

<style scoped>
.list-enter-active, .list-move, .list-leave-active {
  transition: all 0.3s ease;
}
.marking-as-done .list-enter-active, .marking-as-done .list-move, .marking-as-done .list-leave-active {
  transition-delay: 1s;
}

.list-enter-from, .list-leave-to {
  opacity: 0;
}
.list-leave-to {
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
  left: 0;
  right: 0;
}

.visible-animate {
  @apply visible opacity-100;
}
</style>
