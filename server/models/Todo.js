const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todoItem: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: false,
    default: false
  },
  dueDate: {
    type: Date,
    required: false,
    default: null
  },
  priority: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
    default: 3
  },
  sortOrder: {
    type: Number,
    required: false,
    default: 9999
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: false,
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    default: null
  }
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;