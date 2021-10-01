// check if user logged is an admin with _id
const adminCheckMiddleware = async (req, res, next) => {
    const { adminId } = req.body;
    if (!adminId) {
        return res.status(401).json({ error: "Missing user" })
    }

    const { db } = req.app.locals;
    const result = await db.collection("admin-resto-info").findOne({ userId: adminId })

    if (!result) {
        return res.status(401).json({ error: "User unauthorized" })
    }

    res.locals.adminUser = result;

    next();
};

module.exports = { adminCheckMiddleware }
