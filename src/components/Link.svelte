<!-- @format -->
<script lang="ts">
  // props
  export let customClass: string = '';
  export let href: string;
  export let handleClick: any = undefined;
  export let ariaLabel: string | undefined = undefined;
</script>

<a
  class={`${customClass}`}
  {href}
  aria-label={ariaLabel}
  on:click={() => handleClick && handleClick()}
>
  <slot />
</a>
