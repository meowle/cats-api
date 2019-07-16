const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')

const {
  addCats,
  deleteCatByName,
  getCatById,
  searchCatsByName,
  saveCatDescription,
} = require('./cats-controller')
const { swaggerSpec } = require('./swagger-controller')
const { serverPort } = require('./configs')

const app = express()
app.use(bodyParser.json())

/**
 * @swagger
 *
 * /cats/create-new:
 *   post:
 *     description: Добавление нового кота
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Имя кота
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
app.post('/cats/add', addCats)
app.get('/cats/get-by-id', getCatById)
app.post('/cats/search', searchCatsByName)
app.delete('/cats/delete-by-name', deleteCatByName)
app.post('/cats/save-description', saveCatDescription)

app.use('/api-docs-ui', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(serverPort)