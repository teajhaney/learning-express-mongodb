const products = require('../data/product');

const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => products.find(product => product.id == id),
  },
  Mutation: {
    createProduct: (_, { title, category, price, inStock }) => {
      const newlyCreatedProduct = {
        id: products.length + 1,
        title,
        category,
        price,
        inStock,
      };
      products.push(newlyCreatedProduct);
      return newlyCreatedProduct;
    },
    deleteProduct: (_, { id }) => {
      const index = products.findIndex(product => product.id == id);
      if (index === -1) return null;
      products.splice(index, 1);
      return true;
    },
    // updateProduct: (_, { id, ...update }) => {
    //   const product = products.find(product => product.id == id);
    //   if (!product) return null;
    //   product.title = title || product.title;
    //   product.category = category || product.category;
    //   product.price = price || product.price;
    //   product.inStock = inStock || product.inStock;
    //   return product;
    // },
    updateProduct: (_, { id, ...update }) => {
      const index = products.find(product => product.id == id);
      if (index === -1) return null;
      const updatedProduct = { ...products[index], ...update };
      products[index] = updatedProduct;
      console.log('Updated product:', products[index]);
      return updatedProduct;
    },
  },
};
module.exports = resolvers;
