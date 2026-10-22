<script lang="ts">
  import { page } from '$app/stores';
  import { tick } from 'svelte';
  import { ArrowUpRight, Menu, ShoppingBag, X } from 'lucide-svelte';
  import { cart } from '$stores/CartStore';
  import ImageLogo from '$lib/images/logo.webp';

  const links = [
    {
      href: '/products/feather-dusters',
      label: 'Feather dusters',
      note: '16, 20 & 24 inches',
    },
    {
      href: '/products/lambswool-dusters',
      label: 'Lambswool dusters',
      note: 'Standard & extendable',
    },
    {
      href: '/products/feathers',
      label: 'Feathers',
      note: 'Natural ostrich feathers',
    },
    {
      href: '/products/eggshells',
      label: 'Eggshells',
      note: 'Hand-decorated pieces',
    },
  ];
  let showMenu = false;
  let previousPath = $page.url.pathname;
  let menuButton: HTMLButtonElement;
  let menuPanel: HTMLElement;
  const isActive = (href: string) =>
    $page.url.pathname === href || $page.url.pathname.startsWith(`${href}/`);
  const closeMenu = async (restoreFocus = false) => {
    showMenu = false;
    if (restoreFocus) {
      await tick();
      menuButton?.focus();
    }
  };
  const toggleMenu = async () => {
    showMenu = !showMenu;
    if (showMenu) {
      await tick();
      menuPanel?.querySelector<HTMLAnchorElement>('a')?.focus();
    }
  };
  const handleKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && showMenu) closeMenu(true);
  };
  const outsideClick = (event: MouseEvent) => {
    if (
      showMenu &&
      !menuPanel?.contains(event.target as Node) &&
      !menuButton?.contains(event.target as Node)
    )
      closeMenu();
  };
  $: if ($page.url.pathname !== previousPath) {
    previousPath = $page.url.pathname;
    closeMenu();
  }
</script>

<svelte:window
  on:keydown={handleKey}
  on:pointerdown={outsideClick}
  on:resize={() => {
    if (window.innerWidth >= 1100) closeMenu();
  }}
/>

<header class="site-header">
  <div class="announcement">
    <span>Family business since 1976</span><a href="/info/shipping"
      >Free delivery on orders over CA$950 <ArrowUpRight
        size={13}
        aria-hidden="true"
      /></a
    >
  </div>
  <nav class="nav-inner" aria-label="Main navigation">
    <a href="/" class="brand" aria-label="Noureddine Feathers home"
      ><img
        src={ImageLogo}
        alt="Noureddine Feathers"
        width="125"
        height="68"
      /></a
    >
    <div class="desktop-links">
      {#each links as link}<a
          href={link.href}
          aria-current={isActive(link.href) ? 'page' : undefined}
          >{link.label}</a
        >{/each}
    </div>
    <div class="nav-actions">
      <a
        href="/products/janitorial-bulk"
        class="bulk-link"
        aria-current={isActive('/products/janitorial-bulk')
          ? 'page'
          : undefined}
        >Bulk orders <ArrowUpRight size={16} aria-hidden="true" /></a
      >
      <a
        href="/cart"
        class="cart-link"
        aria-label={`Cart, ${$cart.cartTotalItems} items`}
        ><ShoppingBag size={19} strokeWidth={1.6} aria-hidden="true" /><span
          >{$cart.cartTotalItems}</span
        ></a
      >
      <button
        class="nf-icon-button menu-toggle"
        bind:this={menuButton}
        on:click={toggleMenu}
        aria-expanded={showMenu}
        aria-controls="mobile-menu"
        aria-label={showMenu ? 'Close navigation' : 'Open navigation'}
        >{#if showMenu}<X size={21} aria-hidden="true" />{:else}<Menu
            size={21}
            aria-hidden="true"
          />{/if}</button
      >
    </div>
    {#if showMenu}
      <div id="mobile-menu" class="mobile-menu" bind:this={menuPanel}>
        <p class="menu-heading">Shop Noureddine Feathers</p>
        {#each links as link}<a
            href={link.href}
            on:click={() => closeMenu()}
            aria-current={isActive(link.href) ? 'page' : undefined}
            ><span>{link.label}<small>{link.note}</small></span><ArrowUpRight
              size={18}
              aria-hidden="true"
            /></a
          >{/each}
        <a
          href="/products/janitorial-bulk"
          class="mobile-bulk"
          on:click={() => closeMenu()}
          ><span>Bulk orders<small>Build a mixed-dozen quote</small></span
          ><ArrowUpRight size={18} aria-hidden="true" /></a
        >
        <a href="/info/contact" on:click={() => closeMenu()}
          >Contact us <ArrowUpRight size={18} aria-hidden="true" /></a
        >
      </div>
    {/if}
  </nav>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: #fff;
    border-bottom: 1px solid #dce4df;
  }
  .announcement {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 8px max(24px, calc((100vw - 1264px) / 2));
    background: #172820;
    color: #e6eee8;
    font-size: 12px;
  }
  .announcement a {
    display: inline-flex;
    align-items: center;
    gap: 7px;
  }
  .nav-inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1360px;
    min-height: 86px;
    margin: auto;
    padding: 8px 48px;
    gap: 24px;
  }
  .brand {
    flex-shrink: 0;
  }
  .brand img {
    width: 112px;
    height: 60px;
    object-fit: contain;
  }
  .desktop-links {
    display: flex;
    align-items: center;
    gap: 27px;
  }
  .desktop-links a {
    font-size: 14px;
    font-weight: 500;
    padding: 15px 0;
  }
  .desktop-links a:hover,
  a[aria-current='page'] {
    color: #067647;
    text-decoration: underline;
    text-underline-offset: 7px;
  }
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .bulk-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    color: #067647;
    font-weight: 600;
    font-size: 14px;
  }
  .cart-link {
    display: flex;
    align-items: center;
    gap: 9px;
    min-height: 44px;
    padding: 0 4px;
    font-size: 14px;
  }
  .menu-toggle {
    display: none;
  }
  .mobile-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 20px;
    width: min(360px, calc(100vw - 40px));
    max-height: calc(100dvh - 130px);
    overflow-y: auto;
    padding: 12px;
    border: 1px solid #c7d4cb;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 16px 50px #17282024;
  }
  .menu-heading {
    padding: 8px 12px 14px;
    font-size: 12px;
    color: #52625a;
  }
  .mobile-menu a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
  }
  .mobile-menu a:hover {
    background: #edf2ee;
  }
  .mobile-menu small {
    display: block;
    margin-top: 2px;
    font-weight: 400;
    color: #52625a;
    font-size: 12px;
  }
  .mobile-menu .mobile-bulk {
    background: #e7f4ec;
    margin: 6px 0;
    color: #065b38;
  }
  @media (max-width: 1099px) {
    .desktop-links {
      display: none;
    }
    .menu-toggle {
      display: inline-flex;
    }
    .nav-inner {
      padding: 8px 32px;
    }
  }
  @media (max-width: 600px) {
    .announcement {
      justify-content: center;
      padding: 7px 16px;
    }
    .announcement > span {
      display: none;
    }
    .nav-inner {
      padding: 6px 20px;
      min-height: 76px;
      gap: 16px;
    }
    .brand img {
      width: 100px;
      height: 54px;
    }
    .nav-actions {
      gap: 16px;
    }
    .bulk-link {
      display: none;
    }
  }
</style>
