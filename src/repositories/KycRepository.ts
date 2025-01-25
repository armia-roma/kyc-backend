import { Kyc, IKyc } from "../models/Kyc";

class KycRepository {
	create(kyc: IKyc) {
		return Kyc.create(kyc);
	}

	list(): Promise<IKyc[]> {
		return Kyc.find();
	}

	findById(id: string): Promise<IKyc | null> {
		return Kyc.findById(id);
	}

	approve(id: string) {
		return Kyc.findByIdAndUpdate(id, { status: "approved" });
	}

	reject(id: string) {
		return Kyc.findByIdAndUpdate(id, { status: "rejected" });
	}
}

export default new KycRepository();
