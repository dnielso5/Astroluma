const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const { saveTodo, listTodo, completeTodo, deleteTodo } = require('../controllers/todo');

const router = express.Router();

router.post('/todo/item', verifyToken, saveTodo);
router.get('/todo/completion/:todoId', verifyToken, completeTodo);
router.get('/todo/:todoId/delete/:itemId', verifyToken, deleteTodo);
router.get('/todo/:todoId/items', verifyToken, listTodo);
router.get('/todo/all/items/:completion/:filter/:page', verifyToken, listTodo);
router.get('/todo/:todoId/items/:completion/:filter/:page', verifyToken, listTodo);

module.exports = router;