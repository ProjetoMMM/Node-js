const router = require('express').Router()

const Person = require('../models/Person')
//create - criação de dados

// rotas da api
router.post('/', async (req,res) =>{
    //req.body
    const {name, salary, approved} = req.body

    if(!name)
    {
        res.status(422).json({error: 'defina o nome'})
        return
    }
    if (!salary && salary == 0)
    {
        res.status(422).json({error: 'defina o salário'})
        return
    }
   /* if (!approved)
    {
        res.status(422).json({error:'informe o estado'})
    }*/
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

//read -- leitura de dados 
router.get('/', async (req, res) => {

    try {
        const people = await Person.find() // garante que todos os dados sejam retornados
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id
     
    try {
        
        const person = await Person.findOne({_id: id})
        if(!person)
        {
            res.status(422).json({message: 'o usuario não foi encontrado'})
            return
        }
        res.status(200).json(person)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//update - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) =>{
    
    const id = req.params.id
    const {name, salary, approved} = req.body
    const person = 
    {
        name,
        salary,
        approved,
    }
    
    try {
        
        const updatedPerson = await Person.updateOne({_id: id}, person)
        if (updatedPerson.matchedCount === 0)
        {
            res.status(422).json({ message: 'o usuario não foi encontrado' })
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// delete - deletar dados

router.delete('/:id', async (req, res)=>{

    const id = req.params.id
    const person = await Person.findOne({_id: id})
        if(!person)
        {
            res.status(422).json({message: 'o usuario não foi encontrado'})
            return
        }
        try {
            
            await Person.deleteOne({_id: id})

            res.status(200).json({message: 'usuário removido com sucesso'})
        } catch (error) {
            res.status(500).json({error: error})
        }
})
module.exports = router

