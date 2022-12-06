import { connectMongoDB, dbConfig } from "./database/database";
import app from './app';
import Role from "./models/role";
import User from "./models/users";
import { privilegeEums } from './enums/privileges.enum';

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), async () => {

	await connectMongoDB();
	console.log('info', 'Auth service is running  at http://localhost:' + app.get('port'), '', '');

	/**
	 * SCRIPT to create roles with verificationStatus
	 *
	const roles = [{
		name: 'Admin',
		verificationStatus: [privilegeEums.PACKED, privilegeEums.SHIPPED, privilegeEums.INTRANSIT, privilegeEums.RECEIVED, privilegeEums.LOOKSGOOD, privilegeEums.NOTGOOD, privilegeEums.NOTRECEIVED, privilegeEums.MISMATCHQUANTITY]
	}, {
		name: 'User',
		verificationStatus: [privilegeEums.NOTRECEIVED, privilegeEums.MISMATCHQUANTITY]
	}];

	const c = await Role.insertMany(roles);
	console.log('BBB:::', c);
	*/



	/**
	 * SCRIPT to create users with roles into db
	 * 
	 const users = [{
		name: 'Ramana',
		roles: '63848c9f3b92a55c7f40a0d4'
	}, {
		name: 'Pushkhar',
		roles: '63848c9f3b92a55c7f40a0d5'
	}];
	const a = await User.insertMany(users);
	 */

});


export default server;
