<script lang="ts">
  import { ArrowUpRight, Feather, Layers3, PackageCheck } from 'lucide-svelte';
  import Hero from '$components/Hero.svelte';
  import BulkEstimator from '$components/BulkEstimator.svelte';
  import ProductCardGrid from '$components/ProductCardGrid.svelte';
  import ScrollReveal from '$components/ScrollReveal.svelte';
  import type I_Product from '$interfaces/I_Product';
  export let data: {
    featherDusters: I_Product[];
    lambswoolDusters: I_Product[];
    feathers: I_Product[];
    eggshells: I_Product[];
  };
  let collection = 'featherDusters';
  $: collections = [
    {
      id: 'featherDusters',
      label: 'Feather dusters',
      href: '/products/feather-dusters',
      products: data.featherDusters,
    },
    {
      id: 'lambswoolDusters',
      label: 'Lambswool dusters',
      href: '/products/lambswool-dusters',
      products: data.lambswoolDusters,
    },
    {
      id: 'feathers',
      label: 'Feathers',
      href: '/products/feathers',
      products: data.feathers,
    },
    {
      id: 'eggshells',
      label: 'Eggshells',
      href: '/products/eggshells',
      products: data.eggshells,
    },
  ];
  $: current = collections.find((item) => item.id === collection)!;
</script>

<Hero />

<div class="service-strip">
  <div><span>01</span> Handmade ostrich feather dusters</div>
  <div><span>02</span> Dozen &amp; mixed bulk orders</div>
  <div><span>03</span> Shipping across Canada &amp; the US</div>
</div>

<section
  class="nf-page collection"
  id="collection"
  aria-labelledby="collection-title"
