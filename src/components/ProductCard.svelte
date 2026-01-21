<!-- @format -->
<script lang="ts">
  import { page } from '$app/stores';

  import { afterUpdate } from 'svelte';

  // storage
  import { getPublicUrl } from '$api/storage';

  // helpers
  import {
    formatCurrency,
    formatText,
    formatPackage,
    formatName,
  } from '$helpers/helpers';

  // interfaces
  import type I_Product from '$interfaces/I_Product';

  // components
  import Stars from '$components/Stars.svelte';
  import Link from '$components/Link.svelte';
  import ProductCardSkeleton from '$components/ProductCardSkeleton.svelte';

  // props
  export let product: I_Product;

  // state
  let isLoading: boolean = true;
  let src: string = '';

  afterUpdate(() => {
    src = `/products/${formatName(
      product.name,
      product.color,
      product.size,
      product.size_unit
    )}/0-${formatName(
      product.name,
      product.color,
      product.size,
      product.size_unit
    )}-1024x1024.webp`;

    // if (product.category === 'Feathers') {
    //   src = getPublicUrl(
    //     `${formatName(
    //       product.name,
    //       product.color,
    //       product.size,
    //       product.size_unit
    //     )}/0-${formatName(
    //       product.name,
    //       product.color,
    //       product.size,
    //       product.size_unit
    //     )}-1024x1024.webp`
    //   );
    // } else {
    //   src = getPublicUrl(
    // `${formatName(
    //   product.name,
    //   product.color,
    //   product.size,
    //   product.size_unit
    // )}/${formatName(
    //   product.name,
    //   product.color,
    //   product.size,
    //   product.size_unit
    // )}-0.webp`
    //   );
    // }

    isLoading = false;
  });
</script>

{#if isLoading}
  <ProductCardSkeleton />
{:else}
  <Link
    href={`/products/${formatText(product.category)}/${product.id}-${formatText(
      product.name
    )}-${formatText(product.color)}-${product.size || ''}-${
      formatText(product.size_unit) || ''
    }`}
    customClass="group"
  >
    <div class="flex flex-col gap-4">
      <div class="flex justify-center rounded bg-neutral-100 p-2">
        <img
          {src}
          alt={product.name}
          class="object-cover transition-all group-hover:scale-110"
          width=""
          height=""
        />
      </div>

      <div class="flex flex-col gap-4">
        <p class="transition-all group-hover:underline">
          {product.name} - {product.color}
          {product.size ? `- ${product.size} ${product.size_unit}` : ''}
        </p>
        <Stars
          id={product.id}
          ratingAverage={product.rating_average}
          ratingCount={product.rating_count}
        />
        {#if !$page.data.session && 
        (product.category === 'Feather Dusters' || 
        product.category === 'Lambswool Dusters')}
          <p>
            <Link
              href="/account/sign-in"
              customClass="text-sky-500 hover:underline transition-all"
              >Sign in</Link
            > to view prices
          </p>
        {:else}
          <div class="flex flex-col gap-4">
            {#each product.prices as productPrice}
              {#if productPrice.quantity === 1}
                <p>
                  <span class="montserrat-bold text-xl text-rose-500"
                    >{formatCurrency(productPrice.price)}</span
                  >
                  {formatPackage(productPrice.quantity, true)}
                </p>
              {:else}
                <p>
                  <span class="montserrat-bold text-xl text-rose-500"
                    >{formatCurrency(productPrice.price)}</span
                  >
                  {formatPackage(productPrice.quantity, true)} ({formatCurrency(
                    productPrice.price / productPrice.quantity
                  )}/unit)
                </p>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </Link>
{/if}
