<script setup>
import {XMarkIcon, ArrowDownIcon} from '@heroicons/vue/24/outline';
</script>

<template>
  <div class="max-w-2xl mx-auto p-4 space-y-4">
  <div class="card shadow">
    <div class="card-body">
      <textarea class="textarea textarea-bordered" placeholder="Bio"></textarea>
      <button class="btn btn-primary">Create tasks</button>
    </div>
  </div>
  <div class="card shadow">
    <div class="card-body">
      <div class="flex items-center gap-4 p-4 border rounded-lg bg-base-100">
        <div class="flex-1">Task content</div>
        <ArrowDownIcon class="size-5"/>
        <XMarkIcon class="size-6"/>
        <input type="checkbox" class="checkbox" />

      </div>
    </div>
  </div>
</div>

</template>
