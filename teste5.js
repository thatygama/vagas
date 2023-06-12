

const userReads = (req, res) => {
    const name = req.query.name;
    if (!name)
        return res.status(400).send('The field Name is required.');

    const user_index = data.findIndex(user => user.name === name);
    if (user_index >= 0) {
        const readCount = data[user_index].reads || 0;
        res.send(`User ${name} was read ${readCount} time${!readCount ? '' : 's'}.`);
    } else
        return res.status(404).send('User not found.');
};

module.exports = {
    userReads
};