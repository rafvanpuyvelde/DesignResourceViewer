"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DesignResourceRepository_1 = __importDefault(require("../repositories/DesignResourceRepository"));
const router = express_1.default.Router();
const repo = new DesignResourceRepository_1.default();
router.get("/resources", (req, res) => {
    repo.getResources().then((resources) => {
        res.send(JSON.stringify(resources));
    });
});
exports.default = router;
//# sourceMappingURL=DesignResourceController.js.map