import postgres from 'postgres';

var sql: postgres.Sql<{}> = process.env.NODE_ENV === 'production' 
		? 
			postgres({
				host: 'localhost',
				port: 5432,
				database: 'aslearn',
				username: 'postgres',
				password: 'ILE8j#19Z44Mo9fgJPOoVJK6#T6$Y$l4X9$sYOgWcF7qbG5e1y'
			})
		:
			postgres({
				host: 'localhost',
				port: 5432,
				database: 'aslearn',
				username: 'postgres',
				password: '%sz4^Qw9$vm7tWu4vS2eYObbCn8vk^e9^rkRUrDwuBVwBXcvub'
			})

export default sql