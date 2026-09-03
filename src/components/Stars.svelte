<!-- @format -->
<script lang="ts">
  // props
  export let ratingAverage: number = 0;
  export let ratingCount: number = 0;
  export let id: string | number = '';

  // state
  let stars: { linearGradientId: string; offset: string }[] = [];

  const ratingMax = 5;
  const productRating = ratingAverage;
  const productRatingRoundPortion = +(productRating + '').split('.')[0] || 0;
  const productRatingDecimalPortion =
    +(productRating + '').split('.')[1] * 10 || 0;

  let index = 0;
  while (index < ratingMax) {
    let offsetBlack = '0%';

    if (index < productRatingRoundPortion) offsetBlack = 100 + '%';
    if (index === productRatingRoundPortion)
      offsetBlack = productRatingDecimalPortion + '%';
    if (index > productRatingRoundPortion) offsetBlack = 0 + '%';

    stars.push({
      linearGradientId: `${id}-${index}`,
      offset: offsetBlack,
    });

    index++;
  }
</script>

<div class="flex items-center gap-2">
  <div class="flex">
    {#each stars as star}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width={1.5}
        stroke="black"
        class="h-5 w-5"
      >
        <defs>
          <linearGradient id={star.linearGradientId}>
            <stop offset={star.offset} stop-color="black" />
            <stop offset="0%" stop-color="white" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${star.linearGradientId})`}
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    {/each}
  </div>
  <p>
    ({ratingCount})
  </p>
</div>
