<!-- @format -->
<script lang="ts">
  import ProductsTemplate from '$templates/ProductsTemplate.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Feather Dusters | Noureddine Feathers</title>
  <meta
    name="description"
    content="Feather Dusters | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<ProductsTemplate heading="Feather Dusters" {data} />
