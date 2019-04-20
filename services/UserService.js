import User from "../models/user"

export async function getUserByToken(token) {
    const {_id} = token;
    try {
        var user = await User.findOne({_id}, {password: 0});  //Нашли юзера по id и убрали с него пароль
    } catch (e) {
        throw e;
    }
    return user;
}
