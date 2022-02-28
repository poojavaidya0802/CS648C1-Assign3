const fs = require('fs');
const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');

const ProdDB = [
    {
        id: 1,
        name: 'Round neck Tshirt',
        category: 'Shirts' ,
        price: 30 ,
        imageURL: 'https://www.joinusonline.net/round-neck-t-shirt-navy.html',
    },

    {
        id: 2,
        name: 'Black Slim Fit',
        category: 'Jeans' ,
        price: 50 ,
        imageURL: 'https://www.everlane.com/products/mens-slim-black-denim-jeans',
    },
    {
        id: 3,
        name: 'Waist bow belt',
        category: 'Accessories' ,
        price: 50 ,
        imageURL: 'https://www.lyst.com/accessories/kate-spade-skinny-leather-bow-belt-black/',
    },
    {
        id: 4,
        name: 'Blue Denim Jacket',
        category: 'Jackets' ,
        price: 35 ,
        imageURL:'https://www.harley-davidson.com/us/en/shop/Womens-Bar-Shield-Logo-Denim-Jacket/p/98405-21VW'
    }


];
const resolvers = {
    Query: {
        productlist,
    },
    Mutation: {
        addprod,
    },

};

function productlist()
{
    return ProdDB;
}

function addprod( _, { product })
{
 product.id = ProdDB.length + 1;
 ProdDB.push(product);
 return product;
}
const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
});
app.use(express.static('public'));
server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
 console.log('App started on port 3000');
});