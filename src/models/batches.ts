import { Model, model, Schema } from 'mongoose';
import { privilegeEums } from '../enums/privileges.enum';

export const batchesSchema: Schema = new Schema({
	products: [{
		type: Schema.Types.ObjectId,
		ref: 'Product'
	}],
	quantity: {
		type: Number,
		required: true
	},
	userId: {
		type: String
	},
	latitude: {
		type: String,
	},
	longitude: {
		type: String,
	},
	imageUrl: {
		type: String,
	},
	status: {
		type: String,
		required: true,
		enum: Object.values(privilegeEums)
	},
	isAllOkay: {
		type: Boolean,
		default: false
	},
	comment: {
		type: String,
		default: ''
	},
	rejectedById: {
		type: String
	},
	rejectedByName: {
		type: String
	},
	batchId: {
		type: String,
		unique: true,
		required: true
	},
	createdDate: {
		type: Date,
		default: Date.now
	}
});

const Batches: Model<any> = model('batches', batchesSchema);

export default Batches;