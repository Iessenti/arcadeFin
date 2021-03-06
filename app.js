const express = require('express')
const config = require('config')
const MongoClient = require("mongodb").MongoClient

const bodyParser = require("body-parser")

const app = express()
const jsonParser = express.json()
const urlencodedParser = bodyParser.urlencoded({extended: false})
const bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(16);
let orderNum = 1;
var path = require('path')


app.post('/getProductsBySex', jsonParser, (request,response) => {
const dbClient = new MongoClient(config.get("mongoUri"), {useNewUrlParser:true, useUnifiedTopology: true})		
	dbClient.connect( (err,client) => {
				const db = client.db("products")
				const collection = db.collection("Products-list")
				
				collection.find({sex: request.body.sex}).toArray((err,result) => {
					response.send(result)
					client.close()
				})

	})
})

app.post('/getAllProducts', jsonParser, (request, response) => {
	const dbClient = new MongoClient(config.get('mongoUri'), {useNewUrlParser:true, useUnifiedTopology:true})
	dbClient.connect ((err,client) => {
		const db = client.db('products')
		const collection = db.collection('Products-list')

		collection.find().toArray((err,result) => {
			response.send(result)
			client.close()
		})
	})
})

const f = async (requestTitle, requestSize) => {
	const dbClient = new MongoClient(config.get('mongoUri'), {useNewUrlParser:true, useUnifiedTopology: true})
	dbClient.connect( (err,client) => {
		const db = client.db('products')
		const collection = db.collection('Products-list')
		collection.findOne({title: requestTitle}, (err, res) => {

					sizeStr = res.sizes
							let posArr = []
						    let sizesArr = []
						    const target = ' '
						    let position = 0;
						    let pos = -1;
						    let finStr = ''
						    while ((pos = sizeStr.indexOf(target, pos + 1)) != -1) {
						    	posArr.push(pos)
						    }

						    for (let i = 0; i < (posArr.length + 1); i++) {
						        let str = sizeStr.slice(position, posArr[i])
						        if (str[0] + str[1] == requestSize) {
						          let s = str.slice(2)
						          let newInt = parseInt(s) - 1
						          if (i == posArr.length) {
								 finStr = finStr + str[0] + str[1] + String(newInt) 
						       	  } else {
								finStr = finStr + str[0] + str[1] + String(newInt) + sizeStr.slice(posArr[i])
								break
							  }
							 } else if (i != posArr.length){
						        	finStr = finStr + str + ' '
						        } else {
						        	finStr = finStr + str
						        }

						        position = posArr[i] + 1
						    }
						    collection.findOneAndUpdate({title: requestTitle}, {$set: {sizes: finStr}}, function(err, result) { client.close()})
						})

//					client.close()
	})
}

app.post('/addOrder', jsonParser, (request,response) => {
	const dbClient = new MongoClient(config.get("mongoUri"), {useNewUrlParser:true, useUnifiedTopology: true})
	dbClient.connect( (err,client) => {
				const db = client.db("orders")
				const collection = db.collection("Orders-list")
				orderNum += 1;

				for (let i = 0; i < request.body.order.length; i++) {
					let order = {num: orderNum, address: request.body.address.address, phone: request.body.address.phone, item: request.body.order[i].title, size:request.body.order[i].size, state: request.body.state, status: '1'}
					collection.insertOne(order, (err,result) => {
						f(request.body.order[i].title, request.body.order[i].size)
						client.close()
					})
				}
				response.send({id:orderNum})
				
	})
})

app.post('/checkOrderState', jsonParser, (request,response) => {
	const dbClient = new MongoClient(config.get("mongoUri"), {useNewUrlParser:true, useUnifiedTopology: true})
	dbClient.connect( (err,client) => {
				const db = client.db("orders")
				const collection = db.collection("Orders-list")
				
				collection.findOne({num: request.body.id}, function(err, result) {
					if (result != null) {
						response.send({status: result.status})
					}
					client.close()
				})

	})
})

app.post('/getProductsByCatOrBrand', jsonParser, (request,response) => {
	const dbClient = new MongoClient(config.get("mongoUri"), {useNewUrlParser:true, useUnifiedTopology: true})
	dbClient.connect( (err,client) => {
				const db = client.db("products")
				const collection = db.collection("Products-list")
				
				if (request.body.type === "C") {
					collection.find({category: request.body.category}).toArray((err,result) => {
						response.send(result)
						client.close()
					})
				} else if (request.body.type === 'B') {
					collection.find({brand: request.body.category}).toArray((err,result) => {
						response.send(result)
						client.close()
					})
				} else if (request.body.type === 'A') {
					collection.find().toArray( (err,result) => {
						response.send(result); client.close();
					})
				}
	})
})

