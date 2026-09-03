<!-- @format -->
<script lang="ts">
  // interfaces
  import type I_CartItem from '$interfaces/I_CartItem';

  // helpers
  import {
    formatCurrency,
    formatPackage,
    formatProductTitle,
    getProductImagePath,
    getProductPath,
  } from '$helpers/helpers';

  // stores
  import { cart } from '$stores/CartStore';

  // components
  import Link from '$components/Link.svelte';
  import Counter from '$components/Counter.svelte';
  import Button from '$components/Button.svelte';

  // props
  export let cartItem: I_CartItem;
  export let cartItemIndex: number = 1;

  // state
  let quantity: number = cartItem.cart_item_quantity;

  $: src = getProductImagePath(cartItem);
  $: productPath = getProductPath(cartItem);
  $: productTitle = formatProductTitle(cartItem);
</script>

<div class="flex flex-col gap-5 sm:flex-row">
  <div class="self-start overflow-hidden rounded-lg bg-stone-100">
    <Link href={productPath} ariaLabel={productTitle}>
      <img
        {src}
        alt={cartItem.name}
        class="aspect-square w-full object-contain p-4 transition-all hover:scale-105 sm:w-[180px]"
        loading="lazy"
      />
    </Link>
  </div>
  <div class="flex w-full flex-col gap-6">
    <div class="flex gap-5">
      <Link
        href={productPath}
        customClass="montserrat-bold flex-grow leading-snug text-stone-950 hover:text-teal-800 transition-all"
      >
        {productTitle}
      </Link>
      <Button
        customClass="self-start rounded-full bg-stone-100 p-2 hover:bg-stone-950 hover:text-white transition-all"
        handleClick={() => cart.removeCartItem(cartItemIndex)}
        ariaLabel="Remove item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5"
        >
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
          />
        </svg>
      </Button>
    </div>
    <div class="grid gap-5 rounded-lg bg-stone-50 p-4 lg:grid-cols-3">
      <div class="flex gap-8 lg:flex-col lg:gap-2">
        <p class="flex flex-grow text-sm uppercase text-stone-500">Package</p>
        <p>{formatPackage(cartItem.quantity)}</p>
      </div>
      <div class="flex gap-8 lg:flex-col lg:gap-2">
        <p class="flex flex-grow text-sm uppercase text-stone-500">Price</p>
        <p class="montserrat-bold text-teal-800">
          {formatCurrency(cartItem.price * cartItem.cart_item_quantity)}
        </p>
      </div>
      <div class="flex gap-8 lg:flex-col lg:gap-2">
        <p class="flex flex-grow items-center text-sm uppercase text-stone-500">Quantity</p>
        <Counter
          bind:value={quantity}
          on:change={() => cart.updateCartItem(cartItemIndex, quantity)}
        />
      </div>
    </div>
  </div>
</div>
