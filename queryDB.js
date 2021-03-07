const mysql = require('mysql');

const myQuery = {
    
    //queryResult, 

    abrirBanco : () => {

        con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "api01",
        })
    
    },
    
    queryBD: (id) => {
        return new Promise ((resolve,reject)=>{
            con.connect(err => {
            
                if(!err){
                    
                    
                    con.query(`SELECT * FROM pessoa WHERE pessoa.id=${id}`,(err, result, fields) => {
                    
                    if (err) throw err
                    
                    resolve(result)
                    
                    con.end()
                    })
                
                }else{
                    reject(err);
                }
            
            })
        })
            
    },


    insertBD: (id,nome='Desconhecido',height=0,mass=0,gender='n/a') => {
 
            con.connect(err => {
                if(err) throw err
                con.query(`
                INSERT pessoa 
                values (${id}, "${nome}","${height}", "${mass}","${gender}");
                `,(err, result, fields) => {
                    if (err) {
                        if(err.code=='ER_DUP_ENTRY'){
                            console.log('O registro já existe em nosso banco de dados!')
                            return
                        }else{throw err}
                    }
            
                    console.log(`Sucesso! ${nome} foi cadastrado(a) com o ID ${id}`)
                    //con.end()
                })
            
            })
   
         
    }
    
    
    
}


// myQuery.abrirBanco()
// myQuery.insertBD(pessoa)
//myQuery.queryBD(2)

module.exports = myQuery;