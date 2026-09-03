<!-- @format -->
<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';
  import Divider from '$components/Divider.svelte';

  // components
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';
</script>

<div class="flex flex-col gap-8 p-8 lg:w-1/2">
  <Heading>Account</Heading>
  {#if $page.data.session}
    <div class="flex flex-col gap-4">
      <Link
        href="/account/orders"
        customClass="hover:underline transition-all self-start">Orders</Link
      >
      <Link
        href="/account/reviews"
        customClass="hover:underline transition-all self-start">Reviews</Link
      >
      <Link
        href="/account/profile"
        customClass="hover:underline transition-all self-start">Profile</Link
      >
      <Link
        href="/account/privacy-and-security"
        customClass="hover:underline transition-all self-start"
        >Privacy and Security</Link
      >
    </div>
    <Divider />
    <Button
      customClass="bg-sky-400 hover:bg-sky-500 transition-all px-8 py-4 rounded-full text-white self-start"
      handleClick={async () => await $page.data.supabase?.auth.signOut()}
    >
      Sign Out
    </Button>
  {:else}
    <Link href="/account/sign-in">Sign In</Link>
  {/if}
</div>
