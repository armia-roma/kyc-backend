import {IKyc} from "../models/Kyc";
import KycRepository from "./../repositories/KycRepository";
class KycService {
	async create({
		full_name,
		phone_number,
		address,
		email,
		file_path,
		user,
	}: Partial<IKyc>) {
		try {
			const kyc = await KycRepository.create({
				full_name,
				phone_number,
				address,
				email,
				file_path,
				status: "pending",
				user,
			} as IKyc);
			return kyc;
		} catch (error: any) {
			if (error.name === "ValidationError") {
				throw new Error(`Validation error: ${error.message}`);
			}

			throw new Error("Failed to create KYC record");
		}
	}
}
export default new KycService();
