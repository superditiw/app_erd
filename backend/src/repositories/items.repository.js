const db = require('../config/db');

const getAllItems = async () => {
  const [rows] = await db.query('SELECT * FROM items');
  return rows;
};

const createItem = async (data) => {
  const query = `
    INSERT INTO items 
    (
      item_name,
      description,
      status,
      std_qty,
      min_stock,
      max_stock,
      unit_cost,
      unit_retail,
      supplier_id,
      created_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.item_name,
    data.description,
    data.status,
    data.std_qty,
    data.min_stock,
    data.max_stock,
    data.unit_cost,
    data.unit_retail,
    data.supplier_id,
    data.created_id
  ];

  const [result] = await db.query(query, values);
  return result;
};

const updateItem = async (id, data) => {
  const query = `
    UPDATE items SET
      item_name = ?,
      description = ?,
      status = ?,
      std_qty = ?,
      min_stock = ?,
      max_stock = ?,
      unit_cost = ?,
      unit_retail = ?,
      supplier_id = ?,
      updated_id = ?
    WHERE item_id = ?
  `;

  const values = [
    data.item_name,
    data.description,
    data.status,
    data.std_qty,
    data.min_stock,
    data.max_stock,
    data.unit_cost,
    data.unit_retail,
    data.supplier_id,
    data.updated_id,
    id
  ];

  const [result] = await db.query(query, values);
  return result;
};

const deleteItem = async (id) => {
  const query = 'DELETE FROM items WHERE item_id = ?';
  const[result] = await db.query(query, [id]);
  return result;
};

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  deleteItem
};