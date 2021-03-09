const mysql = require('mysql');

const myQuery = {


    openDB: () => {
        con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "api01",
        })

    },

    queryDB: (id) => {
        return new Promise((resolve, reject) => {
            con.connect(err => {

                if (!err) {
                    con.query(`SELECT * FROM pessoa WHERE pessoa.id=${id}`, (err, result, fields) => {

                        if (err) throw err

                        resolve(result[0])

                        con.end()
                    })

                } else {
                    reject(err);
                }

            })
        })

    },

    insertDB: (id, nome = 'Desconhecido', height = 0, mass = 0, gender = 'n/a') => {
        return new Promise((resolve, reject) => {
            con.connect(err => {
                if (err) reject(err)
                con.query(`
                    INSERT pessoa 
                    values (${id}, "${nome}","${height}", "${mass}","${gender}");
                    `, (err, result, fields) => {
                    if (err) {
                        if (err.code == 'ER_DUP_ENTRY') {
                            resolve('O registro já existe em nosso banco de dados!')
                        } else { reject(err) }
                    }

                    resolve(`Sucesso! ${nome} foi cadastrado(a) com o ID ${id}`)
                    con.end()
                })

            })

        })



    },

    showAllDB : () => {
        return new Promise((resolve,reject)=>{
            myQuery.openDB()
            con.connect(err => {
                if (err) reject(err)
                con.query(`SELECT * FROM pessoa `, (err,result,fields) => {
                    if (err) reject(err)
                    resolve(result)
                    con.end()
                })
            })
        })
    }



}

module.exports = myQuery;