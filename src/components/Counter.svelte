<!-- @format -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // components
  import Button from '$components/Button.svelte';

  // props
  export let value: number = 1;

  const dispatch = createEventDispatcher();

  const incrementQuantity = () => {
    value = value + 1;

    if (value > 100) value = 100;
    dispatch('change');
  };

  const decrementQuantity = () => {
    value = value - 1;

    if (value < 1) value = 1;
    dispatch('change');
  };
</script>

<div class="flex">
  <div class="flex items-center justify-center">
    <Button
      customClass="rounded-full hover:border-black transition-all disabled:opacity-25"
      handleClick={() => decrementQuantity()}
      ariaLabel="Decrease quantity"
      disabled={value === 1}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-5 w-5"
      >
        <path
          fill-rule="evenodd"
          d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
          clip-rule="evenodd"
        />
      </svg>
    </Button>
  </div>
  <div class="flex items-center justify-center">
    <p class="w-8 select-none text-center">{value}</p>
  </div>
  <div class="flex items-center justify-center">
    <Button
      customClass="rounded-full hover:border-black transition-all disabled:opacity-25"
      handleClick={() => incrementQuantity()}
      ariaLabel="Increase quantity"
      disabled={value === 100}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-5 w-5"
      >
        <path
          d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
        />
      </svg>
    </Button>
  </div>
</div>
