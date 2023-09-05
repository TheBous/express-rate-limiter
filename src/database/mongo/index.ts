
import mongoose from "mongoose";

class Mongo {
    constructor() {
        this._connect();
    }
    async _connect() {
        try {
            const connection = await mongoose.connect(`mongodb://${process.env.MONGO_SERVER}/${process.env.MONGO_DB_NAME}`);
            console.info(connection);
        } catch (e) {
            console.error(e);
        }
    }
}

const mongo = new Mongo();
export default mongo;
