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
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connectMongoDB = exports.dbConfig = void 0;
const Mongoose = require("mongoose");
let database;
exports.dbConfig = {
    connection: {}
};
const mongoOptions = {
    autoIndex: true,
    minPoolSize: 10,
    maxPoolSize: 200,
    maxIdleTimeMS: 3000,
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const connectMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        if (database) {
            return;
        }
        let dbUrl = process.env.DB_LOCAL_URL;
        Mongoose.connect(dbUrl, mongoOptions);
        database = Mongoose.connection;
        database.on("open", () => __awaiter(void 0, void 0, void 0, function* () {
            exports.dbConfig.connection = database;
            console.log('info', 'Connected to database', '', '');
            resolve({});
        }));
        database.on("error", (err) => {
            reject({
                "msg": "Error connecting to database"
            });
            console.log('error', 'Error connecting to database' + err, '', err);
        });
    });
});
exports.connectMongoDB = connectMongoDB;
const disconnect = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};
exports.disconnect = disconnect;
