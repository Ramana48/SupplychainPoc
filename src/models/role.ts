import { Model, model, Schema } from 'mongoose';
import { privilegeEums } from '../enums/privileges.enum';

export const rolesSchema: Schema = new Schema({
	name: {
		type: String,
		required: true
	},
	privileges: {
		type: [String],
		enum: [privilegeEums.MANUFACTURED, privilegeEums.SHIPPED, privilegeEums.CONSUMED, privilegeEums.OTHER],
		default: [privilegeEums.MANUFACTURED]
	},
	createdDate: {
		type: Date,
		default: Date.now
	}
});

const Role: Model<any> = model('roles', rolesSchema);

export default Role;