<!-- @format -->
<script lang="ts">
  import { onMount } from 'svelte';
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

  // state
  let bodyElement: any;

  onMount(() => (bodyElement = document.querySelector('body')));

  $: {
    if (showNavMobile) {
      if (bodyElement) bodyElement.style.overflow = 'hidden';
    } else {
      if (bodyElement) bodyElement.style.overflow = 'auto';
    }
  }
</script>

<nav class="sticky top-0 z-40 bg-white/90 backdrop-blur-xl">
  {#if showNavMobile}
    <div class="fixed top-0 z-50 h-full w-full overflow-auto bg-stone-50">
      <p class="bg-stone-950 p-2 text-center text-sm uppercase tracking-[0.14em] text-white">
        Trade pricing available · free delivery over $950
      </p>
      <div class="flex gap-4 border-b border-stone-200 bg-white px-8">
        <Link
          href="/"
          customClass="max-w-min"
          handleClick={() => (showNavMobile = false)}
        >
          <img
            src={ImageLogo}
            alt="Noureddine Feathers"
            class="h-[72px] w-[128px] max-w-min"
            width=""
            height=""
          />
        </Link>
        <div class="flex flex-1 items-center justify-end lg:hidden">
          <Button
            handleClick={() => (showNavMobile = false)}
            customClass="rounded-full p-2 hover:bg-stone-100 transition-all "
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
      <div class="flex flex-col px-8 py-4">
        <Link
          handleClick={() => (showNavMobile = false)}
          href="/products/feather-dusters"
          customClass={`py-4 flex items-center hover:border-teal-800 hover:text-teal-800 border-b-2 transition-all ${
            $page.url.pathname.includes('feather-dusters')
              ? 'border-teal-800 border-b-2 text-teal-800'
              : 'border-transparent'
          }`}>Feather Dusters</Link
        >
        <Link
          handleClick={() => (showNavMobile = false)}
          href="/products/lambswool-dusters"
          customClass={`py-4 flex items-center hover:border-teal-800 hover:text-teal-800 border-b-2 transition-all ${
            $page.url.pathname.includes('lambswool-dusters')
              ? 'border-teal-800 border-b-2 text-teal-800'
              : 'border-transparent'
          }`}>Lambswool Dusters</Link
        >
        <Link
          handleClick={() => (showNavMobile = false)}
          href="/products/feathers"
          customClass={`py-4 flex items-center hover:border-teal-800 hover:text-teal-800 border-b-2 transition-all ${
            $page.url.pathname.includes('feathers')
              ? 'border-teal-800 border-b-2 text-teal-800'
              : 'border-transparent'
          }`}>Feathers</Link
        >
        <Link
          handleClick={() => (showNavMobile = false)}
          href="/products/eggshells"
          customClass={`py-4 flex items-center hover:border-teal-800 hover:text-teal-800 border-b-2 transition-all ${
            $page.url.pathname.includes('eggshells')
              ? 'border-teal-800 border-b-2 text-teal-800'
              : 'border-transparent'
          }`}>Eggshells</Link
        >
        <Link
          handleClick={() => (showNavMobile = false)}
          href="/products/janitorial-bulk"
          customClass={`py-4 flex items-center hover:border-teal-800 hover:text-teal-800 border-b-2 transition-all ${
            $page.url.pathname.includes('janitorial-bulk')
              ? 'border-teal-800 border-b-2 text-teal-800'
              : 'border-transparent'
          }`}>Bulk Orders</Link
        >
        <Link
          handleClick={() => (showNavMobile = false)}
          href="/cart"
          customClass={`py-4 flex items-center hover:border-teal-800 hover:text-teal-800 border-b-2 transition-all ${
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
  {:else}
    <p class="bg-stone-950 p-2 text-center text-xs uppercase tracking-[0.18em] text-[#f2d58b]">
      Trade pricing available · free delivery over $950
    </p>
    <div
      class="grid w-full grid-cols-2 border-b border-stone-200/80 bg-white/90 px-5 shadow-[0_12px_35px_rgba(28,25,23,0.05)] sm:px-8 lg:grid-cols-4"
    >
      <Link href="/" customClass="max-w-min">
        <img
          src={ImageLogo}
          alt="Noureddine Feathers"
          class="h-[72px] w-[128px] max-w-min"
          width=""
          height=""
        />
      </Link>
      <div class="flex items-center self-center justify-self-end lg:hidden">
        <Button
          handleClick={() => (showNavMobile = true)}
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
      <div class="hidden lg:col-span-2 lg:flex lg:justify-self-center">
        <div class="flex flex-col text-center lg:flex-row">
          <Link
            href="/products/feather-dusters"
            customClass={`px-4 flex items-center hover:border-teal-800 hover:text-teal-800 border-b-2 transition-all ${
              $page.url.pathname.includes('feather-dusters')
                ? 'border-teal-800 border-b-2 text-teal-800'
                : 'border-transparent'
            }`}>Feather Dusters</Link
          >
          <Link
            href="/products/lambswool-dusters"
            customClass={`px-4 flex items-center hover:border-teal-800 hover:text-teal-800 border-b-2 transition-all ${
              $page.url.pathname.includes('lambswool-dusters')
                ? 'border-teal-800 border-b-2 text-teal-800'
                : 'border-transparent'
            }`}>Lambswool Dusters</Link
          >
          <Link
            href="/products/feathers"
            customClass={`px-4 flex items-center hover:border-teal-800 hover:text-teal-800 border-b-2 transition-all ${
              $page.url.pathname.includes('feathers')
                ? 'border-teal-800 border-b-2 text-teal-800'
                : 'border-transparent'
            }`}>Feathers</Link
          >
          <Link
            href="/products/eggshells"
            customClass={`px-4 flex items-center hover:border-teal-800 hover:text-teal-800 border-b-2 transition-all ${
              $page.url.pathname.includes('eggshells')
                ? 'border-teal-800 border-b-2 text-teal-800'
                : 'border-transparent'
            }`}>Eggshells</Link
          >
          <Link
            href="/products/janitorial-bulk"
            customClass={`px-4 flex items-center hover:border-teal-800 hover:text-teal-800 border-b-2 transition-all ${
              $page.url.pathname.includes('janitorial-bulk')
                ? 'border-teal-800 border-b-2 text-teal-800'
                : 'border-transparent'
            }`}>Bulk Orders</Link
          >
        </div>
      </div>
      <div class="hidden lg:flex lg:justify-self-end">
        <div class="flex flex-col text-center lg:flex-row">
          <Link
            href="/cart"
            customClass={`px-4 flex items-center hover:border-teal-800 hover:text-teal-800 border-b-2 transition-all ${
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
  {/if}
</nav>
