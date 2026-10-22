<!-- @format -->
<script lang="ts">
  // styles
  import './styles.css';

  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, _session: any) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });

  // store
  import { cart } from '$stores/CartStore';

  // components
  import Nav from '$components/Nav.svelte';
  import Footer from '$components/Footer.svelte';

  onMount(() => cart.getCartItems());
</script>

<a class="skip-link" href="#main-content">Skip to content</a>
<div class="min-h-screen bg-white">
  <Nav />
  <main id="main-content" tabindex="-1"><slot /></main>
  <Footer />
</div>

<style>
  .skip-link {
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 100;
    padding: 12px 20px;
    background: #fff;
    color: #172820;
    border: 2px solid #067647;
    transform: translateY(-150%);
  }
  .skip-link:focus {
    transform: translateY(0);
  }
</style>
