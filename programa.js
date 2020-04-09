var user = require('readline-sync')
var importador = require('./importador')
var exportador = require('./exportador')
async function escolherOpcoes() {
    do {
        console.log('@#$%&*¨@!*$#  E S C O L H A  +&*$#@!¨&*+?')
        console.log('Digite 1 para pesquisar POKÉMON por ID')
        console.log('Digite 7 para sair')
        var resposta = user.questionInt('Resposta: ')
        if (resposta === 1) {
            var id = user.question('ID Pokémon: ')
            var resposta = await importador.retornaTudao(id)
            console.log(`>>>>>>>>>>  P O K É M O N  <<<<<<<<<<`)
            console.log(`ID : ${resposta.id}`)
            console.log(`Nome : ${resposta.name}`)
            resposta.abilities.forEach(element => {
                console.log(`Habilidades : ${element.name}`)
            });
            console.log(`Tipo : ${resposta.type.type} & ID: ${resposta.type.id}`)


            console.log(`Pokémons aos quais não causam dano:`)
            if (resposta.type.no_damage_to.length > 0) {
                resposta.type.no_damage_to.forEach(element => {
                    console.log(`- ${element.name}`)
                })
            } else {
                console.log(`Nenhum!`)
            }

            console.log(`Pokémons aos quais causam metade do dano:`)
            if (resposta.type.half_damage_to.length > 0) {
                resposta.type.half_damage_to.forEach(element => {
                    console.log(`- ${element.name}`)
                })

            } else {
                console.log(`Nenhum!`)
            }

            console.log(`Pokémons aos quais causam o dobro do dano:`)
            if (resposta.type.double_damage_to.length > 0) {
                resposta.type.double_damage_to.forEach(element => {
                    console.log(`-${element.name}`)
                })
            } else {
                console.log(`Nenhum!`)
            }

            console.log(`Pokémons do mesmo tipo:`)
            if (resposta.type.pokemons.length > 0) {
                var reducer = (acumulador, elemento) => acumulador + elemento.name + ', '
                var nomes =  resposta.type.pokemons.reduce(reducer, '')
                console.log(nomes)
            } else {
                console.log(`Nenhum!`)
            }

            var simOuNao = user.question('Deseja salvar esse POKÉMON no seu POKEDEX?(s/n): ')
            switch (simOuNao) {
                case 's':
                    console.log('pokémon salvo com sucesso na  --- P O K E D E X ---')
                    var res = exportador.salvarPokemon(resposta)
                    //console.log(res)
                    break
                case 'n':
                    escolherOpcoes()
                    break
            }
        }
    } while (resposta !== 7)
    console.log('Operação Encerrada!')
}
escolherOpcoes()