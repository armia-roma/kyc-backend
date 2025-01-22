import { IKyc } from "../models/Kyc";
import KycRepository from "./../repositories/KycRepository";
class KycService {
	async create(
		full_name: string,
		phone_number: string,
		address: string,
		email: string,
		file_path: string
	) {
		const kyc = await KycRepository.create({
			full_name,
			phone_number,
			address,
			email,
			file_path,
			status: "pending", // first status
		} as IKyc);
		return kyc;
	}
}
export default new KycService();
