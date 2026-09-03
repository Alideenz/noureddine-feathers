<!-- @format -->
<script lang="ts">
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';

  const pages = [
    {
      title: 'About',
      href: '/info/about',
      text: 'Learn about the family business and how Noureddine Feathers began.',
    },
    {
      title: 'FAQ',
      href: '/info/faq',
      text: 'Answers about ostrich feathers, care, sourcing, and satisfaction.',
    },
    {
      title: 'Shipping',
      href: '/info/shipping',
      text: 'Shipping availability, delivery expectations, and free delivery details.',
    },
    {
      title: 'Returns',
      href: '/info/returns',
      text: 'Return authorization, timing, and restocking information.',
    },
    {
      title: 'Contact',
      href: '/info/contact',
      text: 'Address, phone, fax, and email contact information.',
    },
  ];
</script>

<svelte:head>
  <title>Info | Noureddine Feathers</title>
  <meta
    name="description"
    content="Find Noureddine Feathers contact details, shipping information, returns policy, frequently asked questions, and company background."
  />
</svelte:head>

<div class="bg-stone-50">
  <div class="nf-page flex flex-col gap-8">
    <div class="flex max-w-3xl flex-col gap-3">
      <p class="nf-eyebrow">Customer care</p>
      <Heading>Information</Heading>
      <p class="leading-7 text-stone-600">
        Everything customers need before and after ordering from Noureddine
        Feathers.
      </p>
    </div>

    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {#each pages as page}
        <Link
          href={page.href}
          customClass="nf-panel flex min-h-[190px] flex-col justify-between gap-6 p-6 transition-all hover:-translate-y-1 hover:border-teal-700 hover:shadow-xl"
        >
          <div class="flex flex-col gap-3">
            <p class="montserrat-bold text-xl text-stone-950">{page.title}</p>
            <p class="leading-7 text-stone-600">{page.text}</p>
          </div>
          <span class="montserrat-bold text-teal-800">Read more</span>
        </Link>
      {/each}
    </div>
  </div>
</div>
