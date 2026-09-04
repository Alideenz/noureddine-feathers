<!-- @format -->
<script lang="ts">
  import Button from '$components/Button.svelte';
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';
  import { formatCurrency } from '$helpers/helpers';

  type DusterColor = {
    label: string;
    hex: string;
  };

  type DusterSelection = {
    id: string;
    name: string;
    category: 'Feather dusters' | 'Lambswool dusters';
    size: string;
    handle: string;
    image: string;
    colors: DusterColor[];
    bestFor: string;
    priceTiers: {
      label: string;
      dozens: number;
      unitPrice: number;
      total: number;
    }[];
    dozens: number;
    color: string;
  };

  const presetOptions = [
    {
      id: '12-dozen',
      label: '12 dozen',
      eyebrow: 'Starter route',
      text: 'Balanced mix for one team or one location.',
    },
    {
      id: '24-dozen',
      label: '24 dozen',
      eyebrow: 'Multi-location',
      text: 'Higher-volume mix for larger janitorial routes.',
    },
    {
      id: 'custom',
      label: 'Custom',
      eyebrow: 'Build your own',
      text: 'Choose the exact duster mix and request a quote.',
    },
  ];

  const quantityOptions = [0, 1, 2, 3, 4, 6, 12];
  const categoryOptions = ['All', 'Feather dusters', 'Lambswool dusters'];

  let selectedPreset = '12-dozen';
  let selectedCategory = 'All';
  let companyName = '';
  let contactName = '';
  let email = '';
  let phone = '';
  let notes = '';

  let selections: DusterSelection[] = [
    {
      id: 'ostrich-16',
      name: 'Premium Ostrich Feather Duster',
      category: 'Feather dusters',
      size: '16 inches',
      handle: 'Short handle',
      image:
        '/products/Premium-Ostrich-Feather-Duster-Premium-Black-16-inches/0-Premium-Ostrich-Feather-Duster-Premium-Black-16-inches-1024x1024.webp',
      colors: [
        { label: 'Premium Black', hex: '#171717' },
        { label: 'Premium Gray', hex: '#9ca3af' },
      ],
      bestFor: 'Desks, counters, shelves',
      priceTiers: [
        { label: '1 dz.', dozens: 1, unitPrice: 6.25, total: 75 },
        { label: '5 dz.', dozens: 5, unitPrice: 5.75, total: 345 },
      ],
      dozens: 3,
      color: 'Premium Black',
    },
    {
      id: 'ostrich-24',
      name: 'Premium Ostrich Feather Duster',
      category: 'Feather dusters',
      size: '24 inches',
      handle: 'Long handle',
      image:
        '/products/Premium-Ostrich-Feather-Duster-Premium-Gray-24-inches/0-Premium-Ostrich-Feather-Duster-Premium-Gray-24-inches-1024x1024.webp',
      colors: [
        { label: 'Premium Gray', hex: '#9ca3af' },
        { label: 'Premium Black', hex: '#171717' },
      ],
      bestFor: 'Fixtures, lobbies, higher shelves',
      priceTiers: [
        { label: '1 dz.', dozens: 1, unitPrice: 11.95, total: 143.4 },
        { label: '5 dz.', dozens: 5, unitPrice: 11.45, total: 687 },
      ],
      dozens: 3,
      color: 'Premium Gray',
    },
    {
      id: 'ostrich-20',
      name: 'Premium Ostrich Feather Duster',
      category: 'Feather dusters',
      size: '20 inches',
      handle: 'Stained wood handle',
      image:
        '/products/Premium-Ostrich-Feather-Duster-Premium-Black-20-inches/0-Premium-Ostrich-Feather-Duster-Premium-Black-20-inches-1024x1024.webp',
      colors: [
        { label: 'Premium Black', hex: '#171717' },
        { label: 'Premium Gray', hex: '#9ca3af' },
      ],
      bestFor: 'Offices, ledges, mid-height shelving',
      priceTiers: [
        { label: '1 dz.', dozens: 1, unitPrice: 116.35 / 12, total: 116.35 },
        { label: '5 dz.', dozens: 5, unitPrice: 8.45, total: 507 },
      ],
      dozens: 3,
      color: 'Premium Black',
    },
    {
      id: 'lambswool-26',
      name: 'Premium Lambswool Duster',
      category: 'Lambswool dusters',
      size: '26 inches',
      handle: 'Standard handle',
      image:
        '/products/Premium-Lambswool-Duster-Premium-Yellow-26-inches/0-Premium-Lambswool-Duster-Premium-Yellow-26-inches-1024x1024.webp',
      colors: [
        { label: 'Premium Yellow', hex: '#f8d75b' },
        { label: 'Premium Black', hex: '#171717' },
        { label: 'Premium Green', hex: '#3f7d4c' },
        { label: 'Premium Orange', hex: '#f97316' },
      ],
      bestFor: 'Daily turnover and general dusting',
      priceTiers: [
        { label: '3 dz.', dozens: 3, unitPrice: 4.56, total: 164.16 },
      ],
      dozens: 2,
      color: 'Premium Yellow',
    },
    {
      id: 'lambswool-42',
      name: 'Premium Extendable Lambswool Duster',
      category: 'Lambswool dusters',
      size: '42 inches',
      handle: 'Extendable handle',
      image:
        '/products/Premium-Extendable-Lambswool-Duster-Premium-Black-42-inches/0-Premium-Extendable-Lambswool-Duster-Premium-Black-42-inches-1024x1024.webp',
      colors: [
        { label: 'Premium Black', hex: '#171717' },
        { label: 'Premium Blue', hex: '#2563eb' },
        { label: 'Premium Orange', hex: '#f97316' },
      ],
      bestFor: 'Vents, ceiling fans, high reach',
      priceTiers: [
        { label: '3 dz.', dozens: 3, unitPrice: 5.15, total: 185.4 },
      ],
      dozens: 1,
      color: 'Premium Black',
    },
    {
      id: 'lambswool-detachable',
      name: 'Detachable Extension Lambswool Duster',
      category: 'Lambswool dusters',
      size: '20-inch head',
      handle: '41-65 inch detachable extension handle',
      image:
        '/products/Premium-Extendable-Lambswool-Duster-Premium-Black-42-inches/0-Premium-Extendable-Lambswool-Duster-Premium-Black-42-inches-1024x1024.webp',
      colors: [
        { label: 'Premium Black', hex: '#171717' },
        { label: 'Premium Yellow', hex: '#f8d75b' },
      ],
      bestFor: 'Tall fixtures, deep reach, extension work',
      priceTiers: [
        { label: '2 dz.', dozens: 2, unitPrice: 8.6, total: 206.4 },
      ],
      dozens: 0,
      color: 'Premium Black',
    },
  ];

  const setPreset = (presetId: string) => {
    selectedPreset = presetId;

    if (presetId === '12-dozen') {
      selections = selections.map((selection) => {
        const dozensById: { [key: string]: number } = {
          'ostrich-16': 3,
          'ostrich-20': 3,
          'ostrich-24': 3,
          'lambswool-26': 2,
          'lambswool-42': 1,
        };

        return { ...selection, dozens: dozensById[selection.id] || 0 };
      });
    }

    if (presetId === '24-dozen') {
      selections = selections.map((selection) => {
        const dozensById: { [key: string]: number } = {
          'ostrich-16': 6,
          'ostrich-20': 6,
          'ostrich-24': 6,
          'lambswool-26': 4,
          'lambswool-42': 2,
        };

        return { ...selection, dozens: dozensById[selection.id] || 0 };
      });
    }
  };

  const updateSelection = (
    selectionId: string,
    changes: Partial<DusterSelection>
  ) => {
    selectedPreset = 'custom';
    selections = selections.map((selection) =>
      selection.id === selectionId ? { ...selection, ...changes } : selection
    );
  };

  const adjustDozens = (selectionId: string, amount: number) => {
    const selection = selections.find((item) => item.id === selectionId);
    if (!selection) return;

    updateSelection(selectionId, {
      dozens: Math.max(0, Math.min(200, selection.dozens + amount)),
    });
  };

  const getBestTier = (selection: DusterSelection) => {
    const qualifiedTiers = selection.priceTiers.filter(
      (tier) => selection.dozens >= tier.dozens
    );

    return qualifiedTiers[qualifiedTiers.length - 1] || selection.priceTiers[0];
  };

  const getEstimatedLineTotal = (selection: DusterSelection) => {
    if (selection.dozens === 0) return 0;

    const tier = getBestTier(selection);

    return selection.dozens * 12 * tier.unitPrice;
  };

  const buildQuoteBody = () => {
    const quoteDozens = selections.reduce(
      (total, selection) => total + selection.dozens,
      0
    );
    const quotePieces = quoteDozens * 12;
    const quoteEstimate = selections.reduce(
      (total, selection) => total + getEstimatedLineTotal(selection),
      0
    );
    const selectedItems = selections
      .filter((selection) => selection.dozens > 0)
      .map((selection) => {
        const tier = getBestTier(selection);

        return `- ${selection.dozens} dozen ${selection.name}, ${selection.size}, ${selection.color}, ${formatCurrency(tier.unitPrice)} each, ${formatCurrency(getEstimatedLineTotal(selection))} estimate`;
      })
      .join('\n');

    return [
      'Janitorial bulk duster quote request',
      '',
      `Company: ${companyName || '[company name]'}`,
      `Contact: ${contactName || '[contact name]'}`,
      `Email: ${email || '[email]'}`,
      `Phone: ${phone || '[phone]'}`,
      '',
      `Estimated total: ${quoteDozens} dozen / ${quotePieces} dusters / ${formatCurrency(quoteEstimate)}`,
      '',
      selectedItems || '- [add duster selections]',
      '',
      `Notes: ${notes || '[delivery address, timeline, preferred mix, recurring order needs]'}`,
    ].join('\n');
  };

  $: filteredSelections =
    selectedCategory === 'All'
      ? selections
      : selections.filter((selection) => selection.category === selectedCategory);
  $: selectedSelections = selections.filter((selection) => selection.dozens > 0);
  $: totalDozens = selections.reduce(
    (total, selection) => total + selection.dozens,
    0
  );
  $: totalPieces = totalDozens * 12;
  $: estimatedTotal = selections.reduce(
    (total, selection) => total + getEstimatedLineTotal(selection),
    0
  );
  $: quoteTier =
    totalDozens >= 24
      ? 'Large account quote'
      : totalDozens >= 12
        ? 'Bulk quote'
        : 'Custom quote';
  $: mailtoHref = `mailto:info@nprofiles.com?subject=${encodeURIComponent(
    'Janitorial bulk duster quote'
  )}&body=${encodeURIComponent(buildQuoteBody())}`;
