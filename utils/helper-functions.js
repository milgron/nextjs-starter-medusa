export const quantity = (item) => {
  return item.quantity;
};

export const sum = (prev, next) => {
  return prev + next;
};

export const getFixedPrice = (price) => {
  return `${(price / 100).toFixed(2)}`
}

export const formatPrice = (price, currency) => {
  return `${(price / 100).toFixed(2)} ${currency.toUpperCase()}`;
};

export const getLowerPrice = (variants) => {
  var lowest_price = 0
  var selected = null

  variants.forEach(option => {
    if(lowest_price == 0) {
      lowest_price = option.prices[0].amount
      selected = option
    } 
    if(option.prices[0].amount < lowest_price) {
      lowest_price = option.prices[0].amount
      selected = option
    } 
  })

  const formated_price = formatPrice(selected.prices[0].amount, selected.prices[0].currency_code)

  return formated_price
}

export const getMockProducts = (mockDataPath) => {
  let products = require(`../data/${mockDataPath}.json`)
    
  products.forEach(singleProduct => {
      singleProduct.lower_price = getLowerPrice(singleProduct.variants)
  })

  return products
}

export const getSlug = (path) => {
  const tmp = path.split("/");
  return tmp[tmp.length - 1];
};

export const resetOptions = (product) => {
  const {variant_id} = product.variants[0].prices[0];
  const size = product.variants.slice(0).reverse()[0].title;
  const stock = product.variants.slice(0).reverse()[0].inventory_quantity
  return {
    variantId: variant_id,
    quantity: 1,
    size,
    stock
  };
};

export const isEmpty = (obj) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;
