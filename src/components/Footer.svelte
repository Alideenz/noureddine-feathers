<!-- @format -->
<script lang="ts">
  // components
  import Link from '$components/Link.svelte';

  // lib
  import ImageLogo from '$lib/images/logo.webp';
</script>

<footer class="border-t border-stone-200 bg-stone-950 text-stone-100">
  <div class="nf-page flex flex-col gap-8">
  <Link href="/" customClass="self-start rounded bg-white p-2">
    <img src={ImageLogo} alt="Noureddine Feathers" width="128" height="72" />
  </Link>
  <div class="grid gap-8 lg:grid-cols-[1fr_2fr]">
    <p class="max-w-md leading-7 text-stone-300">
      Handmade feather dusters, natural ostrich feathers, lambswool dusters, and
      decorative eggshells from a family business serving Canada and the United
      States.
    </p>
    <div class="flex flex-col gap-4 self-start sm:flex-row sm:flex-wrap lg:justify-end">
    <Link href="/info/contact" customClass="hover:text-white text-stone-300 transition-all"
      >Contact</Link
    >
    <Link href="/info/about" customClass="hover:text-white text-stone-300 transition-all"
      >About</Link
    >
    <Link href="/info/faq" customClass="hover:text-white text-stone-300 transition-all"
      >FAQ</Link
    >
    <Link href="/info/shipping" customClass="hover:text-white text-stone-300 transition-all"
      >Shipping</Link
    >
    <Link href="/info/returns" customClass="hover:text-white text-stone-300 transition-all"
      >Returns</Link
    >
    <Link
      href="/info/privacy-policy"
      customClass="hover:text-white text-stone-300 transition-all">Privacy Policy</Link
    >
    <Link
      href="/info/terms-of-service"
      customClass="hover:text-white text-stone-300 transition-all">Terms of Service</Link
    >
    </div>
  </div>
  <p class="text-sm text-stone-400">Copyright &copy; 2026 Noureddine Feathers</p>
  </div>
</footer>
