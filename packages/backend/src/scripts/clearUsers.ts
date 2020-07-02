import { connectDatabase } from "../database";

import User from "../modules/user/UserModel";


(async () => {
    console.log('Connection to the database...');
    await connectDatabase();

    await User.deleteMany({}, () => console.log('deleted'));

    process.exit(0);
})();
