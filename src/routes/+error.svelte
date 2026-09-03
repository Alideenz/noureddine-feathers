<!-- @format -->
<script lang="ts">
  // components
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';
</script>

<svelte:head>
  <title>404 Not Found | Noureddine Feathers</title>
  <meta
    name="description"
    content="404 Not Found | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex flex-col gap-8 p-8">
  <Heading>404 Not Found</Heading>
  <p>Oops! We could not find what you were looking for.</p>
  <Link
    href="/"
    customClass="rounded-full px-8 py-4 hover:bg-black hover:text-white transition-all bg-neutral-100 self-start"
    >Continue Shopping</Link
  >
</div>
