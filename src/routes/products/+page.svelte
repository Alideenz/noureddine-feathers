<!-- @format -->
<script lang="ts">
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';

  const categories = [
    {
      title: 'Janitorial Bulk Orders',
      href: '/products/janitorial-bulk',
      text: 'Build a mixed quote for 12 dozen, 24 dozen, or custom duster supply.',
    },
    {
      title: 'Feather Dusters',
      href: '/products/feather-dusters',
      text: 'Handmade ostrich feather dusters for delicate surfaces and everyday cleaning.',
    },
    {
      title: 'Lambswool Dusters',
      href: '/products/lambswool-dusters',
      text: 'Soft lambswool dusters, including extendable options for higher spaces.',
    },
    {
      title: 'Feathers',
      href: '/products/feathers',
      text: 'Colorful premium ostrich feathers for decoration, craft, and display work.',
    },
    {
      title: 'Eggshells',
      href: '/products/eggshells',
      text: 'Decorative ostrich eggshells with detailed artwork and display appeal.',
    },
  ];
</script>

<svelte:head>
  <title>Products | Noureddine Feathers</title>
  <meta
    name="description"
    content="Shop Noureddine Feathers product collections including ostrich feather dusters, lambswool dusters, ostrich feathers, and decorative ostrich eggshells."
  />
</svelte:head>

<div class="bg-stone-50">
  <div class="nf-page flex flex-col gap-8">
    <div class="flex max-w-3xl flex-col gap-3">
      <p class="nf-eyebrow">Catalog</p>
      <Heading>Products</Heading>
      <p class="leading-7 text-stone-600">
        Choose a collection to browse handmade dusters, natural feathers, and
        decorative eggshells.
      </p>
    </div>

    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {#each categories as category}
        <Link
          href={category.href}
          customClass="nf-panel flex min-h-[220px] flex-col justify-between gap-6 p-6 transition-all hover:-translate-y-1 hover:border-teal-700 hover:shadow-xl"
        >
          <div class="flex flex-col gap-3">
            <p class="montserrat-bold text-xl text-stone-950">
              {category.title}
            </p>
            <p class="leading-7 text-stone-600">{category.text}</p>
          </div>
          <span class="montserrat-bold text-teal-800">Shop collection</span>
        </Link>
      {/each}
    </div>
  </div>
</div>
