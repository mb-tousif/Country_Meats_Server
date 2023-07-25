"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Config_1 = __importDefault(require("../Config"));
dotenv_1.default.config();
let server;
const url = Config_1.default.URL;
process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception 💥 Shutting down...", error);
    process.exit(1);
});
mongoose_1.default.set("strictQuery", true);
function ConnectSerer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(url);
            console.log(`🗂️ MongoDB Server connected`);
        }
        catch (error) {
            console.log(error);
        }
        process.on("unhandledRejection", (error) => {
            if (server) {
                server.close(() => {
                    console.log(error);
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
process.on("SIGTERM", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received SIGTERM signal. 🗂️ MongoDB Server disconnected");
    yield mongoose_1.default.connection.close();
    if (server) {
        server.close(() => {
            console.log("Process terminated");
        });
    }
    else {
        process.exit(1);
    }
    process.exit(0);
}));
exports.default = ConnectSerer;
//# sourceMappingURL=server.js.map