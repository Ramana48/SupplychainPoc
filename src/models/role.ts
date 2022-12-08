import { Model, model, Schema } from 'mongoose';
import { privilegeEums } from '../enums/privileges.enum';

export const rolesSchema: Schema = new Schema({
	name: {
		type: String,
		required: true
	},
	privileges: {
		type: [String],
		enum: [privilegeEums.RECEIVED, privilegeEums.MANUFACTUREDANDSHIPPED, privilegeEums.CHECKEDANDREGULATED, privilegeEums.DSIPATCHEDANDINTRANSIT, privilegeEums.RECEIVEDANDSTOCKED, privilegeEums.CHECKEDANDVERIFIED, privilegeEums.CHECKEDANDBOUGHT, privilegeEums.OTHER],
		default: [privilegeEums.MANUFACTUREDANDSHIPPED]
	},
	createdDate: {
		type: Date,
		default: Date.now
	}
});

const Role: Model<any> = model('roles', rolesSchema);

export default Role;