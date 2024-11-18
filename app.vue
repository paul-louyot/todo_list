<template>
  <div class="h-screen w-screen relative">
    <div class="absolute inset-0 z-0 text-base-200">
      <TheBackground />
    </div>

    <div class="page-content z-10 relative h-full overflow-scroll">
      <div class="max-w-2xl mx-auto p-8 space-y-4">
        <ClientOnly>
          <TheApp/>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
