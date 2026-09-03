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

<main class="min-h-screen bg-stone-50">
  <Nav />
  <slot />
  <Footer />
</main>
