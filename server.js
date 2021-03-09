const Hapi = require('@hapi/hapi');
const getPerson = require('./modules/getPessoa');
const showAllDB = require('./modules/queryDB').showAllDB;


const init = async () =>{
    const server = Hapi.server({
    
        port: 3000,
        host: 'localhost'
    }) 

    server.route({
        method:'GET',
        path: '/',
        handler: async (request, h) => {
            return await showAllDB()
        }
    })

    server.route({
        method:'GET',
        path: '/query',
        handler: async (request, h) =>{
            const queryParam = request.query
            const response = await getPerson(queryParam.id)
            console.log('Stored :\n', response)
            return {person: response}
        }
    })

    await server.start()
    console.log('The server is now up and running.\nAccess http://localhost:3000')
}

process.on('unhandledRejection', (err)=> {
    console.error(err)
    process.exit(1)
})

init()