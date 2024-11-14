export const useCanHover = () => {
  const canHover = ref(false)

  onMounted(() => {
    canHover.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  })

  return canHover
}
