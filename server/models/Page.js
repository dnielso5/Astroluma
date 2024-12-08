'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const pageSchema = new Schema({
  pageTitle: {
    type: String,
    required: true,
    default: "",
  },
  pageContent: {
    type: String,
    required: false,
    default: null,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;