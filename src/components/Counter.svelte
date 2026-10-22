<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Minus, Plus } from 'lucide-svelte';
  export let value = 1;
  const dispatch = createEventDispatcher();
  const change = (amount: number) => {
    value = Math.min(100, Math.max(1, value + amount));
    dispatch('change');
  };
</script>

<div class="counter">
  <button
    class="nf-icon-button"
    aria-label="Decrease quantity"
    disabled={value <= 1}
    on:click={() => change(-1)}><Minus size={15} aria-hidden="true" /></button
  ><span aria-live="polite">{value}</span><button
    class="nf-icon-button"
    aria-label="Increase quantity"
    disabled={value >= 100}
    on:click={() => change(1)}><Plus size={15} aria-hidden="true" /></button
  >
</div>

<style>
  .counter {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .counter > span {
    display: inline-block;
    width: 38px;
    text-align: center;
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }
</style>
