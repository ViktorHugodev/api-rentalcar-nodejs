import express from 'express'

const app = express()
app.use(express.json())

app.get('/user', (request, response) => {
  return response.status(200).json({message: 'Hello world'})
})

app.post('/user', (request, response) => {
  const {name, email} = request.body
  return response.status(200).json({message: 'Hello world'})
})

app.listen(3333, () => console.log('Running on port 3333'))