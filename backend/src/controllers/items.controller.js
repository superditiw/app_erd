const itemService = require('../services/items.service');
const userService = require('../services/users.service');

const getItems = async (req, res) => {
  try {
    const data = await itemService.getItems();
    res.json(data);
  } catch (error) {
    console.error('ERROR ASLI : ', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const createItem = async (req, res) => {
  try {
    const userId = req.body.created_id;
    const user = await userService.getUserId(userId);

    if (!user || user.role_code !== 'ADMIN') {
      return res.status(403).json({
        message: 'Forbidden : hanya admin'
      });
    }

    const result = await itemService.createItem(req.body);

    res.status(201).json({
      message: 'Item created',
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};

const updateItem = async (req, res) => {
  try{
    const userId = req.body.updated_id;
    const user = await userService.getUserId(userId);

    if (!user || user.role_code !== 'ADMIN') {
      return res.status(403).json({
        message: 'Forbidden : hanya admin'
      });
    }

    const id = req.params.id;
    const result = await itemService.updateItem(id, req.body);

    res.json({
      message: 'Item updated',
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteItem = async (req, res) => {
  try{
    const userId = req.body.updated_id;
    const user = await userService.getUserId(userId);

    if (!user || user.role_code !== 'ADMIN') {
      return res.status(403).json({
        message: 'Forbidden : hanya admin'
      });
    }

    const id = req.params.id;
    const result = await itemService.deleteItem(id);

    res.json({
      message: 'Item deleted',
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem
};