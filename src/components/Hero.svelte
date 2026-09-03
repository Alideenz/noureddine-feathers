<!-- @format -->
<script lang="ts">
  // lib
  import Link from '$components/Link.svelte';
  import ImageHero from '$lib/images/hero.webp';
</script>

<section class="relative overflow-hidden bg-stone-950">
  <img
    src={ImageHero}
    alt="Natural ostrich feathers"
    class="h-[min(780px,calc(100vh-88px))] min-h-[590px] w-full object-cover opacity-70 saturate-[0.78]"
  />
  <div
    class="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,9,0.90),rgba(12,10,9,0.58)_42%,rgba(12,10,9,0.12)),linear-gradient(0deg,rgba(12,10,9,0.45),transparent_45%)]"
  >
    <div class="nf-page grid h-full items-center gap-10 py-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(340px,0.48fr)]">
      <div class="flex max-w-3xl flex-col gap-7 text-white">
        <p class="nf-eyebrow text-[#f2d58b]">Family made since 1976</p>
        <div class="flex flex-col gap-4">
          <h1 class="nf-display max-w-3xl text-5xl leading-[0.9] sm:text-6xl lg:text-8xl">
            Practical featherwork, made with a collector's eye.
          </h1>
          <p class="max-w-xl text-lg leading-8 text-stone-100">
            Natural farm-raised ostrich feathers, lambswool dusters, decorative
            eggshells, and dependable cleaning tools shipped across Canada and
            the United States.
          </p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/products/feather-dusters"
            customClass="montserrat-bold rounded-full bg-white px-7 py-4 text-center text-stone-950 transition-all hover:bg-[#f2d58b]"
            >Shop Dusters</Link
          >
          <Link
            href="/products/janitorial-bulk"
            customClass="montserrat-bold rounded-full bg-teal-700 px-7 py-4 text-center text-white transition-all hover:bg-teal-600"
            >Bulk Orders</Link
          >
          <Link
            href="/products/feathers"
            customClass="montserrat-bold rounded-full border border-white/60 px-7 py-4 text-center text-white transition-all hover:bg-white hover:text-stone-950"
            >Shop Feathers</Link
          >
        </div>
        <div class="grid max-w-2xl gap-0 border-y border-white/20 text-sm text-stone-100 sm:grid-cols-3">
          <p class="border-white/20 py-4 sm:border-r sm:pr-4">
            Washed and treated natural feathers
          </p>
          <p class="border-white/20 py-4 sm:border-r sm:px-4">
            Free delivery over $950
          </p>
          <p class="py-4 sm:pl-4">Canada and US delivery</p>
        </div>
      </div>
      <div class="hidden justify-self-end lg:block">
        <div class="max-w-sm border border-white/35 bg-stone-950/55 p-5 text-white backdrop-blur">
          <div class="grid grid-cols-2 gap-px bg-white/20">
            <div class="bg-stone-950/80 p-5">
              <p class="nf-display text-5xl text-[#f2d58b]">12+</p>
              <p class="mt-1 text-sm text-stone-300">duster styles</p>
            </div>
            <div class="bg-stone-950/80 p-5">
              <p class="nf-display text-5xl text-[#f2d58b]">50</p>
              <p class="mt-1 text-sm text-stone-300">years of craft</p>
            </div>
            <div class="col-span-2 bg-white p-5 text-stone-950">
              <p class="nf-eyebrow">Commercial supply</p>
              <p class="mt-2 leading-7 text-stone-600">
                Mix ostrich feather and lambswool dusters into 12 dozen, 24
                dozen, or custom janitorial quotes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
