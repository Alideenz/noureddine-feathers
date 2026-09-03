<!-- @format -->
<script lang="ts">
  import { page } from '$app/stores';

  // components
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';

  let reviews: string[] = [];
</script>

<svelte:head>
  <title>Reviews | Noureddine Feathers</title>
  <meta
    name="description"
    content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex flex-col gap-8 p-8 lg:w-1/2">
  <Heading>Reviews</Heading>
  {#if $page.data.session}
    <div class="flex flex-col gap-8">
      {#if reviews.length === 0}
        <p>You have no reviews.</p>
      {:else}
        {#each reviews as review}
          <div class="flex gap-8 rounded bg-neutral-100 p-4">{review}</div>
        {/each}
      {/if}
    </div>
  {:else}
    <Link href="/account/sign-in">Sign In</Link>
  {/if}
</div>