app.post('/getProductsBySex', jsonParser, (request,response) => {
	const dbClient = new MongoClient(config.get("mongoUri"), {useNewUrlParser:true, useUnifiedTopology: true})
	dbClient.connect( (err,client) => {
				const db = client.db("products")
				const collection = db.collection("Products-list")
				
				collection.find({sex: request.body.sex}).toArray((err,result) => {
					response.send(result)
					client.close()
				})

	})
})

app.post('/signup', jsonParser, (request,response) => {
	const dbClient = new MongoClient(config.get("mongoUri"), {useNewUrlParser:true, useUnifiedTopology: true})
	dbClient.connect( (err,client) => {
				const db = client.db("users")
				const collection = db.collection("Users-list")
				
				collection.findOne({phone: request.body.phone}, (err,result) => {
					if (result == null) {
						account = {phone: request.body.phone, password: bcrypt.hashSync(request.body.password, salt), name: request.body.name}
						collection.insertOne(account, (err,result) => {
							response.send({answer: 'ok'})
						})
					} else if ( request.body.password.length < 8 ) { response.send({answer: 'less'}) }
					else if (request.body.phone == result.phone) { response.send({answer:'exist'}) }
					client.close()
				})
	})
})

app.post('/login', jsonParser, (request,response) => {
	const dbClient = new MongoClient(config.get("mongoUri"), {useNewUrlParser:true, useUnifiedTopology: true})
	dbClient.connect( (err,client) => {
				const db = client.db("users")
				const collection = db.collection("Users-list")
				
				collection.findOne({phone: request.body.phone}, (err,result) => {
					if (result == null) { response.send({ answer: "notexist"}) }
					else if (bcrypt.hashSync(request.body.password, salt) != result.password) { response.send({ answer: "passNot"}) }
					else { response.send({answer: request.body.name}) }
					client.close()
				})

	})
})

app.post('/checkOrderState', jsonParser, (request,response) => {
	const dbClient = new MongoClient(config.get("mongoUri"), {useNewUrlParser:true, useUnifiedTopology: true})
	dbClient.connect( (err,client) => {
				const db = client.db("orders")
				const collection = db.collection("Orders-list")
				
				collection.findOne({id: request.body.id}, (err,result) => {
					response.send(result)
					client.close()
				})

	})
})

app.post('/addNewProduct', jsonParser, (request, response) => {
	const dbClient = new MongoClient(config.get("mongoUri"), {useNewUrlParser:true, useUnifiedTopology: true})

	dbClient.connect( (err,client) => {
				const db = client.db("products")
				const collection = db.collection("Products-list")
				let data = {
					title: request.body.title,
					price: request.body.price,
					sex: request.body.sex,
					category:request.body.category,
					mainPhoto: request.body.mainPhoto,
					secPhoto: request.body.secPhoto,
					thiPhoto: request.body.thiPhoto,
					description: request.body.description,
					sizes: request.body.sizes,
					color: request.body.color
				}
				collection.insertOne(data, function(err,result) {
					if(err) {
						return console.log(err)
					}
					client.close()
				})

	})
})

app.post('/statusSetter', jsonParser, (request, response) => {
	const dbClient = new MongoClient(config.get("mongoUri"), {useNewUrlParser:true, useUnifiedTopology: true})

	dbClient.connect( (err,client) => {
				const db = client.db("orders")
				const collection = db.collection("Orders-list")
				
				collection.findOneAndUpdate(
					{num: request.body.id},
					{ $set: {status:'0'}},
					(err, result) => {
						client.close()
					}
				)

	})
})

app.get('/orders',  (request, response) => {
	const dbClient = new MongoClient(config.get("mongoUri"), {useNewUrlParser:true, useUnifiedTopology: true})

	dbClient.connect( (err,client) => {
				const db = client.db("orders")
				const collection = db.collection("Orders-list")
				
				collection.find().toArray((err,result) => {
					response.json(result)
				})

	})

})

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

async function start() {
	try {
		app.listen(config.get('port'), () => console.log(`App has been started on port ${5000}...`))
	} catch(e) {
		console.log('Server error', e.message)
		process.exit(1)
	}
}

start() 
