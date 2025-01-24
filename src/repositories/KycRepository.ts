import {Kyc, IKyc} from "../models/Kyc";
class KycRepository {
	async create(kyc: IKyc): Promise<IKyc> {
		return await Kyc.create(kyc);
	}
	async list(): Promise<IKyc[]> {
		return await Kyc.find();
	}
	async findById(id: string): Promise<IKyc | null> {
		return await Kyc.findById(id);
	}
}

export default new KycRepository();
