const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  lastAccessed: { type: Date, default: null },
});

urlSchema.index({ shortId: 1 }); // Ensure efficient lookups

module.exports = mongoose.model('Url', urlSchema);
