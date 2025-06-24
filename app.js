const express = require('express')
const produtoRouter = require('./router/produto_router')

const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/produtos', produtoRouter);

app.listen(port, () => {
  console.log(`API running on port ${port}`)
})
