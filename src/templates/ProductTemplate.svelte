<script lang="ts">
  import { page } from '$app/stores';
  import { tick, onDestroy } from 'svelte';
  import {
    ArrowLeft,
    ArrowUpRight,
    Check,
    ShoppingBag,
    X,
    ZoomIn,
  } from 'lucide-svelte';
  import { cart } from '$stores/CartStore';
  import {
    formatCurrency,
    formatPackage,
    getProductDisplaySize,
    formatProductTitle,
    getProductImagePath,
    hasCheckoutPrice,
  } from '$helpers/helpers';
  import getStripe from '$config/stripe';
  import type I_Product from '$interfaces/I_Product';
  import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';
  import Counter from '$components/Counter.svelte';
  import Stars from '$components/Stars.svelte';
  export let data: { product: I_Product; productImagePublicUrls?: string[] };
  let activeProductId = data.product.id;
  let productPrice: I_ProductPriceTableRecord | undefined =
    data.product.prices[0];
  let quantity = 1;
  let activeImage = 0;
  let isLoadingCheckout = false;
  let checkoutErrorMessage = '';
  let showAddToCartMessage = false;
  let addedTimeout: ReturnType<typeof setTimeout>;
  let imageDialog: HTMLDialogElement;
  $: if (data.product.id !== activeProductId) {
    activeProductId = data.product.id;
    productPrice = data.product.prices[0];
    quantity = 1;
    activeImage = 0;
    checkoutErrorMessage = '';
    showAddToCartMessage = false;
  }
  $: productTitle = formatProductTitle(data.product);
  $: size = getProductDisplaySize(data.product);
  $: canCheckout = hasCheckoutPrice(productPrice);
  $: productImages = data.productImagePublicUrls?.length
    ? data.productImagePublicUrls
    : data.product.category === 'Feather Dusters'
    ? [getProductImagePath(data.product), getProductImagePath(data.product, 1)]
    : [getProductImagePath(data.product)];
  $: shortName = data.product.name.replace(/^Premium /, '');
  $: color = data.product.color.replace('Premium ', '');
  const checkout = async () => {
    if (!productPrice) return;
    try {
      isLoadingCheckout = true;
      checkoutErrorMessage = '';
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfileId: $page.data.session && $page.data.session.user.id,
          products: [{ productPriceId: productPrice.id, quantity }],
        }),
      });
      const session = await response.json();
      if (!response.ok || !session.id) {
        checkoutErrorMessage =
          session.error || 'Checkout could not be started.';
        return;
      }
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: session.id,
      });
      if (error?.message) checkoutErrorMessage = error.message;
    } catch {
      checkoutErrorMessage = 'Checkout could not be started. Please try again.';
    } finally {
      isLoadingCheckout = false;
    }
  };
  const addToCart = () => {
    if (!productPrice) return;
    cart.addCartItem(data.product, productPrice, quantity);
    showAddToCartMessage = true;
    clearTimeout(addedTimeout);
    addedTimeout = setTimeout(() => (showAddToCartMessage = false), 2500);
  };
  const openImage = async () => {
    await tick();
    imageDialog.showModal();
  };
  onDestroy(() => clearTimeout(addedTimeout));
</script>

<dialog bind:this={imageDialog} aria-label={productTitle}>
  <div class="dialog-inner">
    <form method="dialog">
      <button class="nf-icon-button" aria-label="Close product image"
        ><X size={20} aria-hidden="true" /></button
      >
    </form>
    <img src={productImages[activeImage]} alt={productTitle} />
  </div>
</dialog>

