const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const test = async (db) => {
    // await db.collection("test").insertOne({ test1: "testing" });

    await db.collection("admin-resto-info").updateOne(
        // filter
        {
            _id: "713472b7-19ca-4f6d-a092-4753190bac16"
        },
        // mutation
        {
            $push: {
                menu: {
                    _id: "4bdf33ad-4dba-45cb-a763-525273365a54",
                    itemTitle: "Pasta",
                    itemDetails: "linguini and cheese",
                    itemPrice: "$10",
                    itemImage: "https://res.cloudinary.com/daclknscq/image/upload/v1633103343/wmtocgpid5xygs8rkawp.png"
                }
            }
        })
    process.exit();
}

async function setup() {

    const client = new MongoClient(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await client.connect();

    return client.db("FinalProject-Bootcamp");
}
setup()
    .then(test)