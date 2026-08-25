import	bcrypt	from	'bcryptjs';
require('dotenv').config() ;


const	SALT_ROUNDS	= process.env.SALT;	


	const	hashPassword=async(plain)=>	await bcrypt.hash(plain,SALT_ROUNDS);
	const	verifyPassword	=async	(plain,	hash)	=>	await bcrypt.compare(plain,	hash);

    module.exports= {hashPassword,verifyPassword} ;