</script>

<div class="bg-stone-50">
  <section class="border-b border-stone-200 bg-[#fffaf0]">
    <div class="nf-page grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.55fr)] lg:items-end">
      <div class="flex flex-col gap-4">
        <p class="nf-eyebrow">Janitorial bulk orders</p>
        <Heading customClass="max-w-4xl text-4xl lg:text-5xl">
          Build a mixed duster quote in minutes
        </Heading>
        <p class="max-w-3xl leading-7 text-stone-600">
          Choose feather dusters and lambswool dusters by size, color, and
          dozen quantity. Start with 12 dozen or 24 dozen, then adjust the mix
          for your routes.
        </p>
      </div>

      <div class="nf-panel-modern grid grid-cols-3 overflow-hidden text-center">
        <div class="border-r border-stone-200 p-4">
          <p class="montserrat-bold text-3xl text-teal-800">{totalDozens}</p>
          <p class="mt-1 text-xs uppercase text-stone-500">dozen</p>
        </div>
        <div class="border-r border-stone-200 p-4">
          <p class="montserrat-bold text-3xl text-teal-800">{totalPieces}</p>
          <p class="mt-1 text-xs uppercase text-stone-500">dusters</p>
        </div>
        <div class="p-4">
          <p class="montserrat-bold text-lg text-teal-800">
            {formatCurrency(estimatedTotal)}
          </p>
          <p class="mt-1 text-xs uppercase text-stone-500">estimate</p>
        </div>
      </div>
    </div>
  </section>

  <section class="nf-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
    <div class="flex flex-col gap-5">
      <div class="grid gap-4 md:grid-cols-3">
        {#each presetOptions as preset}
          <button
            class={`rounded-lg border p-4 text-left transition-all ${
              selectedPreset === preset.id
                ? 'border-teal-800 bg-white shadow-xl'
                : 'border-stone-200 bg-white/80 hover:-translate-y-0.5 hover:border-teal-700'
            }`}
            on:click={() => setPreset(preset.id)}
          >
            <span class="text-xs uppercase tracking-[0.18em] text-stone-500">
              {preset.eyebrow}
            </span>
            <span class="montserrat-bold mt-2 block text-2xl text-stone-950">
              {preset.label}
            </span>
            <span class="mt-2 block text-sm leading-6 text-stone-600">
              {preset.text}
            </span>
          </button>
        {/each}
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="nf-eyebrow">Duster options</p>
            <h2 class="montserrat-bold mt-1 text-2xl text-stone-950">
              Select by type, color, and quantity
            </h2>
          </div>
          <div class="flex flex-wrap gap-2">
            {#each categoryOptions as category}
              <button
                class={`rounded-full border px-4 py-2 text-sm transition-all ${
                  selectedCategory === category
                    ? 'border-teal-800 bg-teal-800 text-white'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-teal-700'
                }`}
                on:click={() => (selectedCategory = category)}
              >
                {category}
              </button>
            {/each}
          </div>
        </div>

        <div class="grid gap-3">
          {#each filteredSelections as selection}
            <article class="grid gap-4 rounded-lg border border-stone-200 bg-white p-3 shadow-sm transition-all hover:border-teal-700 hover:shadow-lg md:grid-cols-[92px_minmax(0,1fr)]">
              <img
                src={selection.image}
                alt={`${selection.name} ${selection.size}`}
                class="aspect-square w-[92px] rounded-lg bg-stone-100 object-contain p-2"
              />

              <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
                <div class="flex flex-col gap-3">
                  <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p class="text-xs uppercase tracking-[0.16em] text-teal-800">
                        {selection.category}
                      </p>
                      <h3 class="montserrat-bold mt-1 text-lg text-stone-950">
                        {selection.name}
                      </h3>
                    </div>
                    <div class="flex flex-wrap gap-2 text-xs text-stone-600">
                      <span class="rounded-full bg-stone-100 px-3 py-1">
                        {selection.size}
                      </span>
                      <span class="rounded-full bg-stone-100 px-3 py-1">
                        {selection.handle}
                      </span>
                    </div>
                  </div>

                  <p class="text-sm leading-6 text-stone-600">
                    {selection.bestFor}
                  </p>

                  <div class="flex flex-wrap gap-2">
                    {#each selection.priceTiers as tier}
                      <span class="rounded-full bg-[#fff9ed] px-3 py-1 text-sm text-stone-700">
                        {tier.label} {formatCurrency(tier.unitPrice)} ea. /
                        {formatCurrency(tier.total)}
                      </span>
                    {/each}
                  </div>

                  <div class="flex flex-col gap-2">
                    <p class="montserrat-bold text-sm text-stone-950">Color</p>
                    <div class="flex flex-wrap gap-2">
                      {#each selection.colors as color}
                        <button
                          class={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${
                            selection.color === color.label
                              ? 'border-teal-800 bg-teal-50 text-teal-950'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-teal-700'
                          }`}
                          on:click={() =>
                            updateSelection(selection.id, {
                              color: color.label,
                            })}
                        >
                          <span
                            class="h-4 w-4 rounded-full border border-stone-300"
                            style={`background-color: ${color.hex};`}
                          />
                          <span>{color.label.replace('Premium ', '')}</span>
                        </button>
                      {/each}
                    </div>
                  </div>
                </div>

                <div class="flex flex-col justify-between gap-3 rounded-lg bg-stone-50 p-3">
                  <div class="flex items-center justify-between gap-3">
                    <p class="montserrat-bold text-sm text-stone-950">Dozens</p>
                    <div class="flex items-center rounded-full border border-stone-200 bg-white">
                      <Button
                        customClass="h-9 w-9 rounded-full border-0 p-0 hover:bg-stone-100"
                        ariaLabel={`Decrease ${selection.name} ${selection.size}`}
                        handleClick={() => adjustDozens(selection.id, -1)}
                      >
                        -
                      </Button>
                      <input
                        class="h-9 w-14 bg-transparent text-center text-sm outline-none"
                        type="number"
                        min="0"
                        max="200"
                        bind:value={selection.dozens}
                        on:input={() =>
                          updateSelection(selection.id, {
                            dozens: Math.max(
                              0,
                              Math.min(200, selection.dozens || 0)
                            ),
                          })}
                        aria-label={`Custom dozens for ${selection.name} ${selection.size}`}
                      />
                      <Button
                        customClass="h-9 w-9 rounded-full border-0 p-0 hover:bg-stone-100"
                        ariaLabel={`Increase ${selection.name} ${selection.size}`}
                        handleClick={() => adjustDozens(selection.id, 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    {#each quantityOptions as quantityOption}
                      <Button
                        customClass={`min-w-[42px] rounded-full px-3 py-2 text-sm transition-all ${
                          selection.dozens === quantityOption
                            ? 'bg-teal-800 text-white'
                            : 'bg-white hover:bg-teal-800 hover:text-white'
                        }`}
                        selected={selection.dozens === quantityOption}
                        handleClick={() =>
                          updateSelection(selection.id, {
                            dozens: quantityOption,
                          })}
                      >
                        {quantityOption}
                      </Button>
                    {/each}
                  </div>

                  <p class="text-xs uppercase tracking-[0.14em] text-stone-500">
                    {selection.dozens * 12} pieces · {formatCurrency(
                      getEstimatedLineTotal(selection)
                    )}
                  </p>
                </div>
              </div>
            </article>
          {/each}
        </div>
      </div>
    </div>

    <aside class="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
      <div class="nf-panel-modern flex flex-col gap-5 p-5">
        <div>
          <p class="nf-eyebrow">Quote summary</p>
          <Heading customClass="mt-2 text-2xl">{totalDozens} dozen</Heading>
          <p class="mt-1 text-stone-600">
            {totalPieces} total dusters · {formatCurrency(estimatedTotal)}
          </p>
          <p class="mt-2 text-sm text-stone-500">{quoteTier}</p>
        </div>

        {#if selectedSelections.length > 0}
          <div class="grid gap-3 text-sm">
            {#each selectedSelections as selection}
              <div class="flex justify-between gap-4 border-b border-stone-100 pb-3">
                <div class="min-w-0">
                  <p class="montserrat-bold text-stone-950">
                    {selection.size} {selection.category}
                  </p>
                  <p class="truncate text-stone-600">
                    {selection.color.replace('Premium ', '')} - {selection.name}
                  </p>
                </div>
                <p class="montserrat-bold whitespace-nowrap text-teal-800">
                  {selection.dozens} dz. · {formatCurrency(
                    getEstimatedLineTotal(selection)
                  )}
                </p>
              </div>
            {/each}
          </div>
        {:else}
          <p class="rounded-lg bg-amber-50 p-4 text-sm leading-6 text-stone-700">
            Select at least one duster to request a quote.
          </p>
        {/if}

        <div class="grid gap-3">
          <input
            class="rounded-lg border border-stone-300 px-3 py-3"
            placeholder="Company"
            bind:value={companyName}
          />
          <input
            class="rounded-lg border border-stone-300 px-3 py-3"
            placeholder="Contact name"
            bind:value={contactName}
          />
          <input
            class="rounded-lg border border-stone-300 px-3 py-3"
            placeholder="Email"
            type="email"
            bind:value={email}
          />
          <input
            class="rounded-lg border border-stone-300 px-3 py-3"
            placeholder="Phone"
            bind:value={phone}
          />
          <textarea
            class="min-h-[96px] rounded-lg border border-stone-300 px-3 py-3"
            placeholder="Delivery city, timeline, recurring needs, or special mix"
            bind:value={notes}
          />
        </div>

        <a
          class={`montserrat-bold rounded-full px-6 py-4 text-center transition-all ${
            totalDozens > 0
              ? 'bg-teal-800 text-white hover:bg-teal-700'
              : 'pointer-events-none bg-stone-100 text-stone-500'
          }`}
          href={mailtoHref}
        >
          Request Bulk Quote
        </a>
        <Link
          href="/products/feather-dusters"
          customClass="montserrat-bold text-center text-sm text-teal-800 hover:underline"
        >
          Browse individual dusters
        </Link>
      </div>
    </aside>
  </section>
</div>
