const userService = require('../services/users.service');

const login = async (req, res) => {
    try {
        const {user_name, password} = req.body;

        const user = await userService.login(user_name, password);

        res.json({
            message: 'login success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports ={
    login
}