const userRepository = require('../repositories/users.repository');

const login = async (username,password) => {
    const user = await userRepository.getUsername(username,password);
    
    if (!user) {
        throw new Error('User not found');
    }

    if (user.password !== password) {
        throw new Error('Invalid password');
    }

    const role_code = user.role_id === 1 ? 'ADMIN' : 'USER';

    return {
        ...user,
        role_code
    }
};

const getUserId = async (id) => {
    return await userRepository.getUserId(id);
};

module.exports = {
    login,
    getUserId
};