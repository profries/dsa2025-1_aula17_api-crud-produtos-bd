const produtoService = require("../service/produto_service")

async function listar(req, res) {
    res.json(await produtoService.listar());
}

async function inserir (req, res) {
    let produto = req.body;
    try { 
        await produtoService.inserir(produto);
        res.status(201).json(produto);
    }
    catch(err) {
        res.status(err.id).json(err);
    }
}

function buscarPorId(req, res) {    
    const id = +req.params.id;
    try {
        res.json(produtoService.buscarPorId(id));
    } catch(err) {
        res.status(err.id).json(err);
    }
}

function atualizar(req, res) {
    const id = +req.params.id;
    let produto = req.body;
    try{
        res.json(produtoService.atualizar(id, produto));
    } catch(err) {
        res.status(err.id).json(err);
    }
}

function deletar(req, res) {
    const id = +req.params.id;
    try {
        res.json(produtoService.deletar(id));
    } catch(err) {
        res.status(err.id).json(err);
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}