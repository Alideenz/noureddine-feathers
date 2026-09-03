<!-- @format -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';

  // components
  import Heading from '$components/Heading.svelte';
  import Button from '$components/Button.svelte';
  import Link from '$components/Link.svelte';

  let isLoading = false;
  let formResponse: any;
</script>

<svelte:head>
  <title>Sign In | Noureddine Feathers</title>
  <meta
    name="description"
    content="Sign In | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex w-full flex-col gap-8 p-8 lg:w-1/2">
  <Heading>Sign In</Heading>
  {#if $page.data.session}
    <p>You are signed in!</p>
  {:else if formResponse?.success === true}
    <div class="flex flex-col gap-8">
      <p>{formResponse?.message}</p>
    </div>
  {:else}
    <form
      method="post"
      use:enhance={() => {
        isLoading = true;

        return async ({ result }) => {
          if (result.type === 'success' || result.type === 'failure') {
            formResponse = result.data;
            isLoading = false;
          } else {
            isLoading = false;
          }
        };
      }}
      class="nf-panel flex flex-col gap-8 p-5"
    >
      <div class="flex flex-col gap-4">
        <label
          for="email"
          class={`${formResponse?.success === false ? 'text-rose-500' : ''}`}
          >* Email</label
        >
        <input
          id="email"
          name="email"
          autoComplete="off"
          value={formResponse?.email ?? ''}
          class={`${
            formResponse?.success === false ? 'border-rose-500' : 'border-white'
          } box-border w-full rounded border-2 p-3`}
          placeholder="Email"
        />
      </div>
      {#if formResponse?.success === false}
        <p class="text-rose-500">{formResponse?.message}</p>
      {/if}
      <Button
        customClass="disabled:opacity-25 bg-teal-800 text-white px-8 py-4 hover:bg-teal-700 transition-all rounded-full"
        type="submit"
        disabled={isLoading}>Sign In</Button
      >
      <p>
        By signing in, you agree to our <Link
          customClass="hover:underline transition-all"
          href="/info/terms-of-service">Terms of Service.</Link
        >
      </p>
    </form>
  {/if}
</div>
