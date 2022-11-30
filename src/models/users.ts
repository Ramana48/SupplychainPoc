import { Model, model, Schema } from 'mongoose';

export const userSchema: Schema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	roles: [{
		type: Schema.Types.ObjectId,
		ref: 'Role'
	}],
	createdDate: {
		type: Date,
		default: Date.now
	}
});

const User: Model<any> = model('users', userSchema);

export default User;