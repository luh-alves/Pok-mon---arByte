const fs = require('fs')
function escreverPokemons(pokemons) { 
    var jsonString = JSON.stringify(pokemons)
    fs.writeFileSync('pokedex.json', jsonString)
    
}
function lerPokemons() {
    try {
        var pokemons = fs.readFileSync('pokedex.json')
        return JSON.parse(pokemons)
    } catch (error) {
        return []
    }

}
function salvarPokemon(pokemon) {
    var pokedex = lerPokemons()
    pokedex.push(pokemon)
    escreverPokemons(pokedex)
}

exports.salvarPokemon = salvarPokemon