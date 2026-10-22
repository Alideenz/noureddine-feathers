<script lang="ts">
  import { ArrowUpRight, Search, X } from 'lucide-svelte';
  import type I_Product from '$interfaces/I_Product';
  import { getProductDisplaySize } from '$helpers/helpers';
  import ProductCardGrid from '$components/ProductCardGrid.svelte';
  export let heading = '';
  export let data: { products: I_Product[] };
  let search = '';
  let color = 'All colors';
  let size = 'All sizes';
  let sort = 'catalog';
  $: colors = [
    ...new Set(
      data.products.map((product) => product.color.replace('Premium ', ''))
    ),
  ];
  $: sizes = [...new Set(data.products.map(getProductDisplaySize))].filter(
    Boolean
  );
  $: filtered = data.products.filter(
    (product) =>
      `${product.name} ${product.color} ${getProductDisplaySize(product)}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (color === 'All colors' ||
        product.color.replace('Premium ', '') === color) &&
      (size === 'All sizes' || getProductDisplaySize(product) === size)
  );
  $: products =
    sort === 'price-low'
      ? [...filtered].sort(
          (a, b) =>
            (a.prices[0]?.price ?? Infinity) - (b.prices[0]?.price ?? Infinity)
        )
      : sort === 'price-high'
      ? [...filtered].sort(
          (a, b) => (b.prices[0]?.price ?? 0) - (a.prices[0]?.price ?? 0)
        )
      : filtered;
  $: description = heading.toLowerCase().includes('lambswool')
    ? 'Standard 26-inch and extendable 26-42-inch dusters. Choose your color and pack size.'
    : heading.toLowerCase().includes('feather dusters')
    ? 'Natural ostrich feather dusters in black and gray. Three lengths, with one-dozen and five-dozen packs.'
    : heading.toLowerCase().includes('eggshell')
    ? 'Decorated ostrich eggshells for display. Browse the available designs.'
    : 'Natural ostrich feathers in a choice of colors for craft, decoration and display.';
  const reset = () => {
    search = '';
    color = 'All colors';
    size = 'All sizes';
    sort = 'catalog';
  };
</script>

<section class="collection-intro">
  <div class="nf-page">
    <a href="/" class="breadcrumb">Home / Shop</a>
    <div class="intro-heading">
      <div>
        <h1 class="nf-display">{heading}</h1>
        <p>{description}</p>
      </div>
      <a href="/products/janitorial-bulk" class="nf-text-link"
        >Ordering for a team? <ArrowUpRight size={18} aria-hidden="true" /></a
      >
    </div>
  </div>
</section>
<section class="nf-page catalog" aria-label={`${heading} catalog`}>
  <div class="catalog-toolbar">
    <div class="search-field">
      <Search size={17} aria-hidden="true" /><input
        type="search"
        bind:value={search}
        placeholder="Search this collection"
        aria-label="Search this collection"
      />
    </div>
    <div class="catalog-filters">
      {#if colors.length > 1}<select
          class="nf-field"
          bind:value={color}
          aria-label="Filter by color"
          ><option>All colors</option>{#each colors as option}<option
              >{option}</option
            >{/each}</select
        >{/if}{#if sizes.length > 1}<select
          class="nf-field"
          bind:value={size}
          aria-label="Filter by size"
          ><option>All sizes</option>{#each sizes as option}<option
              >{option}</option
            >{/each}</select
        >{/if}<select
        class="nf-field"
        bind:value={sort}
        aria-label="Sort products"
        ><option value="catalog">Catalog order</option><option value="price-low"
          >Pack price: low to high</option
        ><option value="price-high">Pack price: high to low</option></select
      >
    </div>
  </div>
  <div class="catalog-count">
    <p aria-live="polite">
      {products.length}
      {products.length === 1 ? 'product' : 'products'}
    </p>
    {#if search || color !== 'All colors' || size !== 'All sizes'}<button
        on:click={reset}
        >Clear filters <X size={14} aria-hidden="true" /></button
      >{/if}
  </div>
  {#if products.length}<ProductCardGrid {products} />{:else}<div
      class="catalog-empty"
    >
      <h2>No products match these filters.</h2>
      <button class="nf-button nf-button-secondary" on:click={reset}
        >Clear filters</button
      >
    </div>{/if}
</section>

<style>
  .collection-intro {
    background: #f0f4f0;
    border-bottom: 1px solid #dce4df;
  }
  .collection-intro .nf-page {
    padding-top: 32px;
    padding-bottom: 48px;
  }
  .breadcrumb {
    color: #52625a;
    font-size: 12px;
    display: inline-flex;
    min-height: 44px;
    align-items: center;
  }
  .intro-heading {
    margin-top: 16px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 36px;
  }
  h1 {
    font-size: 48px;
    line-height: 1.12;
  }
  .intro-heading p {
    max-width: 560px;
    font-size: 14px;
    color: #52625a;
    margin-top: 18px;
    line-height: 1.9;
  }
  .intro-heading a {
    flex-shrink: 0;
  }
  .catalog {
    padding-top: 32px;
  }
  .catalog-toolbar {
    display: flex;
    justify-content: space-between;
    gap: 24px;
  }
  .search-field {
    border: 1px solid #819589;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    min-width: 230px;
  }
  .search-field input {
    padding: 12px 0;
    min-width: 0;
    width: 100%;
    font-size: 12px;
    background: transparent;
  }
  .search-field input::placeholder {
    color: #52625a;
  }
  .catalog-filters {
    display: flex;
    gap: 12px;
  }
  .catalog-filters select {
    width: auto;
    font-size: 12px;
  }
  .catalog-count {
    display: flex;
    justify-content: space-between;
    margin: 22px 0 28px;
    font-size: 12px;
    color: #52625a;
  }
  .catalog-count button {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 32px;
    color: #067647;
  }
  .catalog-empty {
    padding: 50px 0;
  }
  .catalog-empty h2 {
    margin-bottom: 20px;
  }
  @media (max-width: 900px) {
    .catalog-toolbar {
      flex-direction: column;
      gap: 12px;
    }
    .catalog-filters select {
      flex: 1;
      width: 0;
    }
    .intro-heading {
      display: block;
    }
    .intro-heading a {
      margin-top: 18px;
    }
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 34px;
    }
    .catalog-filters {
      flex-wrap: wrap;
      gap: 8px;
    }
    .catalog-filters select {
      min-width: 120px;
    }
    .collection-intro .nf-page {
      padding-top: 20px;
      padding-bottom: 30px;
    }
  }
</style>
