<!-- @format -->
<script lang="ts">
  // helpers
  import {
    formatProductTitle,
    getProductImagePath,
    getProductPath,
    getProductPriceSummary,
  } from '$helpers/helpers';

  // interfaces
  import type I_Product from '$interfaces/I_Product';

  // components
  import Link from '$components/Link.svelte';

  // props
  export let product: I_Product;

  // state
  $: src = getProductImagePath(product);
  $: productPath = getProductPath(product);
  $: productTitle = formatProductTitle(product);
  $: priceSummary = getProductPriceSummary(product);
</script>

<article
  class="group flex h-full flex-col overflow-hidden rounded-[6px] border border-stone-200/80 bg-[#fffdf8] shadow-[0_22px_80px_rgba(28,25,23,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b8975b] hover:bg-white hover:shadow-[0_28px_90px_rgba(28,25,23,0.11)]"
>
  <Link href={productPath} customClass="block" ariaLabel={productTitle}>
    <div
      class="relative aspect-[5/4] overflow-hidden bg-[#f4f2ea]"
    >
      <div class="absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] rounded-full bg-white/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-stone-700 shadow-sm">
        {product.category}
      </div>
        <img
          {src}
          alt={product.name}
          class="h-full w-full object-contain p-5 transition-all duration-500 group-hover:scale-105 sm:p-6"
          loading="lazy"
        />
    </div>
  </Link>

  <div class="flex flex-1 flex-col justify-between gap-5 p-5">
    <div class="flex min-h-[96px] flex-col gap-4">
      <Link
        href={productPath}
        customClass="text-base font-semibold leading-7 text-stone-950 transition-all group-hover:text-teal-900"
        ariaLabel={productTitle}
      >
        {productTitle}
      </Link>
    </div>

    {#if priceSummary.headline}
      <div class="border-t border-stone-200 pt-4">
        <p class="text-lg font-semibold leading-tight text-teal-900">
          {priceSummary.headline}
        </p>
        <div class="mt-3 grid gap-1.5 text-sm leading-6 text-stone-500">
          {#if priceSummary.unitPrice}
            <p>{priceSummary.unitPrice}</p>
          {/if}
          {#if priceSummary.largestPack}
            <p class="font-medium text-stone-700">
              {priceSummary.largestPack}
            </p>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</article>
