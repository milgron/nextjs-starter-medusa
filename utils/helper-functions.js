export const quantity = (item) => {
  return item.quantity;
};

export const sum = (prev, next) => {
  return prev + next;
};

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
  const variantId = product.variants.slice(0).reverse()[0].id;
  const size = product.variants.slice(0).reverse()[0].title;
  return {
    variantId: variantId,
    quantity: 1,
    size: size,
  };
};

export const isEmpty = (obj) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;
