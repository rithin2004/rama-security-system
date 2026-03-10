export const requireRole = (allowedRoles = []) => {

  return (req, res, next) => {

    try {

      const user = req.user;

      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          error: "You are not authorized to perform this action"
        });
      }

      next();

    } catch (error) {

      res.status(500).json({ error: error.message });

    }

  };

};