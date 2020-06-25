"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./routes/router"));
// Configuration
const port = 5000;
const app = express_1.default();
// Setup
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// Routes
app.use(router_1.default);
console.log(app.routes);
// Startup
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
//# sourceMappingURL=app.js.map