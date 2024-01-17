const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req?.roles) {
                return res.status(401).json({ "message": "empty request" });
            }

            const rolesArray = [...allowedRoles];
            console.log(`rolesArray : ${rolesArray}`);
            console.log(`req.roles : ${req.roles}`);

            const result = req.roles.map(role => rolesArray.includes(role))
                                    .find(value => value === true);
            
            // api method에서 처리함.
            // if (!result) return res.status(401).json({ "message": "No authority" });
            console.log(`verifyRoles result : ${result}`);
            req.allowed = result;
            next();

        } catch (err) {
            next(err);
        }
    }
}

module.exports = verifyRoles;