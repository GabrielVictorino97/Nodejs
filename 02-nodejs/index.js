/*
 0 Obter um usuario 
 1 Obter o numero de telefone de um usuario a partir de seu id
 2 Obter o endereco do usuario pelo ID
*/

function obterUsuario(callback){
    setTimeout(function(){
        return callback(null, {
            id: 1,
            nome: 'Gabriel',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            telefone: '16996200340',
            ddd: 16
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

obterUsuario(function resolverUsuario(error, usuario){
    if(error){
        console.error('DEU RUIM em USUARIO', error)
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error1){
            console.error('DEU RUIM em TELEFONE', error)
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
            if(error2){
                console.error('DEU RUIM em Endereco', error)
            } 

            console.log(`
                Nome: ${usuario.nome},
                Endeco: ${endereco.rua}, ${endereco.numero},
                Telefone: (${telefone.ddd}), ${telefone.telefone}
            `)
        })
    })
})



// const telefone = obterTelefone(usuario.id)

// console.log('telefone', telefone)