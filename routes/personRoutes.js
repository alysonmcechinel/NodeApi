const router = require('express').Router()
const Person = require('../models/Person')


// create - criação de dados
router.post('/', async (req, res) => {

    //red.body
    // {name: "Alyson", salary: 2000, aprroved: false}
    const{name, salary, aprroved} = req.body

    if(!name){
        res.status(422).json({ error: 'O nome é obrigatorio'})
        return
    }

    const person = {
        name,
        salary,
        aprroved
    }

    // create
    try{
        //criando dados
        await Person.create(person)

        res.status(201).json({mensage: 'Pessoa inserida com sucesso!!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// get - leitura de dados
router.get('/', async (req, res) => {

    try{
        const people = await Person.find()
        res.status(200).json(people)
    }
    catch (error){
        res.status(500).json({ error: error })
    }
})

// get id
router.get('/:id', async (req, res) => {

    //extrair o dado da requisiçõa, pela url = req.params
    const id = req.params.id

    try{
        const people = await Person.findOne({_id: id})

        if(!people){
            res.status(422).json({message: 'A pessoa não foi encontrada!'})
            return
        }

        res.status(200).json(people)
    } catch(error){
        res.status(500).json({ error: error })
    }
})

// update - atualização dos dados (PUT, PATCH)
// PUT - tem que mandar completo
router.patch('/:id', async (req, res) =>{

    const id = req.params.id

    const{name, salary, aprroved} = req.body

    const person = {
        name, 
        salary, 
        aprroved,
    }

    try{

        const updatePerson = await Person.updateOne({_id: id}, person)

        if(updatePerson.matchedCount === 0){
            res.status(422).json({message: 'A pessoa não foi encontrada!'})
            return
        }

        res.status(200).json(person)

    } catch(error){
        res.status(500).json({ error: error })
    }
})


// Delete - deletar dados
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({_id: id})

    if(!person){
        res.status(422).json({message: 'A pessoa não foi encontrado!'})
        return
    }

    try{

        await Person.deleteOne({_id: id})

        res.status(200).json({message: 'Usuário removido com sucesso!'})

    } catch(error){
        res.status(500).json({ error: error })
    }
})

module.exports = router