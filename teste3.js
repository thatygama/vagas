var data =  require("./fakeData");


const destroyUser = (req, res) => {
    const { id } = req.params;

    const user_index = data.findIndex(user => user.id == id);
    if (user_index >= 0)
        data[user_index] = null;
    else
        return res.status(404).send('User not found.');

    res.status(200).send('User deleted');
};


module.exports = {
    destroyUser
};