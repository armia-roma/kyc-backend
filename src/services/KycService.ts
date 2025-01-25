import { AppError } from "../errors/AppError";
import { NotFoundError } from "../errors/NotFoundError";
import { IKyc } from "../models/Kyc";
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
		return await KycRepository.create({
			full_name,
			phone_number,
			address,
			email,
			file_path,
			status: "pending",
			user,
		} as IKyc);
	}
	async list() {
		return await KycRepository.list();
	}
	async findById(id: string) {
		return await KycRepository.findById(id);
	}
	async approve(id: string) {
		const kyc = await KycRepository.findById(id);
		if (!kyc) {
			throw new NotFoundError("Kyc record not found");
		}

		if (kyc.status === "approved") {
			throw new AppError("Kyc is already approved");
		}

		return await KycRepository.approve(id);
	}
	async reject(id: string) {
		const kyc = await KycRepository.findById(id);
		if (!kyc) {
			throw new NotFoundError("KYC record not found");
		}

		if (kyc.status === "rejected") {
			throw new AppError("Kyc is already rejected");
		}

		return await KycRepository.reject(id);
	}
}
export default new KycService();
