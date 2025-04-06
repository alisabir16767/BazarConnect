const mongoose = require("mongoose");
const User = require("./models/User");
const Shop = require("./models/Shop");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Cart = require("./models/Cart");
const Review = require("./models/Review");
const Transaction = require("./models/Transaction");

const MONGO_URL = "mongodb://localhost:27017/BiharBazzar";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit process with failure
  }
}

const userData = [
  // Define your user data here
  {
    username: "user1",
    email: "user1@example.com",
    password: "password1",
    role: "customer",
    name: "User One",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    country: "USA",
    zip_code: "10001",
  },
  {
    username: "user2",
    email: "user2@example.com",
    password: "password2",
    role: "seller",
    name: "User Two",
    address: "456 Elm St",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    zip_code: "90001",
  },
];

const shopData = [
  // Define your shop data here
  {
    owner_id: "609c183e6fd2f11e4ca2b555",
    name: "Example Shop 1",
    description: "This is a sample shop description.",
    city: "New York",
    state: "NY",
    country: "USA",
    address: ["123 Main St"],
    zip_code: "10001",
    category: "Fashion",
    images: ["https://example.com/shop1.jpg"],
  },
  {
    owner_id: "609c183e6fd2f11e4ca2b555",
    name: "Example Shop 2",
    description: "Another sample shop description.",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    address: ["456 Elm St"],
    zip_code: "90001",
    category: "Electronics",
    images: ["https://example.com/shop2.jpg"],
  },
];

const productData = [
  // Define your product data here
  {
    shop_id: "609c183e6fd2f11e4ca2b555", // Replace with an existing shop ID from your Shop collection
    name: "Product 1",
    description: "Product 1 description.",
    price: 99.99,
    quantity: 10,
    category: "Electronics",
    images: ["https://example.com/product1.jpg"],
  },
  {
    shop_id: "609c183e6fd2f11e4ca2b555",
    name: "Product 2",
    description: "Product 2 description.",
    price: 149.99,
    quantity: 5,
    category: "Fashion",
    images: ["https://example.com/product2.jpg"],
  },
];

const orderData = [
  // Define your order data here
  {
    user_id: "609c183e6fd2f11e4ca2b555", // Replace with an existing user ID from your User collection
    shop_id: "609c183e6fd2f11e4ca2b555", // Replace with an existing shop ID from your Shop collection
    products: [
      {
        product_id: "609c183e6fd2f11e4ca2b555", // Replace with an existing product ID from your Product collection
        quantity: 2,
        price: 99.99,
      },
    ],
    order_date: new Date(),
    status: "pending",
    shipped_address: "123 Main St, New York, NY, USA",
    payment_method: "Credit Card",
    total_amount: 199.98,
  },
];
// Function to initialize sample data
async function init() {
  try {
    // Clear existing data (if needed)
    await Promise.all([
      User.deleteMany({}),
      Shop.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Cart.deleteMany({}),
      Review.deleteMany({}),
      Transaction.deleteMany({}),
    ]);

    // Insert sample data into collections
    const users = await User.create(userData);
    const shops = await Shop.create(shopData);
    const products = await Product.create(productData);
    const orders = await Order.create(orderData);

    console.log("Sample data initialized successfully:");
    console.log("Users:", users);
    console.log("Shops:", shops);
    console.log("Products:", products);
    console.log("Orders:", orders);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error initializing sample data:", error.message);
    mongoose.connection.close();
  }
}

// Connect to MongoDB and then initialize data
connectDB()
  .then(init)
  .catch((err) => console.error("Initialization error:", err));
