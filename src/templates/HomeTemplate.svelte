<!-- @format -->
<script lang="ts">
  // components
  import Heading from '$components/Heading.svelte';
  import Hero from '$components/Hero.svelte';
  import Link from '$components/Link.svelte';
  import ProductCardGrid from '$components/ProductCardGrid.svelte';
  import type I_Product from '$interfaces/I_Product';

  // data
  export let data: {
    featherDusters: I_Product[];
    lambswoolDusters: I_Product[];
    feathers: I_Product[];
    eggshells: I_Product[];
  };
</script>

<div class="flex flex-col">
  <Hero />
  <section class="border-b border-stone-900 bg-[#102f2c] text-white">
    <div class="nf-page grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
      <div class="flex flex-col gap-4">
        <p class="nf-eyebrow text-[#f2d58b]">Janitorial bulk orders</p>
        <Heading customClass="text-white">
          Build a mixed duster order for your cleaning teams
        </Heading>
        <p class="max-w-2xl leading-7 text-stone-200">
          Choose 12 dozen, 24 dozen, or a custom quote across ostrich feather
          dusters and lambswool dusters, with flexible quantities for each size
          and color.
        </p>
      </div>
      <div class="grid gap-px border border-white/20 bg-white/20 sm:grid-cols-3">
        <div class="bg-[#123a36] p-5">
          <p class="nf-display text-5xl text-[#f2d58b]">12</p>
          <p class="mt-2 text-sm leading-6 text-stone-200">dozen starter mix</p>
        </div>
        <div class="bg-[#123a36] p-5">
          <p class="nf-display text-5xl text-[#f2d58b]">24</p>
          <p class="mt-2 text-sm leading-6 text-stone-200">dozen route supply</p>
        </div>
        <Link
          href="/products/janitorial-bulk"
          customClass="montserrat-bold flex items-center justify-center bg-white px-5 py-5 text-center text-stone-950 transition-all hover:bg-[#f2d58b] sm:min-h-[128px]"
        >
          Build Bulk Quote
        </Link>
      </div>
    </div>
  </section>
  <section class="border-b border-stone-200 bg-[#fffdf8]">
    <div class="nf-page grid gap-8 lg:grid-cols-[1.2fr_1fr_1fr]">
      <div class="flex flex-col gap-3">
        <p class="nf-eyebrow">Why Noureddine</p>
        <h2 class="nf-display text-4xl leading-[1.02] text-stone-950">
          Soft on glass, useful in the corners.
        </h2>
      </div>
      <p class="leading-7 text-stone-600">
        Soft ostrich plumes lift fine dust from glass, picture frames, plants,
        shelves, vents, and crowded displays without scraping the surface or
        knocking small pieces out of place.
      </p>
      <p class="leading-7 text-stone-600">
        We keep the range practical: fuller feather heads for delicate dusting,
        lambswool for daily route work, and simple bulk quantities that make
        restocking easier for homes, shops, offices, and cleaning crews.
      </p>
    </div>
  </section>

  <div class="nf-page flex flex-col gap-8">
    <section class="nf-section-shell flex flex-col gap-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="nf-eyebrow">Best sellers</p>
          <Heading>Feather Dusters</Heading>
        </div>
        <Link
          href="/products/feather-dusters"
          customClass="montserrat-bold self-start rounded-full bg-stone-950 px-5 py-3 text-sm text-white transition-all hover:bg-teal-800 sm:self-auto"
          >View All</Link
        >
      </div>
      <ProductCardGrid products={data.featherDusters} />
    </section>
    <section class="nf-section-shell flex flex-col gap-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="nf-eyebrow">Everyday reach</p>
          <Heading>Lambswool Dusters</Heading>
        </div>
        <Link
          href="/products/lambswool-dusters"
          customClass="montserrat-bold self-start rounded-full bg-stone-950 px-5 py-3 text-sm text-white transition-all hover:bg-teal-800 sm:self-auto"
          >View All</Link
        >
      </div>
      <ProductCardGrid products={data.lambswoolDusters} />
    </section>
    <section class="nf-section-shell flex flex-col gap-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="nf-eyebrow">Color and texture</p>
          <Heading>Feathers</Heading>
        </div>
        <Link
          href="/products/feathers"
          customClass="montserrat-bold self-start rounded-full bg-stone-950 px-5 py-3 text-sm text-white transition-all hover:bg-teal-800 sm:self-auto"
          >View All</Link
        >
      </div>
      <ProductCardGrid products={data.feathers} />
    </section>
    <section class="nf-section-shell flex flex-col gap-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="nf-eyebrow">Display pieces</p>
          <Heading>Eggshells</Heading>
        </div>
        <Link
          href="/products/eggshells"
          customClass="montserrat-bold self-start rounded-full bg-stone-950 px-5 py-3 text-sm text-white transition-all hover:bg-teal-800 sm:self-auto"
          >View All</Link
        >
      </div>
      <ProductCardGrid products={data.eggshells} />
    </section>
  </div>
</div>
