<script lang="ts">
  import { ArrowUpRight } from 'lucide-svelte';
  import {
    formatCurrency,
    formatPackage,
    formatProductTitle,
    getProductDisplaySize,
    getProductImagePath,
    getProductPath,
  } from '$helpers/helpers';
  import type I_Product from '$interfaces/I_Product';
  export let product: I_Product;
  $: productTitle = formatProductTitle(product);
  $: size = getProductDisplaySize(product);
  $: color = product.color.replace('Premium ', '');
  $: name = product.name.replace(/^Premium /, '');
  $: path = getProductPath(product);
  $: prices = [...product.prices].sort((a, b) => a.quantity - b.quantity);
  const swatches: Record<string, string> = {
    Black: '#242724',
    Gray: '#929994',
    Yellow: '#f4d44f',
    Green: '#3f7d4c',
    Orange: '#ed7624',
    Blue: '#2b67c4',
    White: '#fff',
    Purple: '#8545a0',
    Red: '#c33636',
    Pink: '#e3a3bd',
    Gold: '#bf943b',
    'Light Blue': '#8cc5e8',
  };
</script>

<article class="product-card">
  <a href={path} class="product-image" aria-label={productTitle}
    ><img
      src={getProductImagePath(product)}
      alt={productTitle}
      width="1024"
      height="1024"
      loading="lazy"
    /><span class="product-arrow"
      ><ArrowUpRight size={17} aria-hidden="true" /></span
    ></a
  >
  <div class="product-info">
    <div class="product-meta">
      <span>{size || product.category}</span><span class="color-label"
        >{#if swatches[color]}<span
            class="nf-swatch"
            style:background-color={swatches[color]}
          />{/if}{color}</span
      >
    </div>
    <h3><a href={path}>{name}</a></h3>
    <div class="price-table">
      {#each prices as price}<div>
          <span>{formatPackage(price.quantity)}</span><strong
            >{formatCurrency(price.price)}</strong
          >
        </div>{/each}
    </div>
    {#if prices[0]?.quantity > 1}<p class="unit-price">
        {formatCurrency(prices[0].price / prices[0].quantity)} each in the smallest
        pack
      </p>{/if}
  </div>
</article>

<style>
  .product-card {
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  .product-image {
    position: relative;
    display: block;
    aspect-ratio: 1 / 1;
    background: #f2f5f1;
    overflow: hidden;
    border-radius: 4px;
  }
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 18px;
    transition: transform 450ms ease;
  }
  .product-card:hover img {
    transform: rotate(-3deg) scale(1.04);
  }
  .product-arrow {
    position: absolute;
    bottom: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: white;
    transition: background 200ms;
  }
  .product-card:hover .product-arrow {
    background: #d4ebdc;
  }
  .product-info {
    padding: 16px 0 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .product-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 6px;
    color: #52625a;
    font-size: 12px;
  }
  .color-label {
    display: inline-flex;
    gap: 6px;
    align-items: center;
  }
  h3 {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.55;
    margin-top: 10px;
    min-height: 44px;
  }
  h3 a:hover {
    color: #067647;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .price-table {
    border-top: 1px solid #dce4df;
    padding-top: 10px;
    margin-top: 14px;
  }
  .price-table > div {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 4px 0;
    font-size: 12px;
  }
  .price-table > div > span {
    color: #52625a;
  }
  .price-table strong {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .unit-price {
    font-size: 12px;
    line-height: 1.6;
    color: #52625a;
    margin-top: 8px;
  }
  @media (max-width: 500px) {
    .product-image img {
      padding: 8px;
    }
    .product-meta {
      font-size: 11px;
    }
    h3 {
      font-size: 12px;
      min-height: 40px;
    }
    .price-table > div {
      font-size: 12px;
    }
    .product-arrow {
      right: 8px;
      bottom: 8px;
      width: 28px;
      height: 28px;
    }
    .unit-price {
      font-size: 11px;
    }
  }
</style>
