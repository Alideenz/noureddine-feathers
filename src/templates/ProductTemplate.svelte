<!-- @format -->
<script lang="ts">
  import { page } from '$app/stores';

  // stores
  import { cart } from '$stores/CartStore';

  // helpers
  import {
    formatCurrency,
    formatPackage,
    getProductDisplaySize,
    formatProductTitle,
    getProductImagePath,
    hasCheckoutPrice,
  } from '$helpers/helpers';

  // config
  import getStripe from '$config/stripe';

  // interfaces
  import type I_Product from '$interfaces/I_Product';
  import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';

  // components
  import Stars from '$components/Stars.svelte';
  import Counter from '$components/Counter.svelte';
  import Button from '$components/Button.svelte';
  import Divider from '$components/Divider.svelte';

  export let data: {
    product: I_Product;
    productImagePublicUrls?: string[];
  };

  // state
  let productPrice: I_ProductPriceTableRecord | undefined =
    data.product?.prices[0];
  let quantity: number = 1;
  let isLoadingCheckout: boolean = false;
  let checkoutErrorMessage: string = '';
  let showAddToCartMessage: boolean = false;
  let showFullImage = false;
  let fullImageSrc = '';

  $: productTitle = formatProductTitle(data.product);
  $: productDisplaySize = getProductDisplaySize(data.product);
  $: canCheckout = hasCheckoutPrice(productPrice);
  $: localImages =
    data.product.category === 'Feather Dusters'
      ? [getProductImagePath(data.product, 0), getProductImagePath(data.product, 1)]
      : [getProductImagePath(data.product, 0)];
  $: productImages =
    data.productImagePublicUrls && data.productImagePublicUrls.length > 0
      ? data.productImagePublicUrls
      : localImages;

  const checkout = async () => {
    if (!productPrice) return;

    try {
      isLoadingCheckout = true;
      checkoutErrorMessage = '';

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userProfileId: $page.data.session && $page.data.session.user.id,
          products: [
            {
              productPriceId: productPrice.id,
              quantity,
            },
          ],
        }),
      });

      const checkoutSession = await response.json();

      if (!response.ok || !checkoutSession.id) {
        checkoutErrorMessage =
          checkoutSession.error || 'Checkout could not be started.';
        return;
      }

      const stripe = await getStripe();

      const { error } = await stripe!.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      if (error && error.message) checkoutErrorMessage = error.message;
    } catch (error) {
      checkoutErrorMessage = 'Checkout could not be started. Try again later.';
    } finally {
      isLoadingCheckout = false;
    }
  };

  const openFullImage = (imageSrc: string) => {
    fullImageSrc = imageSrc;
    showFullImage = true;
  };

  $: {
    if (showAddToCartMessage)
      setTimeout(() => (showAddToCartMessage = false), 1400);
  }
</script>

