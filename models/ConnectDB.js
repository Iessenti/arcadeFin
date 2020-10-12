const MongoClient = require("mongodb").MongoClient
const dbClient = new MongoClient(config.get("mongoUri"), {useNewUrlParser:true})

export const ConnectDB = () => {
	await dbClient.connect( (err,client) => {
		try {
			console.log('Database connected')
		} catch(e) {
			console.log(e.message)
		}
	})
}