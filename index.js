const Hapi = require('@hapi/hapi');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const getPessoa = require('./getPessoa');


const init = async () =>{
    const server = Hapi.server({ //server criado
    
        port: 3000,
        host: 'localhost'
    }) 

    //ROTA COM PARAMETRO POR QUERY
    
    server.route({
        method:'GET',
        path: '/query',
        handler: async (request, h) =>{
            const queryParam = request.query
            const response = await getPessoa(queryParam.id)
            console.log('log from index', response)
            return {pessoa: response}
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