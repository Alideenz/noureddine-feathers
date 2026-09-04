/** @format */

// interfaces
import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';
import type I_Product from '$interfaces/I_Product';

type ProductIdentity = {
  id?: number;
  product_id?: number;
  name: string;
  color: string;
  size: number | null;
  size_unit: string;
  category: string;
};

const formatCurrency = (amount: number) => {
  const formatToCAD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
  });
  return formatToCAD.format(amount);
};

const formatText = (text: string) => {
  let _text: string = '';

  if (text) {
    _text = text.split(' ').join('-').toLowerCase();
  }

  return _text;
};

const calculateAverageRating = (ratings: number[]) => {
  if (!ratings) return 0;

  let sum = 0;

  ratings.forEach((r) => (sum = sum + r));

  const average = sum / ratings.length;
  const result = +average.toFixed(1);

  return result;
};

const calculateSalePrice = (price: number, percent: number) => {
  const salePrice = price - price * (percent / 100);
  return salePrice;
};

const getMinPrice = (productPriceArr: I_ProductPriceTableRecord[]) => {
  if (productPriceArr.length === 0) return 0;

  const prices: number[] = productPriceArr.map(
    (productPriceObj: I_ProductPriceTableRecord) => productPriceObj.price
  );
  return Math.min(...prices);
};

const getMaxPrice = (productPriceArr: I_ProductPriceTableRecord[]) => {
  if (productPriceArr.length === 0) return 0;

  const prices: number[] = productPriceArr.map(
    (productPriceObj: I_ProductPriceTableRecord) => productPriceObj.price
  );
  return Math.max(...prices);
};

const groupBy = (data: any, key: any) => {
  return data.reduce(function (previousValue: any, currentValue: any) {
    (previousValue[currentValue[key]] =
      previousValue[currentValue[key]] || []).push(currentValue);
    return previousValue;
  }, {});
};

const generateClass = (
  unconditionalClasses: string[] = [],
  conditionalClasses: { [conditionalClass: string]: boolean }[] = []
) => {
  if (unconditionalClasses.length === 0 && conditionalClasses.length === 0)
    return '';

  const passedConditionalClasses = [];

  for (const conditionalClass in conditionalClasses) {
    if (conditionalClasses[conditionalClass])
      passedConditionalClasses.push(conditionalClass);
  }

  const allClasses = unconditionalClasses.concat(passedConditionalClasses);

  const generatedClass = allClasses.join(' ');

  return generatedClass;
};

const formatPackage = (quantity: number, showPer: boolean = false) => {
  let _quantity: string = '';

  // if (quantity === 1) {
  //   _quantity = showPer ? 'each' : '1';
  // } else if (quantity === 10) {
  //   _quantity = showPer ? 'per pack of 10' : '10';
  // } else if (quantity === 12) {
  //   _quantity = showPer ? 'per 1 dz.': '1 dz.';
  // } else if (quantity === 36) {
  //   _quantity = showPer ? 'per 3 dz.': '3 dz.';
  // } else if (quantity === 60) {
  //   _quantity = showPer ? 'per 5 dz.': '5 dz.';
  // }

  if (quantity === 1) {
    _quantity = showPer ? 'each' : '1 unit';
  } else if (quantity === 10) {
    _quantity = showPer ? '/pack of 10' : '10 units';
  } else if (quantity === 12) {
    _quantity = showPer ? '/dz.' : '1 dz.';
  } else if (quantity === 36) {
    _quantity = showPer ? '/3 dz.' : '3 dz.';
  } else if (quantity === 60) {
    _quantity = showPer ? '/5 dz.' : '5 dz.';
  } else {
    _quantity = showPer ? `/pack of ${quantity}` : `${quantity} units`;
  }

  return _quantity;
};

const formatName = (
  name: string,
  color: string,
  size: number | null,
  sizeUnit: string
) => {
  const _name = name.split(' ').join('-');
  const _color = color.split(' ').join('-');

  return `${_name}-${_color}-${size}-${sizeUnit}`;
};

const formatProductTitle = (product: ProductIdentity) => {
  return `${product.name} - ${product.color}${
    product.size ? ` - ${product.size} ${product.size_unit}` : ''
  }`;
};

const getProductPath = (product: ProductIdentity) => {
  const id = product.id || product.product_id;

  return `/products/${formatText(product.category)}/${
    id
  }-${formatText(product.name)}-${formatText(product.color)}-${
    product.size || ''
  }-${formatText(product.size_unit) || ''}`;
};

const getProductImagePath = (product: ProductIdentity, index = 0) => {
  const folderName = formatName(
    product.name,
    product.color,
    product.size,
    product.size_unit
  );

  return `/products/${folderName}/${index}-${folderName}-1024x1024.webp`;
};

const isPrivatePricingCategory = (_category: string) => {
  return false;
};

const hasCheckoutPrice = (productPrice: I_ProductPriceTableRecord | undefined) => {
  return Boolean(productPrice?.stripe_price_id);
};

const getProductPriceRange = (product: I_Product) => {
  const minPrice = getMinPrice(product.prices);
  const maxPrice = getMaxPrice(product.prices);

  if (minPrice === 0 && maxPrice === 0) return '';
  if (minPrice === maxPrice) return formatCurrency(minPrice);

  return `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`;
};

const getProductPriceSummary = (product: I_Product) => {
  const primaryPrice = product.prices[0];
  const largestPackPrice = product.prices[product.prices.length - 1];

  if (!primaryPrice) return { headline: '', meta: '', unitPrice: '', largestPack: '' };

  const headline = `${formatCurrency(primaryPrice.price)} ${formatPackage(
    primaryPrice.quantity,
    true
  )}`;
  const unitPrice =
    primaryPrice.quantity > 1
      ? `${formatCurrency(primaryPrice.price / primaryPrice.quantity)} each`
      : '';
  const largestPack =
    largestPackPrice && largestPackPrice.id !== primaryPrice.id
      ? `${formatPackage(largestPackPrice.quantity)} ${formatCurrency(
          largestPackPrice.price
        )}`
      : '';
  const meta = [unitPrice, largestPack].filter(Boolean).join(' · ');

  return { headline, meta, unitPrice, largestPack };
};

export {
  calculateAverageRating,
  calculateSalePrice,
  formatCurrency,
  formatText,
  groupBy,
  getMinPrice,
  getMaxPrice,
  generateClass,
  formatPackage,
  formatName,
  formatProductTitle,
  getProductPath,
  getProductImagePath,
  getProductPriceRange,
  getProductPriceSummary,
  hasCheckoutPrice,
  isPrivatePricingCategory,
};