<div class="nf-page product-page">
  <a
    class="back-link"
    href={`/products/${data.product.category.toLowerCase().replace(/ /g, '-')}`}
    ><ArrowLeft size={14} aria-hidden="true" /> {data.product.category}</a
  >
  <div class="product-layout">
    <section class="product-gallery" aria-label="Product photographs">
      <button
        class="main-image"
        on:click={openImage}
        aria-label={`Enlarge image of ${productTitle}`}
        ><img
          src={productImages[activeImage]}
          alt={productTitle}
          width="1024"
          height="1024"
        /><span><ZoomIn size={19} aria-hidden="true" /></span></button
      >{#if productImages.length > 1}<div
          class="image-thumbnails"
          role="group"
          aria-label="Choose product photograph"
        >
          {#each productImages as image, index}<button
              aria-pressed={activeImage === index}
              aria-label={`Product photograph ${index + 1}`}
              on:click={() => (activeImage = index)}
              ><img src={image} alt="" width="72" height="72" /></button
            >{/each}
        </div>{/if}
    </section>
    <section class="product-details" aria-labelledby="product-title">
      <p class="nf-eyebrow">{data.product.category}</p>
      <h1 id="product-title" class="nf-display">{shortName}</h1>
      <p class="product-variant">{color}{size ? ` / ${size}` : ''}</p>
      {#if data.product.rating_count > 0}<Stars
          id={data.product.id}
          ratingAverage={data.product.rating_average}
          ratingCount={data.product.rating_count}
        />{/if}
      <p class="description">{data.product.description}</p>
      {#if productPrice}
        <fieldset class="pack-options">
          <legend>Choose a pack</legend>
          <div>
            {#each data.product.prices as price}<button
                aria-pressed={productPrice.id === price.id}
                on:click={() => (productPrice = price)}
                ><span
                  >{formatPackage(price.quantity)}
                  <small
                    >{price.quantity}
                    {price.quantity === 1 ? 'piece' : 'pieces'}</small
                  ></span
                ><strong>{formatCurrency(price.price)}</strong
                >{#if productPrice.id === price.id}<Check
                    size={15}
                    aria-hidden="true"
                  />{/if}</button
              >{/each}
          </div>
        </fieldset>
        <div class="product-price" aria-live="polite">
          <strong>{formatCurrency(productPrice.price)}</strong><span
            >{formatPackage(productPrice.quantity, true)}</span
          >
        </div>
        {#if productPrice.quantity > 1}<p class="per-piece">
            {formatCurrency(productPrice.price / productPrice.quantity)} per duster
          </p>{/if}
        <div class="quantity-row">
          <div>
            <p class="nf-label">Number of packs</p>
            <Counter bind:value={quantity} />
          </div>
          <p>
            {quantity * productPrice.quantity} total pieces<br /><strong
              >{formatCurrency(quantity * productPrice.price)}</strong
            >
          </p>
        </div>
        <div class="buy-actions">
          <button
            class="nf-button"
            on:click={addToCart}
            disabled={showAddToCartMessage}
            >{#if showAddToCartMessage}<Check size={18} aria-hidden="true" /> Added
              to cart{:else}<ShoppingBag size={18} aria-hidden="true" /> Add to cart{/if}</button
          ><button
            class="nf-button nf-button-secondary"
            disabled={isLoadingCheckout || !canCheckout}
            on:click={checkout}
            >{isLoadingCheckout
              ? 'Opening checkout...'
              : 'Buy now'}<ArrowUpRight size={18} aria-hidden="true" /></button
          >
        </div>
        <p class="sr-only" role="status">
          {showAddToCartMessage ? 'Product added to your cart.' : ''}
        </p>
        {#if checkoutErrorMessage}<p class="checkout-error" role="alert">
            {checkoutErrorMessage}
          </p>{/if}
        {#if !canCheckout}<p class="delivery-note">
            Online checkout is unavailable for this item at the moment. <a
              href="/info/contact">Contact us to order.</a
            >
          </p>{/if}
        <p class="delivery-note">
          Prices in CAD. Shipping and taxes calculated at checkout.<br />Free
          delivery on orders over CA$950.
        </p>
      {/if}
      <a class="bulk-callout" href="/products/janitorial-bulk"
        ><span
          >Buying for a cleaning team?<small
            >Mix sizes and colors in a bulk quote.</small
          ></span
        ><ArrowUpRight size={20} aria-hidden="true" /></a
      >
    </section>
  </div>
</div>

<style>
  .product-page {
    padding-top: 24px;
  }
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    font-size: 12px;
    color: #52625a;
    margin-bottom: 22px;
  }
  .product-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    gap: 64px;
    align-items: flex-start;
  }
  .product-gallery {
    min-width: 0;
    position: sticky;
    top: 138px;
  }
  .main-image {
    position: relative;
    display: block;
    width: 100%;
    background: #f0f4f0;
    border-radius: 4px;
    overflow: hidden;
  }
  .main-image img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: contain;
    padding: 24px;
  }
  .main-image > span {
    position: absolute;
    right: 20px;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 50%;
    height: 44px;
    width: 44px;
  }
  .main-image:hover img {
    transform: scale(1.03);
    transition: transform 400ms;
  }
  .image-thumbnails {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }
  .image-thumbnails button {
    width: 72px;
    height: 72px;
    border: 1px solid #dce4df;
    border-radius: 4px;
    background: #f0f4f0;
  }
  .image-thumbnails button[aria-pressed='true'] {
    border-color: #067647;
    outline: 1px solid #067647;
  }
  .image-thumbnails img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 6px;
  }
  h1 {
    font-size: 38px;
    line-height: 1.18;
    margin: 14px 0;
  }
  .product-variant {
    font-size: 14px;
    font-weight: 500;
    color: #067647;
  }
  .description {
    color: #52625a;
    font-size: 14px;
    line-height: 1.9;
    margin: 22px 0 28px;
  }
  .pack-options legend {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .pack-options > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .pack-options button {
    display: flex;
    gap: 16px;
    align-items: center;
    text-align: left;
    padding: 13px 16px;
    border: 1px solid #c7d4cb;
    border-radius: 6px;
    font-size: 14px;
  }
  .pack-options button[aria-pressed='true'] {
    background: #edf7f0;
    border-color: #067647;
  }
  .pack-options button > span {
    flex: 1;
  }
  .pack-options small {
    color: #52625a;
    margin-left: 8px;
    font-size: 12px;
  }
  .pack-options strong {
    font-size: 12px;
    font-weight: 600;
  }
  .pack-options button:hover {
    border-color: #067647;
  }
  .product-price {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: baseline;
    margin-top: 28px;
  }
  .product-price strong {
    font-size: 30px;
    font-weight: 500;
  }
  .product-price > span {
    font-size: 12px;
    color: #52625a;
  }
  .per-piece {
    font-size: 12px;
    color: #52625a;
    margin-top: 3px;
  }
  .quantity-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: flex-end;
    margin-top: 24px;
  }
  .quantity-row .nf-label {
    font-size: 12px;
  }
  .quantity-row > p {
    font-size: 12px;
    color: #52625a;
    text-align: right;
  }
  .quantity-row strong {
    font-size: 16px;
    font-weight: 600;
    color: #172820;
  }
  .buy-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 20px;
  }
  .buy-actions button {
    padding-inline: 14px;
    font-size: 12px;
  }
  .delivery-note {
    font-size: 12px;
    color: #52625a;
    line-height: 1.85;
    margin-top: 16px;
  }
  .delivery-note a {
    text-decoration: underline;
  }
  .checkout-error {
    font-size: 12px;
    color: #a11919;
    margin-top: 12px;
  }
  .bulk-callout {
    border-top: 1px solid #dce4df;
    margin-top: 28px;
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    font-size: 12px;
    color: #067647;
  }
  .bulk-callout small {
    display: block;
    margin-top: 5px;
    color: #52625a;
    font-size: 12px;
  }
  dialog {
    padding: 0;
    border: none;
    border-radius: 8px;
    width: min(900px, calc(100vw - 32px));
    max-height: calc(100dvh - 32px);
    background: #f0f4f0;
  }
  dialog::backdrop {
    background: #172820bb;
  }
  .dialog-inner {
    padding: 44px 20px 20px;
  }
  .dialog-inner form {
    position: absolute;
    right: 12px;
    top: 12px;
  }
  .dialog-inner img {
    max-height: calc(100dvh - 110px);
    width: 100%;
    object-fit: contain;
  }
  @media (max-width: 1000px) {
    .product-layout {
      gap: 32px;
    }
    h1 {
      font-size: 32px;
    }
  }
  @media (max-width: 750px) {
    .product-layout {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    .product-gallery {
      position: static;
    }
    .main-image img {
      max-height: 420px;
    }
    h1 {
      font-size: 30px;
    }
    .product-page {
      padding-top: 14px;
    }
  }
</style>
