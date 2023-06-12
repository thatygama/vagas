var data =  require("./fakeData");

const getUser = ( req, res ) => {
    const { id } = req.params;

    const user_index = data.findIndex(user => user.id == id);
    if (user_index >= 0) {
        data[user_index].reads = data[user_index].reads ? data[user_index].reads + 1 : 1;
        res.status(200).json(data[user_index]);
    } else
        return res.status(404).send('User not found.');

};

const getUsers = (req, res) => {
    try {
        res.status(200).json(data);
    } catch (error) {
        res.status(404).send('Users not found.');
    }
};

module.exports = {
    getUser,
    getUsers
};