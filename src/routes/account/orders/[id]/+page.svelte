<!-- @format -->
<script lang="ts">
  export let data: any;

  import { page } from '$app/stores';

  // components
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';
  import Subheading from '$components/Subheading.svelte';
  import Divider from '$components/Divider.svelte';

  console.log(data.orderProducts);

  // helpers
  import {
    formatPackage,
    formatCurrency,
    formatText,
    formatName,
    getProductDisplaySize,
  } from '$helpers/helpers';
</script>

<svelte:head>
  <title>Order | Noureddine Feathers</title>
  <meta
    name="description"
    content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex flex-col gap-8 p-8">
  <Heading>Order</Heading>
  {#if $page.data.session}
    <div class="flex flex-col gap-4">
      <Subheading>Order Number</Subheading>
      <p class="montserrat-bold">#{data.orderProducts[0].order.id}</p>
    </div>
    <div class="flex flex-col gap-4">
      <Subheading>Date</Subheading>
      <p>
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date(data.orderProducts[0].order.created_at))}
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <Subheading>Shipping Address</Subheading>
      <div>
        <p>{data.orderProducts[0].order.shipping_address_line1}</p>
        {#if data.orderProducts[0].order.shipping_address_line2}
          <p>{data.orderProducts[0].order.shipping_address_line2}</p>
        {/if}
        <p>
          {data.orderProducts[0].order.shipping_address_city}, {data
            .orderProducts[0].order.shipping_address_state}, {data
            .orderProducts[0].order.shipping_address_country}
          {data.orderProducts[0].order.shipping_address_postal_code}
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <Subheading>Shipped By</Subheading>
      <p>Canada Post</p>
    </div>
    <div class="flex flex-col gap-4">
      <Subheading>Shipping Service</Subheading>
      <p>Registered Mail</p>
    </div>
    <div class="flex flex-col gap-4">
      <Subheading>Receipt</Subheading>
      <Link
        customClass="self-start hover:underline transition-all"
        href={data.orderProducts[0].order.stripe_receipt_url}>View Receipt</Link
      >
    </div>
    <!-- <div>
        <Subheading>Tracking ID</Subheading>
        {#if data.orderProducts[0].order.is_fulfilled}
          <p>{data.orderProducts[0].order.tracking_id}</p>
        {:else}
          <p>No Tracking ID</p>
        {/if}
      </div> -->
    <Subheading>Products ({data.orderProducts.length})</Subheading>
    <div class="flex flex-col gap-8">
      {#each data.orderProducts as orderProduct, index}
        <div class="flex flex-col gap-8 sm:flex-row">
          <div class="self-start bg-neutral-100">
            <Link
              href={`/products/${formatText(
                orderProduct.stripe_product_id.category
              )}/${orderProduct.stripe_product_id.id}-${formatText(
                orderProduct.stripe_product_id.name
              )}-${formatText(orderProduct.stripe_product_id.color)}-${
                orderProduct.stripe_product_id.size || ''
              }-${formatText(orderProduct.stripe_product_id.size_unit) || ''}`}
            >
              <img
                src={`/products/${formatName(
                  orderProduct.stripe_product_id.name,
                  orderProduct.stripe_product_id.color,
                  orderProduct.stripe_product_id.size,
                  orderProduct.stripe_product_id.size_unit
                )}/0-${formatName(
                  orderProduct.stripe_product_id.name,
                  orderProduct.stripe_product_id.color,
                  orderProduct.stripe_product_id.size,
                  orderProduct.stripe_product_id.size_unit
                )}-1024x1024.webp`}
                alt={orderProduct.stripe_product_id.name}
                width=""
                height=""
                class="rounded object-contain p-2 transition-all hover:scale-110 sm:max-w-[200px]"
              />
            </Link>
          </div>
          <div class="flex w-full flex-col gap-8">
            <p>
              {orderProduct.stripe_product_id.name} - {orderProduct
                .stripe_product_id.color}
              {getProductDisplaySize(orderProduct.stripe_product_id)
                ? `- ${getProductDisplaySize(orderProduct.stripe_product_id)}`
                : ''}
            </p>
            <div class="flex flex-col gap-8 lg:grid lg:grid-cols-3">
              <div class="flex gap-8 lg:flex-col lg:gap-8">
                <p class="flex flex-grow">Package</p>
                <p>{formatPackage(orderProduct.stripe_price_id.quantity)}</p>
              </div>
              <div class="flex gap-8 lg:flex-col lg:gap-8">
                <p class="flex flex-grow">Price</p>
                <p class="montserrat-bold">
                  {formatCurrency(
                    orderProduct.stripe_price_id.price * orderProduct.quantity
                  )}
                </p>
              </div>
              <div class="flex gap-8 lg:flex-col lg:gap-8">
                <p class="flex flex-grow items-center">Quantity</p>
                <p>{orderProduct.quantity}</p>
              </div>
            </div>
          </div>
        </div>
        {#if index !== data.orderProducts.length - 1}
          <Divider />
        {/if}
      {/each}
    </div>
  {:else}
    <Link href="/account/sign-in">Sign In</Link>
  {/if}
</div>
