import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    // console.log("AUTH HEADER:", authHeader);
    // check token exists
    if (!authHeader) {
        return res.status(401).json({ message: "No token" });
    }

    // 🔥 extract actual token
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message); // debug
        return res.status(401).json({ message: "Invalid token" });
    }
};