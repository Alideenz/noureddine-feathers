<!-- @format -->
<script lang="ts">
  export let customClass: string | undefined = '';
  export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
  export let disabled: boolean | undefined = false;
  export let selected: boolean | undefined = false;
  export let handleClick: any = undefined;
  export let ariaLabel: string | undefined = undefined;
</script>

<button
  {type}
  {disabled}
  aria-label={ariaLabel}
  aria-pressed={selected ? 'true' : undefined}
  on:click={() => handleClick && handleClick()}
  class={`montserrat-bold flex items-center justify-center rounded border-2 p-2 disabled:pointer-events-none ${
    selected ? 'pointer-events-none border-teal-800' : 'border-transparent'
  } ${customClass}`}
>
  <slot />
</button>
