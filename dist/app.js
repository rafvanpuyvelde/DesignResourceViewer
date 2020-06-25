"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const DesignResourceController_1 = __importDefault(require("controllers/DesignResourceController"));
const port = 5000;
//const redisPort = 6379;
//const client = redis.createClient({ port: redisPort });
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/resources", DesignResourceController_1.default);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
