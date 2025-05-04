"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
// Configuration
cloudinary_1.v2.config({
    cloud_name: "dnzqu88pz",
    secure: true,
    api_key: "792482122157778",
    api_secret: "<your_api_secret>", // Click 'View API Keys' above to copy your API secret
});
const url = cloudinary_1.v2.url("lisa_p2nipl");
console.log(url);
