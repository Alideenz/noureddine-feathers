<!-- @format -->
<script lang="ts">
  // props
  export let customClass: string = '';
</script>

<h2 class={`montserrat-bold text-xl leading-snug text-stone-950 ${customClass}`}>
  <slot />
</h2>
