// configuração inicial 
const express = require('express') // vai importar a pasta EXPRESS 
const mongoose = require('mongoose')
const app = express() //executa express como uma função

const Person = require('./models/Person')

// forma de ler JSON / middlewares-- recursos executados entre as requisições e respostas
app.use (
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
// rotas da api
app.post('/person', async (req,res) =>{
    //req.body
    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }
    try {
        // criando dados 
        await Person.create(person)
        res.status(201).json({message: 'Pessoa inserida com sucesso'})
    } catch(error)
        {
            res.status(500).json({erro: error})
        }

})

// rota inicial / endpoint
app.get('/', (req, res)=>{ // a partir da barra ele chama req e res

    // mostrar requisição
    res.json({message: 'Oi express'}) // resposta para a minha rota BARRA é um JSON
    //message é uma chave 
}) 

//AgUdZGJJn8tE7lBy senha


// entregar uma porta para ser acessado
//const DB_USER = 'gabriel'
//const DB_PASSWORD = encodeURIComponent('AgUdZGJJn8tE7lBy')

mongoose.connect(`mongodb+srv://gabriel:tutuga123@apicluster.mkzdr.mongodb.net/bancodaAPI?retryWrites=true&w=majority`,)
.then(()=> { 
    console.log("conectamos ao MB")
    app.listen(3000)

}) // quando dá certo -- THEN
.catch((err)=> console.log(err)) // quando gera um erro -- CATCH
 //sendo disponibilizado na porta 3000

//mongodb+srv://gabriel:<AgUdZGJJn8tE7lBy>@apicluster.mkzdr.mongodb.net/bancodaapi?retryWrites=true&w=majority
