const express = require('express');
const { ReasonPhrases } = require('http-status-codes');

// const logger = require('../utils/logger');
// const { get } = require('../utils/request');
// const exceptionHandler = require('../utils/exceptionHandler');

const router = express.Router();

router.get('/200', async (req, res) => {
  res.status(200).json(ReasonPhrases.OK);
});

router.get('/201', async (req, res) => {
  res.status(201).json(ReasonPhrases.CREATED);
});

router.get('/204', async (req, res) => {
  res.status(204).json(ReasonPhrases.NO_CONTENT);
});

router.get('/304', async (req, res) => {
  res.status(304).json(ReasonPhrases.NOT_MODIFIED);
});

router.get('/308', async (req, res) => {
  res.status(308).json(ReasonPhrases.PERMANENT_REDIRECT);
});

router.get('/400', async (req, res) => {
  res.status(400).json(ReasonPhrases.BAD_REQUEST);
});

router.get('/401', async (req, res) => {
  res.status(401).json(ReasonPhrases.UNAUTHORIZED);
});

router.get('/403', async (req, res) => {
  res.status(403).json(ReasonPhrases.FORBIDDEN);
});

router.get('/404', async (req, res) => {
  res.status(404).json(ReasonPhrases.NOT_FOUND);
});

router.get('/405', async (req, res) => {
  res.status(405).json(ReasonPhrases.METHOD_NOT_ALLOWED);
});

router.get('/500', async (req, res) => {
  res.status(500).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
});

router.get('/502', async (req, res) => {
  res.status(502).json(ReasonPhrases.BAD_GATEWAY);
});

module.exports = router;
