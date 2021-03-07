const fetch = require('node-fetch');
const myQuery = require('./queryDB');

async function getPessoa(id){ 
    return (
        
        await fetch(`https://swapi.dev/api/people/${id}`)
        .then(res => res.json())
        .then(json => {
            const {name, height, mass, gender} = json
            myQuery.abrirBanco()
            myQuery.insertBD(id, name, height, mass, gender)
        
        }).then(
            () => {
                myQuery.abrirBanco()
                const result = myQuery.queryBD(id)
                return result;

            }
        ).then(res => res) 
    )

}

module.exports = getPessoa;