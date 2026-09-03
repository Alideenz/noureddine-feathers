<!-- @format -->
<script lang="ts">
  import { page } from '$app/stores';

  // components
  import CartCard from '$components/CartCard.svelte';
  import Heading from '$components/Heading.svelte';

  // helpers
  import { formatCurrency } from '$helpers/helpers';

  // config
  import getStripe from '$config/stripe';

  // store
  import { cart } from '$stores/CartStore';
  import Button from '$components/Button.svelte';
  import Divider from '$components/Divider.svelte';
  import CartCardSkeleton from '$components/CartCardSkeleton.svelte';
  import Link from '$components/Link.svelte';

  // state
  let isLoadingCheckout: boolean = false;
  let checkoutErrorMessage: string = '';

  $: hasUnavailableCheckoutItems = $cart.cartItems.some(
    (cartItem) => !cartItem.stripe_price_id
  );

  const checkout = async () => {
    try {
      isLoadingCheckout = true;
      checkoutErrorMessage = '';

      const products: any = $cart.cartItems.map((cartItem: any) => {
        return {
          productPriceId: cartItem.product_price_id,
          quantity: cartItem.cart_item_quantity,
        };
      });

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userProfileId: $page.data.session && $page.data.session.user.id,
          products,
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
</script>

<div class="bg-stone-50">
  <div class="nf-page grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
    <div class="flex w-full flex-col gap-8">
      <div class="flex flex-col gap-3">
        <p class="nf-eyebrow">Ready when you are</p>
        <Heading>Your Cart</Heading>
      </div>
      {#if $cart.isLoadingCartItems}
        <CartCardSkeleton />
      {:else if $cart.cartTotalItems === 0}
        <div class="nf-panel flex flex-col gap-5 p-8">
          <p class="montserrat-bold text-xl">Your cart is empty.</p>
          <p class="text-stone-600">
            Browse the catalog and add feathers, dusters, or eggshells when
            something catches your eye.
          </p>
          <Link
            href="/products/feather-dusters"
            customClass="montserrat-bold self-start rounded-full bg-stone-950 px-6 py-3 text-white transition-all hover:bg-teal-800"
            >Start Shopping</Link
          >
        </div>
      {:else}
        <div class="nf-panel flex flex-col gap-6 p-5">
          {#each $cart.cartItems as item, index}
            <CartCard cartItem={item} cartItemIndex={index} />
            {#if index !== $cart.cartItems.length - 1}
              <Divider />
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <aside class="flex w-full flex-col gap-6 self-start lg:sticky lg:top-6">
      <div class="nf-panel flex flex-col gap-6 p-6">
        <Heading customClass="text-2xl">Summary</Heading>
        <div class="flex flex-col gap-4">
          <p class="uppercase text-stone-500">
            {$cart.cartTotalItems}
            {$cart.cartTotalItems === 1 ? 'item' : 'items'}
          </p>
          <div class="flex items-center gap-4">
            <p class="montserrat-bold flex-grow uppercase">Subtotal</p>
            <p class="montserrat-bold text-2xl text-teal-800">
              {formatCurrency($cart.cartTotalPrice)}
            </p>
          </div>
        </div>
        <p class="text-sm leading-6 text-stone-500">
          Shipping and taxes calculated at checkout. Orders over $950 CAD ship
          free.
        </p>
        {#if checkoutErrorMessage}
          <p class="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
            {checkoutErrorMessage}
          </p>
        {/if}
        {#if hasUnavailableCheckoutItems}
          <p class="rounded-lg bg-amber-50 p-3 text-sm text-stone-700">
            Checkout needs live product data. Local browsing and cart testing
            are available.
          </p>
        {/if}

        <Button
          customClass="rounded-full bg-teal-800 px-8 py-4 text-white hover:bg-teal-700 transition-all disabled:bg-stone-100 disabled:text-stone-500 disabled:opacity-100"
          handleClick={async () => await checkout()}
          disabled={$cart.cartTotalItems === 0 || isLoadingCheckout || hasUnavailableCheckoutItems}
        >
          {#if isLoadingCheckout}
            Redirecting to Checkout...
          {:else}
            Checkout
          {/if}
        </Button>
      </div>
    </aside>
  </div>
</div>
