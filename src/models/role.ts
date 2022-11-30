import { Model, model, Schema } from 'mongoose';
import { privilegeEums } from '../enums/privileges.enum';

export const rolesSchema: Schema = new Schema({
	name: {
		type: String,
		required: true
	},
	verificationStatus: {
		type: [String],
		enum: [privilegeEums.PACKED, privilegeEums.SHIPPED, privilegeEums.INTRANSIT, privilegeEums.RECEIVED, privilegeEums.LOOKSGOOD, privilegeEums.NOTGOOD, privilegeEums.NOTRECEIVED, privilegeEums.MISMATCHQUANTITY],
		default: [privilegeEums.PACKED]
	},
	createdDate: {
		type: Date,
		default: Date.now
	}
});

const Role: Model<any> = model('role', rolesSchema);

export default Role;