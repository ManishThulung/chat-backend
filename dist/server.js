"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv_1.default.config();
}
(0, database_1.connectDatabase)();
const appServer = (0, node_http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(appServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    console.log(socket);
});
const server = appServer.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
// Unhandled Promise Rejection
process.on("unhandledRejection", (error) => {
    console.log(`Error: ${error.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=server.js.map