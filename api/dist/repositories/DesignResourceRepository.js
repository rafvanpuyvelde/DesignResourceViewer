"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DesignResourceScraper_1 = __importDefault(require("../utils/DesignResourceScraper"));
class DesignResourceRepository {
    constructor() {
        this.scraper = new DesignResourceScraper_1.default();
    }
    async getResources() {
        console.log("Get resources");
        return this.scraper.getCategories();
    }
}
exports.default = DesignResourceRepository;
//# sourceMappingURL=DesignResourceRepository.js.map