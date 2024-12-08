'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const snippetItemSchema = new Schema({
  snippetFilename: {
    type: String,
    required: false,
  },
  snippetCode: {
    type: String,
    required: false,
  },
  snippetLanguage: {
    type: String,
    required: false,
  }
});

const snippetSchema = new Schema({
  snippetTitle: {
    type: String,
    required: true,
  },
  snippetLanguage: {
    type: String,
    required: false,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Listing',
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  snippetItems: [snippetItemSchema],
}, {
  timestamps: true,
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
