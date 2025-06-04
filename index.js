import express from "express"

const app = express()

const port = 3000

app.use(express.json())

let teaData = []
let nextId = 1


// Create
app.post('/teas', (req,res)=>{
    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})


//Read all tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})


//Read teas with id
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find((tea) => tea.id === parseInt(req.params.id))
    console.log(tea);
    
    if(!tea){
        return res.status(404).send("Items not found")
    } 
    res.status(200).send(tea)
    
});



app.put('/teas/:id', (req,res)=>{
    const tea = teaData.find((tea) => tea.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Items not found")
    } 
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

app.delete('/teas/:id',(req,res)=>{
    const index = teaData.findIndex((tea) => tea.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('Item not found')
    }
    teaData.splice(index,1)
    return res.status(204).send('deleted')
})

app.listen(port, ()=>{
    console.log(`Server is listerning at ${port}`)
})