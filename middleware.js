var data = require("./fakeData");

class CheckPermissions {
    destroyUser (req, res, next) {
        if (req.session && req.session.user) {
            const { id } = req.session.user;
            const user = data.find(elem => elem.id == id);
            if (user) {
                if (!user.permissions) {
                    user.permissions = {
                        destroy_user: true,
                        update_user: true
                    };
                }
                if (!user.permissions.destroy_user) {
                    return res.status(403).send("You don't have permission to delete users.");
                }
                next();
            } else
            return res.status(403).send("You are not logged in!");
        }
        return res.status(403).send("You are not logged in!");
    };

    updateUser (req, res, next) {
        if (req.session && req.session.user) {
            const { id } = req.session.user;
            const user = data.find(elem => elem.id == id);
            if (user) {
                if (!user.permissions) {
                    user.permissions = {
                        destroy_user: true,
                        update_user: true
                    };
                }
                if (!user.permissions.update_user) {
                    return res.status(403).send("You don't have permission to update users.");
                }
                next();
            } else
            return res.status(403).send("You are not logged in!");
        }
        return res.status(403).send("You are not logged in!");
    };
};

module.exports = CheckPermissions;