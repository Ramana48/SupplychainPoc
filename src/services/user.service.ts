import Constants from "../constants/constants";
import User from "../models/users";
import UtilityService from "../utils/utility.service";

export default class UserService {

    async userLogin(req, res) {
        try {
            const userName = req.body.userName;
            const password = req.body.password;

            if (password != Constants.NETWORK.PASSWORD) {
                return res.status(400).send({ message: 'Invalid password' })
            }

            const user = await User.aggregate(
                [
                    { $unwind: "$roles" },
                    {
                        $lookup: {
                            from: "roles",
                            localField: "roles",
                            foreignField: "_id",
                            pipeline: [
                                { "$project": { "_id": 1, "name": 1, "verificationStatus":1 } }
                            ],
                            as: "role"
                        }
                    },
                    {
                        $match: {
                            name: userName
                        }
                    }
                ]
            );
            console.log('user::',user);

            if (!user || user.length === 0) {
                UtilityService.returnNotFoundException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.USER.USER_NOT_FOUND, {});
                return;
            }

            if (!user[0].role || user[0].role.length === 0) {
                return res.status(Constants.NETWORK.HTTP_STATUS_CODE.BadRequest).send({
                    error: '5',
                    message: 'Not a valid user',
                    data: {},
                });
            }
            
            return user;
        } catch (error) {
            UtilityService.returnDbException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.USER.USER_LOGIN, error);
            return;
        }
    }
}