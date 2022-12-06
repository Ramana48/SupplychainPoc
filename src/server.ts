import { connectMongoDB, dbConfig } from "./database/database";
import app from './app';
import Role from "./models/role";
import User from "./models/users";
import { privilegeEums } from './enums/privileges.enum';
import { RoleEums } from "./enums/roles.enum";

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
		name: RoleEums.SUPPLIER,
		privileges: [privilegeEums.SUPPLIED]
	}, {
		name: RoleEums.MANUFACTURER,
		privileges: [privilegeEums.MANUFACTUREDANDSHIPPED, privilegeEums.OTHER]
	},
	{
		name: RoleEums.REGULATOR,
		privileges: [privilegeEums.CHECKEDANDREGULATED,privilegeEums.OTHER]
	},
	{
		name: RoleEums.LOGISTICS,
		privileges: [privilegeEums.DSIPATCHEDANDINTRANSIT,privilegeEums.OTHER]
	},
	{
		name: RoleEums.WHOLESALER,
		privileges: [privilegeEums.RECEIVEDANDSTOCKED,privilegeEums.OTHER]
	},
	{
		name: RoleEums.RETAILER,
		privileges: [privilegeEums.CHECKEDANDVERIFIED,privilegeEums.OTHER]
	},
	{
		name: RoleEums.CONSUMER,
		privileges: [privilegeEums.CHECKEDANDBOUGHT,privilegeEums.OTHER]
	}
];

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