{#if showFullImage}
  <div class="fixed inset-0 z-50 flex h-full w-full bg-stone-950/90 p-4">
    <div class="flex h-full w-full justify-center rounded-lg bg-white p-4">
      <img
        src={fullImageSrc}
        alt={productTitle}
        class="object-contain"
      />
    </div>
    <Button
      customClass="absolute right-8 top-8 self-start rounded-full bg-white p-3 hover:bg-stone-950 hover:text-white transition-all"
      handleClick={() => (showFullImage = false)}
      ariaLabel="Close product image"
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
{:else}
  <div class="bg-stone-50">
    <div class="nf-page grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]">
      <div class="order-2 flex flex-col gap-5 lg:order-1">
        {#each productImages as imageSrc}
          <button
            class="group overflow-hidden rounded-lg border border-stone-200/80 bg-white p-4 shadow-[0_18px_55px_rgba(28,25,23,0.05)]"
            on:mouseup={() => openFullImage(imageSrc)}
            aria-label={`Open full image of ${productTitle}`}
          >
            <img
              src={imageSrc}
              alt={productTitle}
              class="aspect-square w-full object-contain transition-all duration-500 group-hover:scale-105"
            />
          </button>
        {/each}
      </div>

      <aside class="order-1 flex flex-col gap-7 lg:sticky lg:top-6 lg:order-2 lg:self-start">
        <div class="nf-panel-modern flex flex-col gap-6 p-6">
          <div class="flex flex-col gap-3">
            <p class="nf-eyebrow">{data.product.category}</p>
            <h1 class="nf-display text-4xl leading-[0.98] text-stone-950 sm:text-5xl">
              {productTitle}
            </h1>
            {#if data.product.rating_count > 0}
              <Stars
                id={data.product.id}
                ratingAverage={data.product.rating_average}
                ratingCount={data.product.rating_count}
              />
            {/if}
          </div>

          {#if productPrice}
            <div class="flex flex-col gap-2">
              <p>
                <span class="montserrat-bold text-3xl text-teal-800">
                  {formatCurrency(productPrice.price)}
                </span>
                <span class="text-stone-500">
                  {formatPackage(productPrice.quantity, true)}
                </span>
              </p>
              {#if productPrice.quantity > 1}
                <p class="text-sm text-stone-500">
                  {formatCurrency(productPrice.price / productPrice.quantity)}
                  per unit
                </p>
              {/if}
            </div>
          {/if}

          <Divider />

          <div class="grid gap-5">
            <div class="flex flex-col gap-3">
              <p class="montserrat-bold">Description</p>
              <p class="leading-7 text-stone-600">{data.product.description}</p>
            </div>
            <div class="grid gap-4 rounded-lg bg-stone-50 p-4 sm:grid-cols-2">
              <div>
                <p class="text-sm uppercase text-stone-500">Color</p>
                <p class="montserrat-bold">{data.product.color}</p>
              </div>
              {#if productDisplaySize}
                <div>
                  <p class="text-sm uppercase text-stone-500">Size</p>
                  <p class="montserrat-bold">{productDisplaySize}</p>
                </div>
              {/if}
            </div>
          </div>

          {#if productPrice}
            <div class="flex flex-col gap-4">
              <p class="montserrat-bold">Package</p>
              <div class="flex flex-wrap gap-3">
                {#each data.product.prices as price}
                  <Button
                    customClass="rounded-full bg-stone-100 px-5 py-3 hover:border-teal-800 hover:bg-white transition-all"
                    handleClick={() => (productPrice = price)}
                    selected={productPrice === price}
                  >
                    {formatPackage(price.quantity)}
                  </Button>
                {/each}
              </div>
            </div>

            <div class="flex flex-col items-start gap-3">
              <p class="montserrat-bold">Quantity</p>
              <Counter bind:value={quantity} />
            </div>

            <Divider />

            <div class="flex flex-col gap-4">
              <p class="text-sm text-stone-500">
                Shipping and taxes calculated at checkout. Free delivery on
                orders over $950 CAD.
              </p>
              {#if checkoutErrorMessage}
                <p class="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
                  {checkoutErrorMessage}
                </p>
              {/if}
              {#if !canCheckout}
                <p class="rounded-lg bg-amber-50 p-3 text-sm text-stone-700">
                  Checkout needs live product data. You can still test browsing
                  and cart behavior locally.
                </p>
              {/if}
              <Button
                customClass="rounded-full bg-[#d8b25a] px-8 py-4 text-stone-950 hover:bg-[#c9a046] transition-all disabled:opacity-100 disabled:bg-stone-100 disabled:text-stone-500"
                disabled={showAddToCartMessage || !productPrice}
                handleClick={() => {
                  if (productPrice) cart.addCartItem(data.product, productPrice, quantity);
                  showAddToCartMessage = true;
                }}
              >
                {#if showAddToCartMessage}
                  Added to Cart ({$cart.cartTotalItems})
                {:else}
                  Add to Cart
                {/if}
              </Button>
              <Button
                customClass="rounded-full bg-teal-900 px-8 py-4 text-white hover:bg-teal-800 transition-all disabled:bg-stone-100 disabled:text-stone-500 disabled:opacity-100"
                disabled={isLoadingCheckout || !canCheckout}
                handleClick={async () => await checkout()}
              >
                {#if isLoadingCheckout}
                  Redirecting to Checkout...
                {:else}
                  Buy Now
                {/if}
              </Button>
            </div>
          {/if}
        </div>
      </aside>
    </div>
  </div>
{/if}
