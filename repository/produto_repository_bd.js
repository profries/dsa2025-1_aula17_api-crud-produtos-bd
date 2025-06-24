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

async function inserir(produto) {
    const cliente = new Client(confCliente);
    await cliente.connect();
    
    const sql = "INSERT INTO produtos(nome, categoria, preco) VALUES ($1, $2, $3) RETURNING *";
    const res = await cliente.query(sql, [produto.nome, produto.categoria, produto.preco]);

    await cliente.end();

    const produtoInserido = res.rows[0];
    return produtoInserido;

}

module.exports = {
    listar,
    inserir
}