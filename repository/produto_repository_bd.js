const { Client } = require("pg")

const confCliente = {
    user:"postgres",
    password:"123456",
    database:"crud_produtos",
    host:"localhost",
    port:5433
}

async function listar() {
    const cliente = new Client(confCliente);
    //conectar
    await cliente.connect();
    
    //executar query
    const res = await cliente.query("SELECT * FROM produtos ORDER BY id");
    const listaProdutos = res.rows;

    //fechar conexao
    await cliente.end();

    return listaProdutos;
}

module.exports = {
    listar
}