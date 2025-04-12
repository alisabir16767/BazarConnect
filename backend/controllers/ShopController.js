const Shop = require("../models/Shop");
const User = require("../models/User");
const { ExpressError, asyncWrap } = require("../middleware/errorMiddleware");
const { shopSchema } = require("../validation/shopValidation");

// CREATE NEW SHOP
exports.createShop = asyncWrap(async (req, res, next) => {
  console.log(req.body);
  const { error, value } = shopSchema.validate(req.body);
  if (error) {
    return next(new ExpressError(400, error.details[0].message));
  }
  const newShop = new Shop(value);
  await newShop.save();
  res.status(201).json({ message: "Shop created successfully", shop: newShop });
});

// GET ALL SHOPS
exports.getAllShops = asyncWrap(async (req, res, next) => {
  const shops = await Shop.find();
  res.status(200).json(shops);
});

// GET SHOP BY ID
exports.getShopById = asyncWrap(async (req, res, next) => {
  const shop = await Shop.findById(req.params.shopId);
  if (!shop) {
    return next(new ExpressError(404, "Shop not found"));
  }
  res.status(200).json(shop);
});

// SEARCH SHOP BY CITY
exports.searchByCity = asyncWrap(async (req, res, next) => {
  const { shopCity } = req.params;
  const shops = await Shop.find({ city: shopCity });
  if (shops.length === 0) {
    return next(new ExpressError(404, "Shop not found"));
  }
  res.status(200).json(shops);
});

// UPDATE SHOP
exports.updateShop = asyncWrap(async (req, res, next) => {
  const { error, value } = shopSchema.validate(req.body);
  if (error) {
    return next(new ExpressError(400, error.details[0].message));
  }

  const shop = await Shop.findById(req.params.shopId);
  if (!shop) {
    return next(new ExpressError(404, "Shop not found"));
  }

  Object.assign(shop, value);

  await shop.save();
  res.status(200).json({ message: "Shop updated successfully", shop });
});

// DELETE SHOP
exports.deleteShop = asyncWrap(async (req, res, next) => {
  const shop = await Shop.findById(req.params.shopId);
  if (!shop) {
    return next(new ExpressError(404, "Shop not found"));
  }
  await Shop.deleteOne({ _id: req.params.shopId });
  res.status(200).json({ message: "Shop deleted successfully" });
});
