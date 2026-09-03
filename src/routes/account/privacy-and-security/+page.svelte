<!-- @format -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  export let data: any;

  // components
  import Heading from '$components/Heading.svelte';
  import Subheading from '$components/Subheading.svelte';
  import Button from '$components/Button.svelte';
  import Link from '$components/Link.svelte';

  let isLoading = false;
  let prevEmail = data.session?.user?.email || '';
  let newEmail = data.session?.user?.email || '';
  let formResponse: any;
  let deleteAccountConfirmation = '';
</script>

<svelte:head>
  <title>Privacy and Security | Noureddine Feathers</title>
  <meta
    name="description"
    content="Privacy and Security | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex flex-col gap-8 p-8 lg:w-1/2">
  <Heading>Privacy and Security</Heading>
  {#if $page.data.session}
    <Subheading>Update Email</Subheading>
    <form
      method="post"
      use:enhance={() => {
        isLoading = true;

        return async ({ result }) => {
          if (result.type === 'success' || result.type === 'failure') {
            formResponse = result.data;
            prevEmail = formResponse.email;
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
          >Email</label
        >
        <input
          id="email"
          name="email"
          autoComplete="off"
          value={newEmail}
          on:input={(e) => (newEmail = e.currentTarget.value)}
          class={`${
            formResponse?.success === false ? 'border-rose-500' : 'border-white'
          } box-border w-full rounded border-2 p-3`}
          placeholder="Email"
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
        disabled={isLoading || newEmail === prevEmail}>Update Email</Button
      >
    </form>
    <Subheading>Delete Account</Subheading>
    <form class="nf-panel flex flex-col gap-8 p-5">
      <div class="flex flex-col gap-4">
        <label
          for="delete-account"
          class={`${formResponse?.success === false ? 'text-rose-500' : ''}`}
          >Please type <span class="montserrat-bold">Delete Account</span> to delete
          your account</label
        >
        <input
          id="delete-account"
          name="delete-account"
          autoComplete="off"
          value={deleteAccountConfirmation}
          on:input={(e) => (deleteAccountConfirmation = e.currentTarget.value)}
          class={`${
            formResponse?.success === false ? 'border-rose-500' : 'border-white'
          } box-border w-full rounded border-2 p-3`}
          placeholder=""
        />
      </div>
      {#if formResponse?.success === false}
        <p class="text-rose-500">{formResponse?.message}</p>
      {:else if formResponse?.success === true}
        <p>{formResponse?.message}</p>
      {/if}
      <Button
        customClass="bg-rose-400 hover:bg-rose-500 transition-all px-8 py-4 rounded-full text-white disabled:opacity-25"
        handleClick={() =>
          (formResponse = {
            success: true,
            message:
              'Please contact us to complete account deletion securely.',
          })}
        disabled={deleteAccountConfirmation !== 'Delete Account'}
      >
        Request Account Deletion
      </Button>
    </form>
  {:else}
    <Link href="/account/sign-in">Sign In</Link>
  {/if}
</div>
