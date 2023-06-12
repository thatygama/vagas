var data =  require("./fakeData");

const updateUser = (req, res) => {
    const { id } = req.params;

    const user_index = data.findIndex(user => user.id == id);
    if (user_index >= 0) {
        if (req && req.body) {
            // const { name, job, permissions } = req.body;
            for (const prop in req.body) {
                if (data[user_index].hasOwnProperty(prop)) {
                    data[user_index][prop] = req.body[prop];
                }
            }
        }
        res.status(200).json(data[user_index]);
    } else {
       return res.status(404).send('User not found.');
    }
};


module.exports = {
    updateUser
};