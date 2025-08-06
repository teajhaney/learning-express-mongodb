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

    updateProduct: (_, { id, title, category, price, inStock }) => {
      const index = products.findIndex(product => product.id == id);
      if (index === -1) return null;

      const existing = products[index];

      const updatedProduct = {
        ...existing,
        title: title ?? existing.title,
        category: category ?? existing.category,
        price: price ?? existing.price,
        inStock: inStock ?? existing.inStock,
      };

      products[index] = updatedProduct;
      return updatedProduct;
    },
  },
};
module.exports = resolvers;
