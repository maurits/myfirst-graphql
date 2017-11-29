const fetch = require('node-fetch')
const util = require('util')
const parseXML = util.promisify(require('xml2js').parseString)
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} = require('graphql')



const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: xml => JSON.stringify(xml.GoodreadsResponse.author[0].name)
    }
  })
})


module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: {type: GraphQLInt}
        },
        resolve: (root, args) => fetch(
          `https://www.goodreads.com/author/show/${args.id}?format=xml&key=FiP8kYYknpd2AtgiIgxI9A`
        )
        .then(response => response.text())
        .then(parseXML)
      },
    })
  })
})