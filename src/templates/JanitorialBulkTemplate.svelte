<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { page } from '$app/stores';
  import {
    ArrowLeft,
    ArrowUpRight,
    Check,
    Copy,
    Mail,
    Minus,
    Package,
    Plus,
    RotateCcw,
  } from 'lucide-svelte';
  import {
    bulkDusters,
    clampDozens,
    estimateBulkLine,
    getBulkImage,
    getPresetQuantities,
    selectionKey,
  } from '$helpers/bulk-order';
  import { formatCurrency } from '$helpers/helpers';

  let preset = '12-dozen';
  let quantities = getPresetQuantities(preset);
  let category = 'All dusters';
  let companyName = '';
  let contactName = '';
  let email = '';
  let phone = '';
  let notes = '';
  let copied = false;
  let copyError = '';
  let copyReset: ReturnType<typeof setTimeout>;
  let showContact = false;
  let activeColors: Record<string, string> = Object.fromEntries(
    bulkDusters.map((duster) => [duster.id, duster.colors[0].label])
  );
  const setPreset = (value: string) => {
    preset = value;
    quantities = getPresetQuantities(value);
    activeColors = Object.fromEntries(
      bulkDusters.map((duster) => [duster.id, duster.colors[0].label])
    );
    copied = false;
  };
  const openContact = async () => {
    showContact = true;
    await tick();
    document.getElementById('quote-name')?.focus();
  };
  const setQuantity = (id: string, color: string, value: number) => {
    preset = 'custom';
    quantities = {
      ...quantities,
      [selectionKey(id, color)]: clampDozens(value),
    };
    activeColors = { ...activeColors, [id]: color };
    copied = false;
  };
  const adjust = (id: string, color: string, amount: number) =>
    setQuantity(id, color, (quantities[selectionKey(id, color)] || 0) + amount);
  $: visibleDusters = bulkDusters.filter(
    (duster) => category === 'All dusters' || category === duster.category
  );
  $: lines = bulkDusters.flatMap((duster) =>
    duster.colors
      .map((color) => ({
        duster,
        color,
        dozens: quantities[selectionKey(duster.id, color.label)] || 0,
      }))
      .filter((line) => line.dozens > 0)
  );
  $: totalDozens = lines.reduce((sum, line) => sum + line.dozens, 0);
  $: estimatedTotal =
    Math.round(
      lines.reduce(
        (sum, line) => sum + estimateBulkLine(line.duster, line.dozens),
        0
      ) * 100
    ) / 100;
  $: quoteBody = [
    'Janitorial bulk duster quote request',
    '',
    `Company: ${companyName}`,
    `Contact: ${contactName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    '',
    ...lines.map(
      (line) =>
        `${line.dozens} dozen - ${line.duster.name}, ${line.duster.size}, ${
          line.color.label
        }: ${formatCurrency(
          estimateBulkLine(line.duster, line.dozens)
        )} estimated`
    ),
    '',
    `Total: ${totalDozens} dozen / ${totalDozens * 12} dusters`,
    `Estimated product total: ${formatCurrency(
      estimatedTotal
    )} CAD, before shipping and tax`,
    '',
    `Delivery details and notes: ${notes}`,
    '',
    'Please confirm pricing, availability and delivery.',
  ].join('\n');
  $: mailtoHref = `mailto:info@nprofiles.com?subject=${encodeURIComponent(
    'Janitorial bulk duster quote'
  )}&body=${encodeURIComponent(quoteBody)}`;
  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(quoteBody);
      copied = true;
      copyError = '';
      clearTimeout(copyReset);
      copyReset = setTimeout(() => (copied = false), 4000);
    } catch {
      copyError =
        'Copy is unavailable. Use the email option or contact info@nprofiles.com.';
    }
  };
  onMount(() => {
    const id = $page.url.searchParams.get('style');
    const requestedColor = $page.url.searchParams.get('color');
    const duster = bulkDusters.find((item) => item.id === id);
    if (duster) {
      const color =
        duster.colors.find((item) => item.label === requestedColor)?.label ||
        duster.colors[0].label;
      quantities = {
        [selectionKey(duster.id, color)]: clampDozens(
          Number($page.url.searchParams.get('dozens')),
          1
        ),
      };
      preset = 'custom';
      activeColors = { ...activeColors, [duster.id]: color };
    }
    return () => clearTimeout(copyReset);
  });
</script>

<section class="bulk-intro">
  <div class="nf-page">
    <a class="back-link" href="/"
      ><ArrowLeft size={14} aria-hidden="true" /> Back to the shop</a
    >
    <div class="bulk-heading">
      <div>
        <p class="nf-eyebrow">
          For janitorial teams, businesses &amp; trade buyers
        </p>
        <h1 class="nf-display">Your bulk duster order.</h1>
        <p>
          Mix feather and lambswool dusters by size and color.<br />Choose a
          starting quantity, adjust the mix, and request a quote.
        </p>
      </div>
      <div class="intro-count" aria-live="polite">
        <strong>{totalDozens}</strong><span
          >dozen selected<br />{totalDozens * 12} dusters</span
        >
      </div>
    </div>
  </div>
</section>

<div class="nf-page bulk-layout">
  <section class="bulk-options" aria-labelledby="build-title">
    <div class="builder-heading">
      <h2 id="build-title">1. Choose your mix</h2>
      <button class="reset-button" on:click={() => setPreset('custom')}
        ><RotateCcw size={14} aria-hidden="true" /> Clear quantities</button
      >
    </div>
    <div class="preset-grid" role="group" aria-label="Starting order quantity">
      {#each [{ id: '12-dozen', label: '12 dozen', detail: '144 dusters' }, { id: '24-dozen', label: '24 dozen', detail: '288 dusters' }, { id: 'custom', label: 'Custom mix', detail: 'Start from zero' }] as option}
        <button
          class:chosen={preset === option.id}
          aria-pressed={preset === option.id}
          on:click={() => setPreset(option.id)}
          ><span class="preset-radio"
            >{#if preset === option.id}<Check
                size={12}
                aria-hidden="true"
              />{/if}</span
          ><span
            ><strong>{option.label}</strong><small>{option.detail}</small></span
          ></button
        >
      {/each}
    </div>
    <div class="option-toolbar">
      <div class="nf-segments" role="group" aria-label="Filter duster types">
        {#each ['All dusters', 'Feather dusters', 'Lambswool dusters'] as option}<button
            class="nf-segment"
            aria-pressed={category === option}
            on:click={() => (category = option)}>{option}</button
          >{/each}
      </div>
      <span>Quantities in dozens</span>
    </div>
    <div class="duster-list">
      {#each visibleDusters as duster}
        <article class="duster-row" aria-labelledby={`title-${duster.id}`}>
          <div class="duster-info">
            <div class="duster-thumb">
              {#if getBulkImage(duster, activeColors[duster.id])}<img
                  src={getBulkImage(duster, activeColors[duster.id])}
                  alt={`${activeColors[duster.id]} ${duster.name}, ${
                    duster.size
                  }`}
                  width="100"
                  height="100"
                  loading="lazy"
                />{:else}<Package
                  size={30}
                  strokeWidth={1}
                  aria-hidden="true"
                /><span>Quote only</span>{/if}
            </div>
            <div class="duster-description">
              <h3 id={`title-${duster.id}`}>{duster.name}</h3>
              <p class="duster-size">
                {duster.size} <span>/ {duster.handle}</span>
              </p>
              <p class="duster-use">{duster.bestFor}</p>
              <div class="tier-list">
                {#each duster.priceTiers as tier}<span
                    >{tier.dozens} dz.
                    <strong>{formatCurrency(tier.total)}</strong></span
                  >{/each}
              </div>
            </div>
          </div>
          <div class="color-quantities">
            {#each duster.colors as color}
              {@const quantity =
                quantities[selectionKey(duster.id, color.label)] || 0}
              <div class="color-quantity" class:has-quantity={quantity > 0}>
                <label for={`${duster.id}-${color.label}`}
                  ><span
                    class="nf-swatch"
                    style:background-color={color.hex}
                  />{color.label}</label
                >
                <div class="quantity-stepper">
                  <button
                    aria-label={`Decrease ${duster.size} ${color.label} ${duster.name} by one dozen`}
                    disabled={quantity === 0}
                    on:click={() => adjust(duster.id, color.label, -1)}
                    ><Minus size={14} aria-hidden="true" /></button
                  ><input
                    id={`${duster.id}-${color.label}`}
                    aria-label={`${duster.size} ${color.label} ${duster.name} dozens`}
                    type="number"
                    min="0"
                    max="200"
                    step="1"
                    value={quantity}
                    on:input={(event) =>
                      setQuantity(
                        duster.id,
                        color.label,
                        Number(event.currentTarget.value)
                      )}
                  /><button
                    aria-label={`Increase ${duster.size} ${color.label} ${duster.name} by one dozen`}
                    disabled={quantity >= 200}
                    on:click={() => adjust(duster.id, color.label, 1)}
                    ><Plus size={14} aria-hidden="true" /></button
                  >
                </div>
              </div>
            {/each}
          </div>
        </article>
      {/each}
    </div>
    <p class="builder-note">
      Amounts are product estimates before shipping and tax. Published pack
      rates are used to estimate custom quantities; final pricing is confirmed
      with your quote.
    </p>
  </section>

  <aside
    class="quote-summary"
    class:editing={showContact}
    aria-labelledby="summary-title"
  >
    <div class="summary-top">
      <h2 id="summary-title">2. Review your order</h2>
      <span>CAD</span>
    </div>
    <div class="summary-total" aria-live="polite" aria-atomic="true">
      <span>Estimated product total</span><strong
        >{formatCurrency(estimatedTotal)}</strong
      >
      <p>{totalDozens} dozen <span>/</span> {totalDozens * 12} dusters</p>
    </div>
    <!-- The scrollable order list needs a keyboard focus target. -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div
      class="summary-lines"
      tabindex="0"
      role="region"
      aria-label="Selected duster quantities"
    >
      {#each lines as line}<div>
          <div>
            <span
              class="nf-swatch"
              style:background-color={line.color.hex}
            /><span
              >{line.duster.size}
              {line.duster.category === 'Feather dusters'
                ? 'ostrich'
                : line.duster.id === 'lambswool-detachable'
                ? 'detachable'
                : 'lambswool'}<small
                >{line.color.label} &middot; {line.dozens} dz.</small
              ></span
            >
          </div>
          <strong
            >{formatCurrency(
              estimateBulkLine(line.duster, line.dozens)
            )}</strong
          >
        </div>{/each}
      {#if !lines.length}<p class="empty-order">
          Your order is empty. Add a quantity beside a color, or choose a
          starting mix.
        </p>{/if}
    </div>
    <p class="summary-disclaimer">
      Shipping, taxes and availability are confirmed with your quote.
    </p>
    {#if !showContact}<button
        class="nf-button"
        disabled={!lines.length}
        on:click={openContact}
        >Add contact details <ArrowUpRight
          size={17}
          aria-hidden="true"
        /></button
      >{/if}
    {#if showContact}
      <form
        action={mailtoHref}
        method="get"
        on:submit|preventDefault={() => {
          window.location.href = mailtoHref;
        }}
      >
        <h3>Your contact details</h3>
        <label class="nf-label" for="quote-company"
          >Company <span>(optional)</span></label
        ><input
          class="nf-field"
          id="quote-company"
          autocomplete="organization"
          bind:value={companyName}
        />
        <label class="nf-label" for="quote-name">Contact name</label><input
          class="nf-field"
          id="quote-name"
          autocomplete="name"
          required
          bind:value={contactName}
        />
        <label class="nf-label" for="quote-email">Email</label><input
          class="nf-field"
          id="quote-email"
          type="email"
          autocomplete="email"
          required
          bind:value={email}
        />
        <label class="nf-label" for="quote-phone"
          >Phone <span>(optional)</span></label
        ><input
          class="nf-field"
          id="quote-phone"
          type="tel"
          autocomplete="tel"
          bind:value={phone}
        />
        <label class="nf-label" for="quote-notes"
          >Delivery details &amp; notes <span>(optional)</span></label
        ><textarea
          class="nf-field"
          id="quote-notes"
          rows="3"
          placeholder="City, delivery date, recurring orders..."
          bind:value={notes}
        />
        <button type="submit" class="nf-button" disabled={!lines.length}
          >Prepare quote email <Mail size={17} aria-hidden="true" /></button
        >
        <p class="email-note">
          Opens your email app with the order details. Send the email to request
          your quote.
        </p>
      </form>
    {/if}
    <button class="copy-button" on:click={copyQuote} disabled={!lines.length}
      >{#if copied}<Check size={15} aria-hidden="true" /> Quote copied{:else}<Copy
          size={15}
          aria-hidden="true"
        /> Copy order details{/if}</button
    >
    <p class="copy-message" role="status">
      {copied ? 'Order details copied to clipboard.' : copyError}
    </p>
    <a class="summary-contact" href="mailto:info@nprofiles.com"
      >info@nprofiles.com</a
    >
  </aside>
</div>

<style>
  .bulk-intro {
    background: #f0f4f0;
    border-bottom: 1px solid #dce4df;
  }
  .bulk-intro .nf-page {
    padding-top: 26px;
    padding-bottom: 44px;
  }
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: #52625a;
    min-height: 44px;
  }
  .bulk-heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 30px;
    margin-top: 16px;
  }
  h1 {
    font-size: 44px;
    line-height: 1.15;
    margin-top: 12px;
  }
  .bulk-heading > div > p:last-child {
    margin-top: 20px;
    color: #52625a;
    font-size: 14px;
    line-height: 1.9;
  }
  .intro-count {
    display: flex;
    gap: 18px;
    align-items: center;
    border-left: 1px solid #bdccbf;
    padding-left: 30px;
    flex-shrink: 0;
  }
  .intro-count strong {
    font-family: Syne, sans-serif;
    font-weight: 500;
    font-size: 58px;
    line-height: 1;
  }
  .intro-count span {
    font-size: 12px;
    color: #52625a;
  }
  .bulk-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 44px;
    padding-top: 40px;
  }
  .bulk-options {
    min-width: 0;
  }
  .builder-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 22px;
  }
  h2 {
    font-size: 16px;
    font-weight: 600;
  }
  .reset-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    font-size: 12px;
    color: #52625a;
  }
  .preset-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .preset-grid button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 12px;
    border: 1px solid #dce4df;
    border-radius: 6px;
    text-align: left;
  }
  .preset-grid button:hover {
    border-color: #067647;
  }
  .preset-grid button.chosen {
    background: #eef7f0;
    border-color: #067647;
  }
  .preset-radio {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    border: 1px solid #819589;
    border-radius: 50%;
  }
  .chosen .preset-radio {
    background: #067647;
    border-color: #067647;
    color: #fff;
  }
  .preset-grid strong {
    display: block;
    font-size: 14px;
    font-weight: 600;
  }
  .preset-grid small {
    display: block;
    font-size: 12px;
    margin-top: 4px;
    color: #52625a;
  }
  .option-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin: 28px 0 22px;
  }
  .option-toolbar > span {
    font-size: 12px;
    color: #52625a;
  }
  .nf-segment {
    font-size: 12px;
    padding: 8px 12px;
  }
  .duster-list {
    border-top: 1px solid #dce4df;
  }
  .duster-row {
    padding: 24px 0;
    border-bottom: 1px solid #dce4df;
  }
  .duster-info {
    display: grid;
    grid-template-columns: 90px minmax(0, 1fr);
    gap: 20px;
    align-items: center;
    margin-bottom: 16px;
  }
  .duster-thumb {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90px;
    background: #f2f5f1;
    border-radius: 4px;
  }
  .duster-thumb img {
    width: 90px;
    height: 90px;
    object-fit: contain;
    padding: 5px;
  }
  .duster-thumb > span {
    font-size: 11px;
    margin-top: 8px;
    color: #52625a;
  }
  h3 {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
  }
  .duster-size {
    color: #067647;
    font-size: 12px;
    font-weight: 500;
    margin-top: 3px;
  }
  .duster-size > span {
    color: #52625a;
    font-size: 12px;
    font-weight: 400;
  }
  .duster-use {
    font-size: 12px;
    color: #52625a;
    margin-top: 5px;
  }
  .tier-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 9px;
    font-size: 12px;
    color: #52625a;
  }
  .tier-list strong {
    color: #172820;
    font-weight: 500;
    margin-left: 3px;
  }
  .color-quantities {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .color-quantity {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #dce4df;
    border-radius: 5px;
    padding-left: 12px;
    min-width: 0;
  }
  .color-quantity.has-quantity {
    background: #f0f8f2;
    border-color: #96bda4;
  }
  .color-quantity label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
  }
  .quantity-stepper {
    display: flex;
    align-items: center;
  }
  .quantity-stepper button {
    width: 38px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }
  .quantity-stepper button:hover {
    background: #dcecdf;
  }
  .quantity-stepper button:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  .quantity-stepper input {
    width: 28px;
    height: 44px;
    text-align: center;
    background: transparent;
    font-size: 12px;
    font-weight: 500;
  }
  .builder-note {
    margin-top: 24px;
    color: #52625a;
    font-size: 12px;
    line-height: 1.8;
  }
  .quote-summary {
    position: sticky;
    top: 132px;
    align-self: start;
    min-width: 0;
    border: 1px solid #dce4df;
    border-radius: 8px;
    padding: 24px;
    background: #f5f8f4;
  }
  .quote-summary.editing {
    position: static;
  }
  @media (max-height: 800px) {
    .quote-summary {
      position: static;
    }
  }
  .summary-top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
  }
  .summary-top h2 {
    font-size: 14px;
  }
  .summary-top > span {
    font-size: 12px;
    color: #52625a;
  }
  .summary-total {
    padding: 24px 0 20px;
  }
  .summary-total > span {
    font-size: 12px;
    color: #52625a;
  }
  .summary-total > strong {
    display: block;
    font-size: 32px;
    line-height: 1.3;
    font-weight: 500;
    margin-top: 8px;
    font-variant-numeric: tabular-nums;
  }
  .summary-total p {
    font-size: 12px;
    color: #52625a;
    margin-top: 8px;
  }
  .summary-total p > span {
    color: #738579;
    margin: 0 8px;
  }
  .summary-lines {
    border-top: 1px solid #dce4df;
    max-height: 360px;
    overflow-y: auto;
  }
  .summary-lines > div {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
    padding: 12px 0;
    border-bottom: 1px solid #dce4df;
    font-size: 12px;
  }
  .summary-lines > div > div {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .summary-lines .nf-swatch {
    margin-top: 3px;
    width: 9px;
    height: 9px;
  }
  .summary-lines small {
    display: block;
    color: #52625a;
    margin-top: 3px;
    font-size: 12px;
  }
  .summary-lines strong {
    font-weight: 500;
    white-space: nowrap;
  }
  .empty-order {
    font-size: 12px;
    color: #52625a;
    padding: 20px 0;
  }
  .summary-disclaimer {
    font-size: 12px;
    color: #52625a;
    line-height: 1.8;
    margin: 16px 0 22px;
  }
  .quote-summary > .nf-button {
    width: 100%;
    font-size: 12px;
  }
  form {
    border-top: 1px solid #dce4df;
    padding-top: 20px;
  }
  form h3 {
    margin-bottom: 16px;
  }
  form .nf-label {
    font-size: 12px;
    margin-top: 14px;
  }
  form .nf-label > span {
    color: #52625a;
    font-size: 12px;
    font-weight: 400;
  }
  form .nf-field {
    font-size: 12px;
  }
  form .nf-button {
    width: 100%;
    margin-top: 20px;
    font-size: 12px;
  }
  .email-note {
    color: #52625a;
    font-size: 12px;
    line-height: 1.7;
    margin-top: 12px;
  }
  .copy-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    min-height: 44px;
    font-size: 12px;
    color: #067647;
    margin-top: 8px;
  }
  .copy-button:disabled {
    color: #52625a;
    cursor: not-allowed;
  }
  .copy-message {
    font-size: 12px;
    color: #52625a;
  }
  .summary-contact {
    display: block;
    text-align: center;
    font-size: 12px;
    color: #52625a;
    margin-top: 10px;
    min-height: 32px;
  }
  @media (max-width: 1100px) {
    .bulk-layout {
      grid-template-columns: minmax(0, 1fr) 310px;
      gap: 28px;
    }
    .color-quantities {
      grid-template-columns: 1fr;
    }
    .intro-count {
      display: none;
    }
  }
  @media (max-width: 850px) {
    .bulk-layout {
      grid-template-columns: 1fr;
    }
    .quote-summary {
      position: static;
    }
    .color-quantities {
      grid-template-columns: 1fr 1fr;
    }
    h1 {
      font-size: 36px;
    }
  }
  @media (max-width: 520px) {
    h1 {
      font-size: 32px;
    }
    .bulk-layout {
      padding-top: 24px;
    }
    .builder-heading {
      align-items: flex-start;
    }
    .builder-heading h2 {
      font-size: 14px;
    }
    .reset-button {
      font-size: 12px;
      min-height: 24px;
    }
    .preset-grid {
      gap: 6px;
    }
    .preset-grid button {
      padding: 14px 8px;
      gap: 7px;
    }
    .preset-grid strong {
      font-size: 12px;
    }
    .preset-grid small {
      font-size: 11px;
    }
    .preset-radio {
      width: 14px;
      height: 14px;
    }
    .nf-segment {
      padding-inline: 8px;
      font-size: 12px;
    }
    .duster-info {
      grid-template-columns: 70px minmax(0, 1fr);
      gap: 14px;
    }
    .duster-thumb,
    .duster-thumb img {
      width: 70px;
      height: 70px;
    }
    .duster-size > span {
      display: block;
      margin-top: 2px;
    }
    .color-quantities {
      grid-template-columns: 1fr;
    }
    .duster-description h3 {
      font-size: 14px;
    }
  }
</style>
