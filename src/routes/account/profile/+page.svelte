<!-- @format -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  export let data: any;

  // components
  import Heading from '$components/Heading.svelte';
  import Button from '$components/Button.svelte';
  import Subheading from '$components/Subheading.svelte';
  import Link from '$components/Link.svelte';

  let isLoading = false;
  let prevDisplayName = data.userProfile?.display_name;
  let newDisplayName = data.userProfile?.display_name;
  let formResponse: any;

  $: {
    if (formResponse?.success !== undefined)
      setTimeout(() => (formResponse.success = undefined), 2000);
  }
</script>

<svelte:head>
  <title>Profile | Noureddine Feathers</title>
  <meta
    name="description"
    content="Profile | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex flex-col gap-8 p-8 lg:w-1/2">
  <Heading>Profile</Heading>
  {#if $page.data.session}
    <Subheading>Name</Subheading>
    <form
      method="post"
      use:enhance={() => {
        isLoading = true;

        return async ({ result }) => {
          if (result.type === 'success' || result.type === 'failure') {
            formResponse = result.data;
            prevDisplayName = formResponse.displayName;
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
          for="display-name"
          class={`${formResponse?.success === false ? 'text-rose-500' : ''}`}
          >Name</label
        >
        <input
          id="display-name"
          name="display-name"
          autoComplete="off"
          value={newDisplayName}
          on:input={(e) => (newDisplayName = e.currentTarget.value)}
          class={`${
            formResponse?.success === false ? 'border-rose-500' : 'border-white'
          } box-border w-full rounded border-2 p-3`}
          placeholder="Name"
        />
      </div>
      {#if formResponse?.success === false}
        <p class="text-rose-500">{formResponse?.message}</p>
      {:else if formResponse?.success === true}
        <p>{formResponse?.message}</p>
      {/if}
      <Button
        customClass="bg-teal-800 text-white px-8 py-4 hover:bg-teal-700 transition-all rounded-full disabled:opacity-25"
        type="submit"
        disabled={isLoading || newDisplayName === prevDisplayName}
        >Update Name</Button
      >
    </form>
  {:else}
    <Link href="/account/sign-in">Sign In</Link>
  {/if}
</div>
