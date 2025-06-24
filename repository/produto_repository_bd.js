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

async function buscarPorId(id) {
    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM produtos WHERE id=$1";
    const result = await cliente.query(sql, [id]);

    await cliente.end();

    const produtoEncontrado = result.rows[0];
    return (produtoEncontrado);
}

async function atualizar(id, produto) {
    const sql = 'UPDATE produtos set nome=$1, categoria=$2, preco=$3 WHERE id=$4 RETURNING *'
    const values = [produto.nome, produto.categoria, produto.preco, id];

    const cliente = new Client(confCliente);
    await cliente.connect();

    const result = await cliente.query(sql, values);

    await cliente.end();

    const produtoAtualizado = result.rows[0];
    return (produtoAtualizado);
}

async function deletar(id) {
    const sql = 'DELETE FROM produtos WHERE id=$1 RETURNING *'
    const values = [id];

    const cliente = new Client(confCliente);
    await cliente.connect();

    const result = await cliente.query(sql, values);

    await cliente.end();

    const produtoDeletado = result.rows[0];
    return (produtoDeletado);
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}