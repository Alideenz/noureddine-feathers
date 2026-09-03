<!-- @format -->
<script lang="ts">
  import type I_Product from '$interfaces/I_Product';

  export let heading: string = '';
  export let data: { products: I_Product[] };

  // components
  import Heading from '$components/Heading.svelte';
  import ProductCardGrid from '$components/ProductCardGrid.svelte';
</script>

<div>
  <div class="nf-page flex flex-col gap-8">
    <div class="grid gap-8 border-b border-stone-900 pb-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
      <div class="flex flex-col gap-3">
        <p class="nf-eyebrow">Shop the collection</p>
        <Heading>
          <span>{heading}</span>
        </Heading>
      </div>
      <p class="max-w-2xl leading-7 text-stone-600 lg:justify-self-end">
        Browse Noureddine Feathers products made for soft contact, practical
        cleaning, decorative use, and long-lasting everyday utility.
      </p>
    </div>

    {#if data.products.length === 0}
      <div class="nf-art-panel flex flex-col gap-3 p-8">
        <p class="montserrat-bold text-lg">No products are showing here yet.</p>
        <p class="text-stone-600">
          Product data may still be loading or unavailable in this environment.
        </p>
      </div>
    {:else}
      <div class="nf-section-shell">
        <ProductCardGrid products={data.products} />
      </div>
    {/if}
  </div>
</div>
