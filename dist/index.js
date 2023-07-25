"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./Server/server"));
const globalErrorHandler_1 = __importDefault(require("./Utilities/globalErrorHandler"));
const Config_1 = __importDefault(require("./Config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Router_1 = __importDefault(require("./App/Router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, server_1.default)();
app.get("/", (req, res) => {
    res.send("<h1 style='text-align: center; padding: 20px; color:#753a88'><span style='color: green'>🛢 </span>Server is successfully running 🚀</h1>");
});
app.use("/api/v1", Router_1.default);
app.use(globalErrorHandler_1.default);
app.listen(Config_1.default.port, () => {
    console.log(`Server running on port: ${Config_1.default.port} 🚀`);
});
app.all("*", (req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        status: "fail",
        message: `🚦 Requested ${req.originalUrl} this Route Not Found 💥`,
    });
});
//# sourceMappingURL=index.js.map