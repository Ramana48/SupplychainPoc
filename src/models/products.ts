import { Model, model, Schema } from 'mongoose';

export const productsSchema: Schema = new Schema({
	name: {
		type: String,
		required: true
	},

	createdDate: {
		type: Date,
		default: Date.now
	}
});

const Product: Model<any> = model('products', productsSchema);

export default Product;