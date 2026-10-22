<script lang="ts">
  import { ArrowUpRight } from 'lucide-svelte';
  import ImageLogo from '$lib/images/logo.webp';
</script>

<footer>
  <div class="nf-page footer-main">
    <div class="footer-brand">
      <a href="/" aria-label="Noureddine Feathers home"
        ><img
          src={ImageLogo}
          alt="Noureddine Feathers"
          width="128"
          height="72"
        /></a
      >
      <p>
        A family business since 1976.<br />Based in Vancouver, British Columbia.
      </p>
      <a href="mailto:info@nprofiles.com" class="contact-link"
        >info@nprofiles.com <ArrowUpRight size={15} aria-hidden="true" /></a
      >
    </div>
    <div class="footer-column">
      <h2>Shop</h2>
      <a href="/products/feather-dusters">Feather dusters</a><a
        href="/products/lambswool-dusters">Lambswool dusters</a
      ><a href="/products/feathers">Feathers</a><a href="/products/eggshells"
        >Eggshells</a
      ><a href="/products/janitorial-bulk">Bulk orders</a>
    </div>
    <div class="footer-column">
      <h2>Good to know</h2>
      <a href="/info/about">About us</a><a href="/info/shipping">Shipping</a><a
        href="/info/returns">Returns</a
      ><a href="/info/faq">Frequently asked questions</a><a href="/info/contact"
        >Contact</a
      >
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; {new Date().getFullYear()} Noureddine Feathers</span>
    <div>
      <span>Prices in CAD</span><a href="/info/privacy-policy">Privacy</a><a
        href="/info/terms-of-service">Terms</a
      >
    </div>
  </div>
</footer>

<style>
  footer {
    border-top: 1px solid #dce4df;
    background: #fff;
  }
  .footer-main {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 48px;
    padding-top: 52px;
    padding-bottom: 52px;
  }
  .footer-brand img {
    width: 128px;
    height: 72px;
    object-fit: contain;
  }
  .footer-brand p {
    margin-top: 18px;
    font-size: 12px;
    color: #52625a;
    line-height: 1.9;
  }
  .contact-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 16px;
    color: #067647;
    font-size: 12px;
    min-height: 44px;
  }
  .footer-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .footer-column h2 {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 14px;
  }
  .footer-column a {
    font-size: 12px;
    color: #52625a;
    padding: 8px 0;
    min-height: 36px;
  }
  a:hover {
    color: #067647;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .footer-bottom {
    border-top: 1px solid #dce4df;
    max-width: 1264px;
    margin: auto;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    font-size: 12px;
    color: #52625a;
  }
  .footer-bottom > div {
    display: flex;
    gap: 26px;
  }
  @media (max-width: 1360px) {
    .footer-bottom {
      margin-inline: 48px;
    }
  }
  @media (max-width: 700px) {
    .footer-main {
      grid-template-columns: 1fr 1fr;
      gap: 28px;
    }
    .footer-brand {
      grid-column: 1 / -1;
    }
    .footer-bottom {
      margin-inline: 20px;
      flex-direction: column;
      padding: 20px 0;
    }
  }
</style>
