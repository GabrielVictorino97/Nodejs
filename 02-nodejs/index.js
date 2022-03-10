/*
 0 Obter um usuario 
 1 Obter o numero de telefone de um usuario a partir de seu id
 2 Obter o endereco do usuario pelo ID

 */
 //importamos um módulo interno no nojde.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
    // quando der algum problema -> reject (erro)
    // quando sucess -> resolve
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function(){
            return resolve({
                id: 1,
                nome: 'Gabriel',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario){
    return new Promise(function resolverPromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                telefone: '16996200340',
                ddd: 16
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

main()
async function main(){
    try{
        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const telefone = resultado[1]
        const endereco = resultado[0]
        console.log(`
            Nome: ${usuario.nome},
            Endeco: ${endereco.rua}, ${endereco.numero},
            Telefone: (${telefone.ddd}) ${telefone.telefone}
        `)

        console.timeEnd('medida-promise')
    }
    catch (error){
        console.error('DEU RUIM', error)
    }
}


// const usuarioPromise = obterUsuario()
// //para manipular sucess => .then
// // para manipular erros => .catch
// // usuario > telefone > ultima funcao (telefone)
// usuarioPromise
//     .then(function(usuario){
//         return obterTelefone(usuario.id)
//         .then(function resolverTelefone(result){
//             return {
//                 usuario: {
//                     nome: usuario.nome,
//                     id: usuario.id
//                 },
//                 telefone: result
//             }
//         })
//     })
//     .then(function(resultado){
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function resolverEndereco(result){
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         })
//     })
//     .then(function(resultado){
//         console.log(`
//             Nome: ${resultado.usuario.nome},
//             Endeco: ${resultado.endereco.rua}, ${resultado.endereco.numero},
//             Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//         `)
//     })
//     .catch(function(error){
//         console.error('Deu ruim', error)
//     })


// obterUsuario(function resolverUsuario(error, usuario){
//     if(error){
//         console.error('DEU RUIM em USUARIO', error)
//     }

//     // obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
//     //     if(error1){
//     //         console.error('DEU RUIM em TELEFONE', error)
//     //     }
//     //     obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
//     //         if(error2){
//     //             console.error('DEU RUIM em Endereco', error)
//     //         } 

//     //         console.log(`
//     //             Nome: ${usuario.nome},
//     //             Endeco: ${endereco.rua}, ${endereco.numero},
//     //             Telefone: (${telefone.ddd}), ${telefone.telefone}
//     //         `)
//     //     })
//     // })
// })