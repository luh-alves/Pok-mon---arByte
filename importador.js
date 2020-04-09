var axios = require('axios').default
//chamando a minha api 
async function retornaTudao(id) {
    console.log(id)
    const { data: pokemon } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const { data: type } = await axios.get(`https://pokeapi.co/api/v2/type/${id}/`)

    const abilitiesPromise = pokemon.abilities.map(async element => {
        const { data: description } = await axios.get(element.ability.url)
        return {
            name: element.ability.name,
            description: description.effect_entries[0].effect
        }
    });
    //traz resultados as promessas de habilidades
    var abilities = await Promise.all(abilitiesPromise)

    const pokemons = type.pokemons.map(element => element.pokemon)
    return {
        id: pokemon.id,
        name: pokemon.forms[0].name,
        abilities: abilities,
        type: {
            id: type.id,
            type: type.name,
            no_damage_to: type.damage_relations.no_damage_to,
            half_damage_to: type.damage_relations.half_damage_to,
            double_damage_to: type.damage_relations.double_damage_to,
            pokemons: pokemons
        }

    }
}
exports.retornaTudao = retornaTudao

