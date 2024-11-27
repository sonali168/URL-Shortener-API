const Url = require('../models/Url');
const shortid = require('shortid');
const Joi = require('joi');

const validateUrl = (url) => {
  const schema = Joi.string().uri().required();
  return schema.validate(url);
};

const shortenUrl = async (req, res) => {
  const { url } = req.body;

  const { error } = validateUrl(url);
  if (error) return res.status(400).json({ message: 'Invalid URL' });

  try {
    const shortId = shortid.generate();
    const newUrl = new Url({ originalUrl: url, shortId });
    await newUrl.save();

    return res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const redirectUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).json({ message: 'URL not found' });

    url.clicks++;
    url.lastAccessed = new Date();
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getStats = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).json({ message: 'URL not found' });

    return res.status(200).json({
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      lastAccessed: url.lastAccessed,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = { shortenUrl, redirectUrl, getStats };
