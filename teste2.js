var data =  require("./fakeData");

const storeUser = (req, res) => {
    const { name, job, permissions } = req.body;
    if (!name)
        return res.status(400).send('The field Name is required.');

    const newUser = {
        id: data.length + 1,
        name,
        job,
        permissions: permissions || {
                                        destroy_user: false,
                                        update_user: true
                                    }
    }

    data.push(newUser);
    res.status(200).send(newUser);

};


module.exports = {
    storeUser
};