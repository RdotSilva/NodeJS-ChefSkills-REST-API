const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load ENV variables
dotenv.config({ path: "./config/config.env" });