>
  <ScrollReveal>
    <div class="section-heading">
      <div>
        <p class="section-index">01 &nbsp; / &nbsp; The collection</p>
        <h2 id="collection-title" class="nf-display">Choose your dusters.</h2>
      </div>
      <a href={current.href} class="nf-text-link"
        >View all {current.label.toLowerCase()}
        <ArrowUpRight size={17} aria-hidden="true" /></a
      >
    </div>
    <div class="collection-tabs" role="group" aria-label="Browse collection">
      {#each collections as option}<button
          aria-pressed={collection === option.id}
          on:click={() => (collection = option.id)}>{option.label}</button
        >{/each}
    </div>
    <div aria-live="polite" class="sr-only">Showing {current.label}</div>
    {#if current.products.length}<ProductCardGrid
        products={current.products}
      />{:else}<p class="empty-catalog">
        This collection is unavailable at the moment. <a href="/info/contact"
          >Contact us for availability.</a
        >
      </p>{/if}
  </ScrollReveal>
</section>

<BulkEstimator />

<section class="nf-page materials" aria-labelledby="materials-title">
  <ScrollReveal>
    <div class="section-heading">
      <div>
        <p class="section-index">03 &nbsp; / &nbsp; Materials &amp; ordering</p>
        <h2 id="materials-title" class="nf-display">A duster for the job.</h2>
      </div>
      <p class="section-description">
        Choose the material and reach you need.<br />Order a pack or put
        together a mixed supply.
      </p>
    </div>
    <div class="reason-grid">
      <article>
        <Feather size={26} strokeWidth={1.3} aria-hidden="true" />
        <h3>Ostrich feather</h3>
        <p>
          Soft, flexible plumes for picture frames, shelves, blinds and the
          spaces between things. Available in 16, 20 and 24-inch lengths.
        </p>
        <a href="/products/feather-dusters" class="nf-text-link"
          >Shop feather dusters <ArrowUpRight size={16} aria-hidden="true" /></a
        >
      </article>
      <article>
        <Layers3 size={26} strokeWidth={1.3} aria-hidden="true" />
        <h3>Lambswool</h3>
        <p>
          A full wool head for everyday dusting. Choose a 26-inch duster or the
          26-42-inch extendable model for higher shelves and vents.
        </p>
        <a href="/products/lambswool-dusters" class="nf-text-link"
          >Shop lambswool dusters <ArrowUpRight
            size={16}
            aria-hidden="true"
          /></a
        >
      </article>
      <article>
        <PackageCheck size={26} strokeWidth={1.3} aria-hidden="true" />
        <h3>Orders for your team</h3>
        <p>
          Mix sizes and colors for each location or cleaning route. Start with
          12 or 24 dozen, or tell us exactly what you need.
        </p>
        <a href="/products/janitorial-bulk" class="nf-text-link"
          >Build a bulk quote <ArrowUpRight size={16} aria-hidden="true" /></a
        >
      </article>
    </div>
  </ScrollReveal>
</section>

<section class="family-section" aria-labelledby="family-title">
  <div class="nf-page family-inner">
    <div>
      <p class="section-index">
        Noureddine Feathers &nbsp; / &nbsp; Our family business
      </p>
      <h2 class="nf-display" id="family-title">
        Making feather dusters<br />since 1976.
      </h2>
    </div>
    <div>
      <p>
        Our family began making feather dusters in the Mediterranean in 1976. We
        established our Vancouver business in 1997 and have supplied customers
        across Canada and the United States ever since.
      </p>
      <a href="/info/about" class="nf-text-link"
        >More about us <ArrowUpRight size={17} aria-hidden="true" /></a
      >
    </div>
  </div>
</section>

<section class="nf-page questions" aria-labelledby="questions-title">
  <div>
    <p class="section-index">Before you order</p>
    <h2 class="nf-display" id="questions-title">A few useful details.</h2>
    <a href="/info/contact" class="nf-text-link"
      >Ask us a question <ArrowUpRight size={17} aria-hidden="true" /></a
    >
  </div>
  <div class="faq-list">
    <details>
      <summary>Can I mix sizes and colors in a bulk order?</summary>
      <p>
        Yes. The bulk order builder lets you choose the quantity of each size
        and color. Send us your list and we will confirm pricing and delivery.
      </p>
    </details>
    <details>
      <summary>Where do you ship?</summary>
      <p>
        We ship to Canada and the United States. Shipping is calculated at
        checkout, and orders over CA$950 qualify for free delivery.
      </p>
    </details>
    <details>
      <summary>Do I need an account to order?</summary>
      <p>No. You can add products to your cart and check out as a guest.</p>
    </details>
    <details>
      <summary>Is the bulk estimate a final price?</summary>
      <p>
        The builder estimates the product cost from our price list. We confirm
        custom quantities, shipping and any applicable taxes with your quote.
      </p>
    </details>
  </div>
</section>

<style>
  .service-strip {
    max-width: 1360px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: auto;
    padding: 22px 48px;
    border-bottom: 1px solid #dce4df;
    gap: 24px;
  }
  .service-strip div {
    font-size: 12px;
    color: #405148;
    display: flex;
    gap: 14px;
    align-items: center;
  }
  .service-strip span {
    color: #067647;
    font-size: 12px;
    font-variant-numeric: tabular-nums;
  }
  .section-index {
    color: #52625a;
    font-size: 12px;
    margin-bottom: 14px;
  }
  .section-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 30px;
  }
  h2 {
    font-size: 40px;
    line-height: 1.15;
  }
  .section-description {
    font-size: 12px;
    line-height: 1.85;
    color: #52625a;
  }
  .collection-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
    border-bottom: 1px solid #dce4df;
    margin-bottom: 28px;
  }
  .collection-tabs button {
    padding: 12px 0 16px;
    min-height: 48px;
    font-size: 12px;
    color: #52625a;
    border-bottom: 2px solid transparent;
  }
  .collection-tabs button[aria-pressed='true'] {
    color: #067647;
    font-weight: 600;
    border-bottom-color: #067647;
  }
  .collection-tabs button:hover {
    color: #067647;
  }
  .empty-catalog {
    padding: 40px 0;
    font-size: 14px;
  }
  .empty-catalog a {
    text-decoration: underline;
  }
  .reason-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid #dce4df;
  }
  .reason-grid article {
    padding: 30px 28px 0;
    border-left: 1px solid #dce4df;
  }
  .reason-grid article:first-child {
    padding-left: 0;
    border-left: 0;
  }
  .reason-grid article:last-child {
    padding-right: 0;
  }
  .reason-grid h3 {
    margin: 24px 0 12px;
    font-size: 18px;
    font-weight: 500;
  }
  .reason-grid p {
    font-size: 14px;
    line-height: 1.85;
    color: #52625a;
    min-height: 100px;
  }
  .reason-grid a {
    margin-top: 18px;
    font-size: 12px;
  }
  .family-section {
    background: #f0f4f0;
    border-block: 1px solid #dce4df;
  }
  .family-inner {
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    gap: 60px;
    align-items: center;
  }
  .family-inner p:not(.section-index) {
    font-size: 14px;
    color: #52625a;
    line-height: 1.9;
  }
  .family-inner a {
    margin-top: 18px;
  }
  .questions {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 80px;
  }
  .questions > div > a {
    margin-top: 24px;
  }
  .faq-list details {
    border-bottom: 1px solid #dce4df;
  }
  .faq-list details:first-child {
    border-top: 1px solid #dce4df;
  }
  summary {
    cursor: pointer;
    padding: 22px 20px 22px 0;
    font-size: 14px;
    font-weight: 500;
  }
  .faq-list p {
    padding: 0 24px 22px 0;
    color: #52625a;
    font-size: 14px;
    line-height: 1.85;
  }
  @media (max-width: 1000px) {
    .service-strip {
      padding-inline: 32px;
    }
    .questions {
      gap: 40px;
    }
    .reason-grid p {
      min-height: 145px;
    }
    h2 {
      font-size: 34px;
    }
  }
  @media (max-width: 700px) {
    .service-strip {
      padding: 18px 20px;
      gap: 14px;
      grid-template-columns: 1fr;
    }
    .service-strip div {
      font-size: 12px;
    }
    .section-heading {
      display: block;
    }
    .section-heading > a {
      margin-top: 14px;
    }
    .collection-tabs {
      gap: 18px;
    }
    .collection-tabs button {
      font-size: 12px;
    }
    h2 {
      font-size: 30px;
    }
    .reason-grid {
      grid-template-columns: 1fr;
    }
    .reason-grid article,
    .reason-grid article:first-child,
    .reason-grid article:last-child {
      border-left: 0;
      border-bottom: 1px solid #dce4df;
      padding: 24px 0;
    }
    .reason-grid h3 {
      margin-top: 16px;
    }
    .reason-grid p {
      min-height: 0;
    }
    .section-description {
      margin-top: 18px;
    }
    .family-inner,
    .questions {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }
</style>
