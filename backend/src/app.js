const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const itemRoutes = require('./routes/items.routes');
app.use('/items', itemRoutes);

const userRoutes = require('./routes/users.routes');
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});