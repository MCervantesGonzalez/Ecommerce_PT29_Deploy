"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
const environment_1 = require("../config/environment");
exports.CloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: environment_1.environment.CLOUDINARY_CLOUD_NAME,
            api_key: environment_1.environment.CLOUDINARY_API_KEY,
            api_secret: environment_1.environment.CLOUDINARY_API_SECRET,
        });
    },
};
//# sourceMappingURL=cloudinary.js.map