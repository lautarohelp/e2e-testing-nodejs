const { PRODUCT_TABLE } = require("../models/product.model");


module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(PRODUCT_TABLE, [
    {
      name: 'Product 1',
      image: 'https://api.lorem.space/image/game?w=150&h=220',
      description: 'blaspalfdñfsmñl dds',
      price: 100,
      category_id: 1,
      created_at: new Date()
    },
    {
      name: 'Product 2',
      image: 'https://api.lorem.space/image/game?w=150&h=220',
      description: 'blaspalfdñfsmñl dds',
      price: 200,
      category_id: 2,
      created_at: new Date()
    },
    {
      name: 'Product 3',
      image: 'https://api.lorem.space/image/game?w=150&h=220',
      description: 'blaspalfdñfsmñl dds',
      price: 400,
      category_id: 2,
      created_at: new Date()
    },
    {
      name: 'Product 4',
      image: 'https://api.lorem.space/image/game?w=150&h=220',
      description: 'blaspalfdñfsmñl dds',
      price: 500,
      category_id: 2,
      created_at: new Date()
    },
    {
      name: 'Product 5',
      image: 'https://api.lorem.space/image/game?w=150&h=220',
      description: 'blaspalfdñfsmñl dds',
      price: 500,
      category_id: 1,
      created_at: new Date()
    },
  ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  }
};
