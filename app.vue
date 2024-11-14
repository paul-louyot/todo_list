<template>
  <div class="h-screen w-screen relative">
    <div
      class="absolute inset-0 z-0"
      style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgb(248 250 252) 10px, rgb(248 250 252) 12px)"
    ></div>

    <div class="page-content z-10 relative h-full overflow-scroll">
      <div class="max-w-2xl mx-auto p-8 space-y-4">
        <TodoList/>
      </div>
    </div>

    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
  </div>
</template>
