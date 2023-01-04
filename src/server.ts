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
		name: RoleEums.MANUFACTURER,
		privileges: [privilegeEums.MANUFACTURED]
	}, {
		name: RoleEums.SHIPPER,
		privileges: [privilegeEums.SHIPPED, privilegeEums.OTHER]
	},
	{
		name: RoleEums.BUILDER,
		privileges: [privilegeEums.CONSUMED,privilegeEums.OTHER]
	}
];

	const c = await Role.insertMany(roles);
	console.log('BBB:::', c);
	*/



	
	//  const users = [{
	// 	name: 'tester',
	// 	roles: ['63b52814c864a07fc56fbab8','63b52814c864a07fc56fbab9','63b52814c864a07fc56fbaba']
	// }];
	// const a = await User.insertMany(users);
	 

});


export default server;
