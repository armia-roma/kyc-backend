import { User, IUser } from "../models/User";

class UserRepository {
	async create(user: IUser): Promise<IUser> {
		return await User.create(user);
	}

	async findByEmail(email: string): Promise<IUser | null> {
		return await User.findOne({ email });
	}
}

export default new UserRepository();
