"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationTest1762219268970 = void 0;
const bcrypt = __importStar(require("bcrypt"));
class MigrationTest1762219268970 {
    async up(queryRunner) {
        const passwordHash = await bcrypt.hash('aaBB11##', 10);
        await queryRunner.query(`
				INSERT INTO "USERS" ("name", "email", "password", "phone", "country", "city", "address", "isAdmin", "isTester", "isDeleted") 
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
			`, [
            'TestUser',
            'testuser@mail.com',
            passwordHash,
            222333,
            'testCountry',
            'testCity',
            'testAddress',
            true,
            false,
            false,
        ]);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "USERS" WHERE "email" = $1`, [
            'testuser@mail.com',
        ]);
    }
}
exports.MigrationTest1762219268970 = MigrationTest1762219268970;
//# sourceMappingURL=1768005716165-migrationTest.js.map