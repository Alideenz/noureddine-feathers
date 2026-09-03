<!-- @format -->
<script lang="ts">
  // props
  export let customClass: string = '';
</script>

<h1 class={`nf-display text-4xl leading-[0.98] text-stone-950 sm:text-5xl ${customClass}`}>
  <slot />
</h1>
