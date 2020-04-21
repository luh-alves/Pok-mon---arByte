var user = require('readline-sync')
var importador = require('./importador')
var exportador = require('./exportador')

function salvarPokemon(pokemon) {
    var simOuNao = user.question('Deseja salvar esse POKÉMON no seu POKEDEX?(s/n): ')
    switch (simOuNao) {
        case 's':
            console.log('pokémon salvo com sucesso na  --- P O K E D E X ---')
            var res = exportador.salvarPokemon(pokemon)
            //console.log(res)
            break
        case 'n':
            escolherOpcoes()
            break
    }
}
function mostrarPokemon(pokemon) {
    console.log(`>>>>>>>>>>  P O K É M O N  <<<<<<<<<<`)
    console.log(`ID: ${pokemon.id}`)
    console.log(`Nome: ${pokemon.name}`)
    mostrarHabilidades(pokemon)
    console.log(`Tipo : ${pokemon.type.type}`)
    mostrarPokemonsQueCausamDano(pokemon)
    mostrarPokemonsQueCausamMetadeDeDanos(pokemon)
    mostrarPokemonsQueCausamODobroDeDanos(pokemon)
    mostrarPokemonsDoMesmoTipo(pokemon)
    salvarPokemon(pokemon)
}
function mostrarHabilidades(pokemon) {
    console.log(`Habilidades: `)
    pokemon.abilities.forEach(element => {
        console.log(`- ${element.name}`)
    });
}
function mostrarPokemonsQueCausamDano(pokemon) {
    console.log(`Pokémons aos quais não causam dano:`)
    if (pokemon.type.no_damage_to.length > 0) {
        pokemon.type.no_damage_to.forEach(element => {
            console.log(`- ${element.name}`)
        })
    } else {
        console.log(`Nenhum!`)
    }
}
function mostrarPokemonsQueCausamMetadeDeDanos(pokemon) {
    console.log(`Pokémons aos quais causam metade do dano:`)
    if (pokemon.type.half_damage_to.length > 0) {
        pokemon.type.half_damage_to.forEach(element => {
            console.log(`- ${element.name}`)
        })

    } else {
        console.log(`Nenhum!`)
    }
}
function mostrarPokemonsQueCausamODobroDeDanos(pokemon) {
    console.log(`Pokémons aos quais causam o dobro do dano:`)
    if (pokemon.type.double_damage_to.length > 0) {
        pokemon.type.double_damage_to.forEach(element => {
            console.log(`-${element.name}`)
        })
    } else {
        console.log(`Nenhum!`)
    }
}
function mostrarPokemonsDoMesmoTipo(pokemon) {
    console.log(`Pokémons do mesmo tipo:`)
    if (pokemon.type.pokemons.length > 0) {
        var reducer = (acumulador, elemento) => acumulador + elemento.name + ', '
        var nomes = pokemon.type.pokemons.reduce(reducer, '')
        console.log(nomes)
    } else {
        console.log(`Nenhum!`)
    }

}
async function pesquisarPokemon() {
    var id = user.question('ID Pokémon: ')
    var pokemon = await importador.pesquisaPokemon(id)

    mostrarPokemon(pokemon)
}
async function mostrarMenu() {
    do {
        console.log('@#$%&*¨@!*$#  E S C O L H A  +&*$#@!¨&*+?')
        console.log('Digite 1 para pesquisar POKÉMON por ID')
        console.log('Digite 7 para sair')
        var resposta = user.questionInt('Resposta: ')
        if (resposta === 1) {
            await pesquisarPqokemon()
        }
    } while (resposta !== 7)
    console.log('Operação Encerrada!')
}
mostrarMenu()