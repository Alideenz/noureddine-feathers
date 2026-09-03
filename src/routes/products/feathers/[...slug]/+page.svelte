<!-- @format -->
<script lang="ts">
  import ProductTemplate from '$templates/ProductTemplate.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.product.name} | Noureddine Feathers</title>
  <meta
    name="description"
    content={`${data.product.name} | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells`}
  />
</svelte:head>

<ProductTemplate {data} />
