
const app = require('./app.js')

const port = process.env.PORT || 4000
app.listen(port, (req, res) => {
    console.log(`Server is running on ${port} port.`);
})

module.exports = app