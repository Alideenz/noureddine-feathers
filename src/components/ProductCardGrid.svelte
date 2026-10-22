<!-- @format -->
<script lang="ts">
  // interfaces
  import type I_Product from '$interfaces/I_Product';

  // components
  import ProductCard from '$components/ProductCard.svelte';

  // props
  export let products: I_Product[] = [];
</script>

<div class="grid grid-cols-2 gap-x-4 gap-y-9 md:gap-x-6 lg:grid-cols-4">
  {#each products as product}
    <ProductCard {product} />
  {/each}
</div>
