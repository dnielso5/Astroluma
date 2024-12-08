'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const iconSchema = new Schema({
  iconPath: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  }
}, {
  timestamps: true,
});

const Icon = mongoose.model('Icon', iconSchema);

module.exports = Icon;