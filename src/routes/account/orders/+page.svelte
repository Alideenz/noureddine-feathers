<!-- @format -->
<script lang="ts">
  export let data: any;

  import { page } from '$app/stores';

  // components
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';
</script>

<svelte:head>
  <title>Orders | Noureddine Feathers</title>
  <meta
    name="description"
    content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex flex-col gap-8 p-8">
  <Heading>Orders</Heading>
  {#if $page.data.session}
    <div class="flex flex-col">
      {#if data.orders.length === 0}
        <p>You have no new orders.</p>
      {:else}
        {#each data.orders as order}
          <div
            class="grid gap-4 border-2 border-transparent p-4 odd:border-neutral-100 even:bg-neutral-100 lg:grid-cols-3"
          >
            <p class="montserrat-bold">#{order.id}</p>
            <p>
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              }).format(new Date(order.created_at))}
            </p>
            <!-- <p class="montserrat-bold">
              {order.tracking_id || 'No Tracking ID'}
            </p> -->
            <div class="flex flex-col gap-4 lg:flex-row lg:justify-self-end">
              <Link
                customClass="self-start hover:underline transition-all"
                href={`/account/orders/${order.id}`}>View Order</Link
              >
              <Link
                customClass="self-start hover:underline transition-all"
                href={order.stripe_receipt_url}>View Receipt</Link
              >
            </div>
          </div>
        {/each}
      {/if}
    </div>
  {:else}
    <Link href="/account/sign-in">Sign In</Link>
  {/if}
</div>
