import * as Mongoose from "mongoose";

let database: Mongoose.Connection;

export const dbConfig = {
    connection: {}
}

const mongoOptions = {
    autoIndex: true,
    minPoolSize: 10,
    maxPoolSize: 200,
    maxIdleTimeMS: 3000,
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export const connectMongoDB = async () => {

    return new Promise((resolve, reject) => {
        if (database) {
            return;
        }
        let dbUrl: any = process.env.DB_LOCAL_URL;

        Mongoose.connect(dbUrl, mongoOptions);
        database = Mongoose.connection;
        database.on("open", async () => {
            dbConfig.connection = database;
            console.log('info', 'Connected to database', '', '');
            resolve({});
        });
        database.on("error", (err) => {
            reject({
                "msg": "Error connecting to database"
            });
            console.log('error', 'Error connecting to database' + err, '', err);
        });
    })
};

export const disconnect = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};
