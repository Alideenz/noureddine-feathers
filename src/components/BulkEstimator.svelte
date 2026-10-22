<script lang="ts">
  import { ArrowUpRight, Minus, Plus } from 'lucide-svelte';
  import {
    bulkDusters,
    clampDozens,
    estimateBulkLine,
    getBulkTier,
  } from '$helpers/bulk-order';
  import { formatCurrency } from '$helpers/helpers';
  let category = 'Feather dusters';
  let selectedId = 'ostrich-16';
  let color = 'Black';
  let dozens = 12;
  $: options = bulkDusters.filter((duster) => duster.category === category);
  $: if (!options.some((duster) => duster.id === selectedId))
    selectedId = options[0].id;
  $: selected = bulkDusters.find((duster) => duster.id === selectedId)!;
  $: if (!selected.colors.some((item) => item.label === color))
    color = selected.colors[0].label;
  $: tier = getBulkTier(selected, dozens);
  $: estimate = estimateBulkLine(selected, dozens);
  $: builderHref = `/products/janitorial-bulk?style=${selectedId}&color=${encodeURIComponent(
    color
  )}&dozens=${dozens}`;
</script>

<section
  id="bulk-estimator"
  class="estimator-section"
  aria-labelledby="estimator-title"
>
  <div class="nf-page estimator-layout">
    <div class="estimator-copy">
      <p class="section-index">
        02 &nbsp; / &nbsp; For cleaning teams &amp; trade buyers
      </p>
      <h2 class="nf-display" id="estimator-title">
        Plan your<br />next order.
      </h2>
      <p>
        Choose a duster and check the estimated cost. Need different sizes or
        colors? Add them to a mixed order and send us your quote request.
      </p>
      <a href="/products/janitorial-bulk" class="estimator-link"
        >Start a mixed order <ArrowUpRight size={18} aria-hidden="true" /></a
      >
      <div class="bulk-facts">
        <div><strong>12 dozen</strong><span>144 dusters</span></div>
        <div><strong>24 dozen</strong><span>288 dusters</span></div>
        <div><strong>Your mix</strong><span>By size &amp; color</span></div>
      </div>
    </div>
    <div class="estimator-tool">
      <div class="tool-top">
        <h3>Order estimate</h3>
        <span>CAD</span>
      </div>
      <div class="nf-segments" role="group" aria-label="Duster material">
        {#each ['Feather dusters', 'Lambswool dusters'] as option}<button
            class="nf-segment"
            aria-pressed={category === option}
            on:click={() => (category = option)}>{option}</button
          >{/each}
      </div>
      <div class="field-pair">
        <div>
          <label for="estimate-size" class="nf-label">Size &amp; handle</label
          ><select id="estimate-size" class="nf-field" bind:value={selectedId}
            >{#each options as option}<option value={option.id}
                >{option.size}{option.id === 'lambswool-detachable'
                  ? ' + detachable handle'
                  : ''}</option
              >{/each}</select
          >
        </div>
        <div>
          <label for="estimate-color" class="nf-label">Color</label><select
            id="estimate-color"
            class="nf-field"
            bind:value={color}
            >{#each selected.colors as option}<option value={option.label}
                >{option.label}</option
              >{/each}</select
          >
        </div>
      </div>
      <div class="quantity-label">
        <label for="estimate-dozens" class="nf-label">Quantity in dozens</label
        ><span>{dozens * 12} dusters</span>
      </div>
      <div class="estimate-quantity">
        <button
          class="nf-icon-button"
          aria-label="Decrease estimate by one dozen"
          disabled={dozens <= 1}
          on:click={() => (dozens = clampDozens(dozens - 1, 1))}
          ><Minus size={16} aria-hidden="true" /></button
        ><input
          id="estimate-dozens"
          type="number"
          min="1"
          max="200"
          class="nf-field"
          value={dozens}
          on:input={(event) =>
            (dozens = clampDozens(Number(event.currentTarget.value), 1))}
        /><button
          class="nf-icon-button"
          aria-label="Increase estimate by one dozen"
          disabled={dozens >= 200}
          on:click={() => (dozens = clampDozens(dozens + 1, 1))}
          ><Plus size={16} aria-hidden="true" /></button
        >
      </div>
      <input
        class="quantity-range"
        type="range"
        min="1"
        max="200"
        step="1"
        bind:value={dozens}
        aria-label="Order quantity in dozens"
        aria-valuetext={`${dozens} dozen, ${dozens * 12} dusters`}
      />
      <div class="estimate-result" aria-live="polite" aria-atomic="true">
        <div>
          <span>Estimated product total</span><strong
            >{formatCurrency(estimate)}</strong
          >
        </div>
        <span>{formatCurrency(tier.total / (tier.dozens * 12))} / duster</span>
      </div>
      <p class="estimate-note">
        Before shipping and tax. Custom quantities are estimates; we confirm
        pricing with your quote.
      </p>
      <a class="nf-button" href={builderHref}
        >Customize this order <ArrowUpRight size={18} aria-hidden="true" /></a
      >
    </div>
  </div>
</section>

<style>
  .estimator-section {
    background: #172820;
    color: #fff;
  }
  .estimator-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    align-items: center;
  }
  .section-index {
    color: #b9d6c6;
    font-size: 12px;
    margin-bottom: 32px;
  }
  h2 {
    font-size: 56px;
    line-height: 1.08;
  }
  .estimator-copy > p:not(.section-index) {
    max-width: 390px;
    color: #cbd8d0;
    margin-top: 26px;
    font-size: 14px;
    line-height: 1.9;
  }
  .estimator-link {
    display: inline-flex;
    gap: 18px;
    align-items: center;
    color: #8fe3b9;
    font-size: 14px;
    font-weight: 600;
    min-height: 44px;
    margin-top: 20px;
  }
  .bulk-facts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    border-top: 1px solid #456052;
    padding-top: 26px;
    margin-top: 36px;
  }
  .bulk-facts strong {
    display: block;
    font-size: 15px;
    font-weight: 500;
  }
  .bulk-facts span {
    display: block;
    margin-top: 6px;
    font-size: 12px;
    color: #b9ccbf;
  }
  .estimator-tool {
    padding: 28px;
    border-radius: 8px;
    background: #fff;
    color: #172820;
  }
  .tool-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .tool-top h3 {
    font-size: 18px;
    font-weight: 600;
  }
  .tool-top > span {
    font-size: 12px;
    color: #52625a;
  }
  .nf-segments {
    margin-bottom: 22px;
  }
  .nf-segment {
    flex: 1;
    padding: 8px;
    font-size: 12px;
  }
  .field-pair {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 16px;
    margin-bottom: 22px;
  }
  .quantity-label {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: flex-start;
  }
  .quantity-label > span {
    font-size: 12px;
    color: #52625a;
  }
  .estimate-quantity {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .estimate-quantity input {
    text-align: center;
    height: 46px;
  }
  .quantity-range {
    width: 100%;
    height: 44px;
    accent-color: #067647;
    cursor: pointer;
  }
  .estimate-result {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-end;
    border-top: 1px solid #dce4df;
    padding-top: 20px;
    margin-top: 5px;
  }
  .estimate-result span {
    font-size: 12px;
    color: #52625a;
  }
  .estimate-result strong {
    display: block;
    margin-top: 5px;
    font-size: 30px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  .estimate-note {
    color: #52625a;
    font-size: 12px;
    line-height: 1.7;
    margin: 14px 0 20px;
  }
  .estimator-tool > .nf-button {
    display: flex;
    width: 100%;
  }
  @media (max-width: 1000px) {
    .estimator-layout {
      gap: 40px;
    }
    h2 {
      font-size: 44px;
    }
  }
  @media (max-width: 750px) {
    .estimator-layout {
      grid-template-columns: 1fr;
      gap: 36px;
    }
    h2 {
      font-size: 40px;
    }
    .section-index {
      margin-bottom: 20px;
    }
    .bulk-facts {
      margin-top: 20px;
    }
    .estimator-tool {
      padding: 20px;
    }
  }
  @media (max-width: 360px) {
    .field-pair {
      grid-template-columns: 1fr;
    }
    .nf-segment {
      font-size: 12px;
    }
  }
</style>
