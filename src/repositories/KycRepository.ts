import { Kyc, IKyc } from "../models/Kyc";
class KycRepository {
	async create(kyc: IKyc): Promise<IKyc> {
		return await Kyc.create(kyc);
	}
}
export default new KycRepository();
