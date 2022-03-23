const { get } = require('axios')
const URL = `https://swapi.dev/api/people`

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const result = await get(url)
    return result.data.results.map(mapearPessoas)
}

async function obterTodasPessoas() {
    const url = `${URL}/?format=json`
    const result = await get(url)
    return result.data.results
}

function mapearPessoas(item) {
    return {
        nome: item.name,
        peso: item.height
    }
}

module.exports = {
    obterPessoas,
    obterTodasPessoas
}