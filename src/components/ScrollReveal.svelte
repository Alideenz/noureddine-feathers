<script lang="ts">
  import { onMount } from 'svelte';
  let element: HTMLDivElement;
  let visible = true;
  onMount(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
      return;
    visible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  });
</script>

<div bind:this={element} class:visible on:focusin={() => (visible = true)}>
  <slot />
</div>

<style>
  div {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 600ms ease, transform 600ms ease;
  }
  div.visible {
    opacity: 1;
    transform: none;
  }
  @media (prefers-reduced-motion: reduce) {
    div {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>
