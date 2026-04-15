const itemRepository = require('../repositories/items.repository');

const getItems = async () => {
  return await itemRepository.getAllItems();
};

const createItem = async (data) => {
  return await itemRepository.createItem(data);
}

const updateItem = async (id, data) => {
  return await itemRepository.updateItem(id, data);
};  

const deleteItem = async (id) => {
  return await itemRepository.deleteItem(id);
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem
};