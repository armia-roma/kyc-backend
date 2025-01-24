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
	async list() {
		try {
			const kycs = await KycRepository.list();
			return kycs;
		} catch (error: any) {
			throw new Error("Failed to list KYC records");
		}
	}
	async findById(id: string) {
		try {
			const kyc = await KycRepository.findById(id);
			return kyc;
		} catch (error: any) {
			throw new Error("Failed to find KYC record");
		}
	}
}
export default new KycService();
