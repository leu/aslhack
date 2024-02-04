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
		password: 'postgres'
	})

export default sql