<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-svelte';
  let moving = false;
  onMount(() => {
    moving = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
</script>

<section class="hero" class:moving aria-labelledby="hero-title">
  <div class="hero-inner">
    <div class="hero-copy">
      <p class="hero-kicker">
        <span /> Vancouver, BC &nbsp; / &nbsp; Est. 1976
      </p>
      <h1 id="hero-title">Noureddine<br /><span>Feathers</span></h1>
      <p class="hero-description">
        Ostrich feather and lambswool dusters.<br /> For your home, your business,
        and your cleaning team.
      </p>
      <div class="hero-actions">
        <a class="nf-button" href="/products/feather-dusters"
          >Shop dusters <ArrowUpRight size={18} aria-hidden="true" /></a
        ><a class="nf-button nf-button-secondary" href="#bulk-estimator"
          >Plan a bulk order <ArrowUpRight size={18} aria-hidden="true" /></a
        >
      </div>
      <p class="hero-note">
        Handmade feather dusters. Canada &amp; US delivery.
      </p>
    </div>
    <div class="product-scene">
      <span class="scene-caption"
        >Natural ostrich feathers<br />Wood handles &middot; Three lengths</span
      >
      <img
        class="duster duster-back"
        src="/products/Premium-Ostrich-Feather-Duster-Premium-Gray-24-inches/0-Premium-Ostrich-Feather-Duster-Premium-Gray-24-inches-1024x1024.webp"
        alt="Gray ostrich feather duster with a long wood handle"
        width="1024"
        height="1024"
      />
      <img
        class="duster duster-front"
        src="/products/Premium-Ostrich-Feather-Duster-Premium-Black-16-inches/0-Premium-Ostrich-Feather-Duster-Premium-Black-16-inches-1024x1024.webp"
        alt="Black ostrich feather duster with a short wood handle"
        width="1024"
        height="1024"
      />
      <div class="scene-bottom">
        <span>16 / 20 / 24 inches</span><button
          class="motion-control"
          on:click={() => (moving = !moving)}
          aria-label={moving
            ? 'Pause product animation'
            : 'Play product animation'}
          aria-pressed={!moving}
          title={moving ? 'Pause animation' : 'Play animation'}
          >{#if moving}<Pause size={15} aria-hidden="true" />{:else}<Play
              size={15}
              aria-hidden="true"
            />{/if}</button
        >
      </div>
    </div>
    <a class="explore-link" href="#collection"
      >Explore the collection <ArrowDown size={15} aria-hidden="true" /></a
    >
  </div>
</section>

<style>
  .hero {
    position: relative;
    background: #eef3ed;
    overflow: hidden;
  }
  .hero-inner {
    position: relative;
    max-width: 1360px;
    margin: auto;
    padding: 72px 48px 54px;
    min-height: 636px;
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    align-items: center;
  }
  .hero-copy {
    position: relative;
    z-index: 2;
    padding-bottom: 40px;
  }
  .hero-kicker {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #52625a;
    font-size: 12px;
    margin-bottom: 30px;
  }
  .hero-kicker span {
    width: 6px;
    height: 6px;
    background: #067647;
    border-radius: 50%;
  }
  h1 {
    font-family: Syne, Inter, sans-serif;
    font-weight: 500;
    font-size: 84px;
    line-height: 1.02;
  }
  h1 span {
    color: #067647;
  }
  .hero-description {
    margin-top: 26px;
    font-size: 16px;
    line-height: 1.85;
    max-width: 460px;
    color: #405148;
  }
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
  }
  .hero-note {
    margin-top: 22px;
    color: #52625a;
    font-size: 12px;
  }
  .product-scene {
    position: relative;
    height: 500px;
    min-width: 0;
  }
  .scene-caption {
    position: absolute;
    z-index: 2;
    right: 10px;
    top: -14px;
    font-size: 12px;
    line-height: 1.7;
    color: #52625a;
    border-left: 1px solid #aabbad;
    padding-left: 16px;
  }
  .duster {
    position: absolute;
    width: 530px;
    max-width: none;
    height: 530px;
    object-fit: contain;
    filter: drop-shadow(0 22px 14px #17282012);
  }
  .duster-back {
    right: -34px;
    top: -28px;
    transform: rotate(-18deg);
  }
  .duster-front {
    right: 128px;
    top: 37px;
    width: 450px;
    height: 450px;
    transform: rotate(-7deg);
  }
  .moving .duster-back {
    animation: back-drift 9s ease-in-out infinite;
  }
  .moving .duster-front {
    animation: front-drift 9s ease-in-out infinite;
  }
  .scene-bottom {
    position: absolute;
    bottom: 18px;
    left: 30px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: #52625a;
  }
  .motion-control {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    border: 1px solid #bdccbf;
    border-radius: 50%;
    background: transparent;
  }
  .motion-control:hover {
    background: #dce9df;
  }
  .explore-link {
    position: absolute;
    bottom: 25px;
    left: 48px;
    display: flex;
    align-items: center;
    gap: 16px;
    min-height: 44px;
    font-size: 12px;
    color: #52625a;
  }
  @keyframes back-drift {
    50% {
      transform: translateY(-12px) rotate(-15deg);
    }
  }
  @keyframes front-drift {
    50% {
      transform: translateY(8px) rotate(-10deg);
    }
  }
  @media (max-width: 1100px) {
    h1 {
      font-size: 64px;
    }
    .hero-inner {
      padding: 60px 32px;
      min-height: 590px;
    }
    .product-scene {
      height: 430px;
    }
    .duster-back {
      width: 440px;
      height: 440px;
      right: -60px;
    }
    .duster-front {
      width: 370px;
      height: 370px;
      right: 65px;
      top: 50px;
    }
    .explore-link {
      left: 32px;
      bottom: 14px;
    }
  }
  @media (max-width: 700px) {
    .hero-inner {
      grid-template-columns: 1fr;
      min-height: 0;
      padding: 36px 20px 50px;
    }
    .hero-copy {
      padding-bottom: 0;
    }
    h1 {
      font-size: 54px;
    }
    .hero-kicker {
      margin-bottom: 22px;
    }
    .hero-description {
      font-size: 14px;
      margin-top: 22px;
    }
    .hero-actions {
      margin-top: 22px;
      gap: 10px;
    }
    .hero-actions a {
      padding: 12px 16px;
      font-size: 12px;
    }
    .hero-note {
      font-size: 12px;
      margin-top: 16px;
    }
    .product-scene {
      height: 285px;
      margin-top: 15px;
    }
    .duster-back {
      width: 340px;
      height: 340px;
      right: -15px;
      top: -24px;
    }
    .duster-front {
      width: 285px;
      height: 285px;
      right: 80px;
      top: 10px;
    }
    .scene-caption {
      top: 20px;
      right: 0;
      font-size: 11px;
    }
    .scene-bottom {
      left: 0;
      bottom: -8px;
      font-size: 12px;
    }
    .explore-link {
      display: none;
    }
  }
  @media (max-width: 360px) {
    h1 {
      font-size: 46px;
    }
    .hero-actions {
      flex-direction: column;
      align-items: flex-start;
    }
    .duster-front {
      right: 40px;
    }
  }
  @media (max-width: 700px) {
    .product-scene {
      height: 225px;
    }
    .scene-caption {
      display: none;
    }
    .duster-back {
      width: 290px;
      height: 290px;
    }
    .duster-front {
      width: 250px;
      height: 250px;
      top: -4px;
    }
  }
  @media (min-width: 701px) and (max-height: 800px) {
    .hero-inner {
      min-height: 500px;
      padding-top: 30px;
      padding-bottom: 50px;
    }
    .product-scene {
      height: 400px;
    }
    .duster-back {
      width: 420px;
      height: 420px;
      right: 0;
    }
    .duster-front {
      width: 350px;
      height: 350px;
      right: 135px;
      top: 30px;
    }
    .hero-kicker {
      margin-bottom: 20px;
    }
    .hero-copy {
      padding-bottom: 20px;
    }
  }
  @media (max-width: 700px) and (max-height: 740px) {
    .hero-inner {
      padding-top: 24px;
      padding-bottom: 24px;
    }
    .hero-kicker {
      margin-bottom: 16px;
    }
    .hero-description,
    .hero-actions {
      margin-top: 16px;
    }
    .hero-note {
      margin-top: 10px;
    }
    .product-scene {
      height: 130px;
      margin-top: 4px;
    }
    .duster-back,
    .scene-caption {
      display: none;
    }
    .duster-front {
      right: 30px;
      top: -40px;
      width: 220px;
      height: 220px;
    }
    .scene-bottom {
      bottom: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .motion-control {
      display: none;
    }
    .moving .duster {
      animation: none;
    }
  }
</style>
