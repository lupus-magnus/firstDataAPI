const fetch = require('node-fetch');
const myQuery = require('./queryDB');

async function getPerson(id){ 
    return (

        await fetch(`https://swapi.dev/api/people/${id}`)
        .then(res => res.json())
        .then(async json => {

            const {name, height, mass, gender} = json
            myQuery.openDB()
            const insert = await myQuery.insertDB(id, name, height, mass, gender)
            console.log(insert)
            
            myQuery.openDB()
            const queryResult = myQuery.queryDB(id)
            return queryResult

        }).then(queryResult => queryResult)
    )

}

module.exports = getPerson;