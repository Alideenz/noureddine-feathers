<!-- @format -->
<script lang="ts">
  import { page } from '$app/stores';

  // components
  import Link from '$components/Link.svelte';
  import Button from '$components/Button.svelte';

  // stores
  import { cart } from '$stores/CartStore';

  // lib
  import ImageLogo from '$lib/images/logo.webp';

  // props
  let showNavMobile: boolean = false;

  const openMobileNav = () => {
    showNavMobile = true;
  };

  const closeMobileNav = () => {
    showNavMobile = false;
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeMobileNav();
  };

  const handleResize = () => {
    if (window.innerWidth >= 1280) closeMobileNav();
  };

</script>

<svelte:window on:keydown={handleKeydown} on:resize={handleResize} />

{#if showNavMobile}
  <div class="fixed inset-0 z-[80] xl:hidden">
    <button
      class="absolute inset-0 bg-stone-950/25 backdrop-blur-[2px]"
      type="button"
      aria-label="Close navigation"
      on:click={closeMobileNav}
    />

    <div
      class="absolute right-3 top-20 w-[min(calc(100vw-1.5rem),24rem)] overflow-hidden rounded-2xl border border-stone-200 bg-[#fffdf8] shadow-[0_28px_90px_rgba(28,25,23,0.24)] sm:right-6 sm:top-24"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div class="flex items-center gap-4 border-b border-stone-200 bg-white px-4 py-3">
        <Link
          href="/"
          customClass="max-w-min"
          handleClick={closeMobileNav}
        >
          <img
            src={ImageLogo}
            alt="Noureddine Feathers"
            class="h-[52px] w-[96px] max-w-min object-contain"
            width=""
            height=""
          />
        </Link>
        <div class="flex flex-1 items-center justify-end">
          <Button
            handleClick={closeMobileNav}
            customClass="rounded-full bg-stone-100 p-2 hover:bg-stone-200 transition-all"
            ariaLabel="Close navigation"
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
      </div>

      <div class="border-b border-stone-200 bg-[#102f2c] px-5 py-4 text-white">
        <p class="text-xs uppercase tracking-[0.18em] text-[#f2d58b]">
          Trade orders
        </p>
        <p class="mt-1 text-sm leading-6 text-stone-100">
          Quick access to dusters, feathers, eggshells, and bulk quantities.
        </p>
      </div>

      <div class="grid gap-2 p-3">
        <Link
          handleClick={closeMobileNav}
          href="/products/feather-dusters"
          customClass={`group flex items-center justify-between rounded-xl border px-4 py-3.5 transition-all hover:border-teal-800 hover:bg-white hover:text-teal-800 ${
            $page.url.pathname.includes('feather-dusters')
              ? 'border-teal-800 bg-white text-teal-800 shadow-sm'
              : 'border-transparent text-stone-800'
          }`}>
          <span>
            <span class="block font-semibold">Feather Dusters</span>
            <span class="mt-0.5 block text-xs font-normal text-stone-500">
              Ostrich dusters by size
            </span>
          </span>
          <span class="text-lg text-stone-400 transition-all group-hover:translate-x-0.5 group-hover:text-teal-800">
            &rarr;
          </span>
        </Link
        >
        <Link
          handleClick={closeMobileNav}
          href="/products/lambswool-dusters"
          customClass={`group flex items-center justify-between rounded-xl border px-4 py-3.5 transition-all hover:border-teal-800 hover:bg-white hover:text-teal-800 ${
            $page.url.pathname.includes('lambswool-dusters')
              ? 'border-teal-800 bg-white text-teal-800 shadow-sm'
              : 'border-transparent text-stone-800'
          }`}>
          <span>
            <span class="block font-semibold">Lambswool Dusters</span>
            <span class="mt-0.5 block text-xs font-normal text-stone-500">
              Daily route cleaning tools
            </span>
          </span>
          <span class="text-lg text-stone-400 transition-all group-hover:translate-x-0.5 group-hover:text-teal-800">
            &rarr;
          </span>
        </Link
        >
        <Link
          handleClick={closeMobileNav}
          href="/products/feathers"
          customClass={`group flex items-center justify-between rounded-xl border px-4 py-3.5 transition-all hover:border-teal-800 hover:bg-white hover:text-teal-800 ${
            $page.url.pathname.includes('feathers')
              ? 'border-teal-800 bg-white text-teal-800 shadow-sm'
              : 'border-transparent text-stone-800'
          }`}>
          <span>
            <span class="block font-semibold">Feathers</span>
            <span class="mt-0.5 block text-xs font-normal text-stone-500">
              Color, texture, and craft supply
            </span>
          </span>
          <span class="text-lg text-stone-400 transition-all group-hover:translate-x-0.5 group-hover:text-teal-800">
            &rarr;
          </span>
        </Link
        >
        <Link
          handleClick={closeMobileNav}
          href="/products/eggshells"
          customClass={`group flex items-center justify-between rounded-xl border px-4 py-3.5 transition-all hover:border-teal-800 hover:bg-white hover:text-teal-800 ${
            $page.url.pathname.includes('eggshells')
              ? 'border-teal-800 bg-white text-teal-800 shadow-sm'
              : 'border-transparent text-stone-800'
          }`}>
          <span>
            <span class="block font-semibold">Eggshells</span>
            <span class="mt-0.5 block text-xs font-normal text-stone-500">
              Decorative display pieces
            </span>
          </span>
          <span class="text-lg text-stone-400 transition-all group-hover:translate-x-0.5 group-hover:text-teal-800">
            &rarr;
          </span>
        </Link
        >
        <Link
          handleClick={closeMobileNav}
          href="/products/janitorial-bulk"
          customClass={`group flex items-center justify-between rounded-xl border px-4 py-3.5 transition-all hover:border-teal-800 hover:bg-white hover:text-teal-800 ${
            $page.url.pathname.includes('janitorial-bulk')
              ? 'border-teal-800 bg-white text-teal-800 shadow-sm'
              : 'border-transparent text-stone-800'
          }`}>
          <span>
            <span class="block font-semibold">Bulk Orders</span>
            <span class="mt-0.5 block text-xs font-normal text-stone-500">
              Mixed dozen planning
            </span>
          </span>
          <span class="text-lg text-stone-400 transition-all group-hover:translate-x-0.5 group-hover:text-teal-800">
            &rarr;
          </span>
        </Link
        >
        <Link
          handleClick={closeMobileNav}
          href="/cart"
          customClass={`mt-1 flex items-center justify-between rounded-xl border px-4 py-3.5 transition-all hover:border-[#d8b25a] hover:bg-white ${
            $page.url.pathname.includes('cart')
              ? 'border-[#d8b25a] bg-white text-stone-950 shadow-sm'
              : 'border-stone-200 bg-stone-950 text-white'
          }`}
        >
          <span class="font-semibold">Cart</span>
          <span class="rounded-full bg-[#f2d58b] px-2.5 py-1 text-xs font-semibold text-stone-950">
            {$cart.cartTotalItems}
          </span>
        </Link>
      </div>
    </div>
  </div>
{/if}

<nav class="sticky top-0 z-40 bg-white/90 backdrop-blur-xl">
  <p class="bg-stone-950 p-2 text-center text-xs uppercase tracking-[0.18em] text-[#f2d58b]">
    Trade pricing available · free delivery over $950
  </p>
  <div
    class="grid w-full grid-cols-2 items-center border-b border-stone-200/80 bg-white/90 px-5 shadow-[0_12px_35px_rgba(28,25,23,0.05)] sm:px-8 xl:grid-cols-[auto_minmax(0,1fr)_auto]"
  >
    <Link href="/" customClass="max-w-min">
      <img
        src={ImageLogo}
        alt="Noureddine Feathers"
        class="h-[60px] w-[108px] max-w-min object-contain sm:h-[64px] sm:w-[116px]"
        width=""
        height=""
      />
    </Link>
    <div class="flex items-center self-center justify-self-end xl:hidden">
      <Button
        handleClick={openMobileNav}
        customClass="rounded-full p-2 hover:bg-stone-100 transition-all"
        ariaLabel="Open navigation"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5"
        >
          <path
            fill-rule="evenodd"
            d="M2 6.75A.75.75 0 012.75 6h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 6.75zm0 6.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
            clip-rule="evenodd"
          />
        </svg>
      </Button>
    </div>
    <div class="hidden xl:flex xl:justify-self-center">
      <div class="flex items-stretch justify-center text-center">
        <Link
          href="/products/feather-dusters"
          customClass={`flex items-center border-b-2 px-3 py-5 text-sm font-semibold leading-tight text-stone-800 transition-all hover:border-teal-800 hover:text-teal-800 2xl:px-4 ${
            $page.url.pathname.includes('feather-dusters')
              ? 'border-teal-800 border-b-2 text-teal-800'
              : 'border-transparent'
          }`}>Feather Dusters</Link
        >
        <Link
          href="/products/lambswool-dusters"
          customClass={`flex items-center border-b-2 px-3 py-5 text-sm font-semibold leading-tight text-stone-800 transition-all hover:border-teal-800 hover:text-teal-800 2xl:px-4 ${
            $page.url.pathname.includes('lambswool-dusters')
              ? 'border-teal-800 border-b-2 text-teal-800'
              : 'border-transparent'
          }`}>Lambswool Dusters</Link
        >
        <Link
          href="/products/feathers"
          customClass={`flex items-center border-b-2 px-3 py-5 text-sm font-semibold leading-tight text-stone-800 transition-all hover:border-teal-800 hover:text-teal-800 2xl:px-4 ${
            $page.url.pathname.includes('feathers')
              ? 'border-teal-800 border-b-2 text-teal-800'
              : 'border-transparent'
          }`}>Feathers</Link
        >
        <Link
          href="/products/eggshells"
          customClass={`flex items-center border-b-2 px-3 py-5 text-sm font-semibold leading-tight text-stone-800 transition-all hover:border-teal-800 hover:text-teal-800 2xl:px-4 ${
            $page.url.pathname.includes('eggshells')
              ? 'border-teal-800 border-b-2 text-teal-800'
              : 'border-transparent'
          }`}>Eggshells</Link
        >
        <Link
          href="/products/janitorial-bulk"
          customClass={`flex items-center border-b-2 px-3 py-5 text-sm font-semibold leading-tight text-stone-800 transition-all hover:border-teal-800 hover:text-teal-800 2xl:px-4 ${
            $page.url.pathname.includes('janitorial-bulk')
              ? 'border-teal-800 border-b-2 text-teal-800'
              : 'border-transparent'
          }`}>Bulk Orders</Link
        >
      </div>
    </div>
    <div class="hidden xl:flex xl:justify-self-end">
      <div class="flex text-center">
        <Link
          href="/cart"
          customClass={`flex items-center border-b-2 px-4 py-5 text-sm font-semibold leading-tight text-stone-800 transition-all hover:border-teal-800 hover:text-teal-800 ${
            $page.url.pathname.includes('cart')
              ? 'border-teal-800 border-b-2 text-teal-800'
              : 'border-transparent'
          }`}
        >
          <p>
            <span class="inline-block align-middle">Cart</span> (
            <span class="montserrat-bold inline-block align-middle text-xl"
              >{$cart.cartTotalItems}</span
            > )
          </p>
        </Link>
      </div>
    </div>
  </div>
</nav>
