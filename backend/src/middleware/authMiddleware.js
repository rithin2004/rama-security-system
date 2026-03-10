import { auth, db } from "../config/firebase.js";

export const authenticate = async (req, res, next) => {

  try {

    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    const token = header.split(" ")[1];

    const decoded = await auth.verifyIdToken(token);

    const uid = decoded.uid;

    // find employee using firebaseUid
    const snapshot = await db
      .collection("employees")
      .where("firebaseUid", "==", uid)
      .get();

    if (snapshot.empty) {
      return res.status(403).json({ error: "Employee not registered" });
    }

    const employee = snapshot.docs[0].data();

    req.user = employee;

    next();

  } catch (error) {

    res.status(401).json({ error: "Invalid or expired token" });

  }

};