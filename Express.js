const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyParser.json());


let items = [
  { id: 1, name: 'Apple', quantity: 10, price: 0.5 },
  { id: 2, name: 'Banana', quantity: 20, price: 0.3 },
  { id: 3, name: 'Orange', quantity: 15, price: 0.7 },
  { id: 4, name: 'Mango', quantity: 10, price: 0.5 },
  { id: 5, name: 'Grapes', quantity: 10, price: 0.5 }];
let idCounter = 5;


app.post('/items', (req, res) => {
  const newItem = {
    id: idCounter++,
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price
  };
  items.push(newItem);
  res.status(201).json(newItem);
});


app.get('/items', (req, res) => {
  res.status(200).json(items);
});


app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.status(200).json(item);
});


app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  if (req.body.name !== undefined) {
    item.name = req.body.name;
  }
  if (req.body.quantity !== undefined) {
    item.quantity = req.body.quantity;
  }
  if (req.body.price !== undefined) {
    item.price = req.body.price;
  }
  res.status(200).json(item);
});


app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  items.splice(itemIndex, 1);
  res.status(200).json({ message: 'Item deleted' });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
