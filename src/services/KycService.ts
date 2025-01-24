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
	async approve(id: string) {
		try {
			const kyc = await KycRepository.findById(id);
			if (!kyc) {
				throw new Error("KYC record not found");
			}

			if (kyc.status === "approved") {
				throw new Error("KYC is already approved");
			}

			const updatedKyc = await KycRepository.approve(id);
			return updatedKyc;
		} catch (error: any) {
			throw error;
		}
	}
	async reject(id: string) {
		try {
			const kyc = await KycRepository.findById(id);
			if (!kyc) {
				throw new Error("KYC record not found");
			}

			if (kyc.status === "rejected") {
				throw new Error("KYC is already rejected");
			}

			const updatedKyc = await KycRepository.reject(id);
			return updatedKyc;
		} catch (error: any) {
			throw error;
		}
	}
}
export default new KycService();
