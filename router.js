const { Router } = require("express");

const express = require('express')

const router = express.Router()

const appData = require('./data.json')
const seller = appData.seller
const ratings = appData.ratings
const goods = appData.goods

router.get('/seller', function (req, res) {
	res.json({
		errno: 0,
		data: seller
	});
});

router.get('/goods', function (req, res) {
	res.json({
		errno: 0,
		data: goods
	});
});

router.get('/ratings', function (req, res) {
	res.json({
		errno: 0,
		data: ratings
	});
});

module.exports = router