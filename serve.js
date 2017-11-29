const express = require('express')
const graphqlHTTP = require ('express-graphql')
const schema = require('./schema')
const app = express()


app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api', graphqlHTTP({ 
    schema,
    graphiql: true 
}))

app.listen(4000, () => console.log('Example app listening on port 4000!'))