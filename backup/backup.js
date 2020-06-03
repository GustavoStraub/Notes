const clienteModel = require('../models/clienteModel.js')
// const produtoModel = require('../models/produtoModel.js')
const orcamentoModel = require('../models/orcamentoModel.js')
const fs = require('fs')
const chalk = require('chalk')

/*******************
    FAZER BACKUP
********************/
function backup() {
  clienteModel.find({}, (err, clientes) => {
    filename = './backup/backup_clientes.txt'
    fs.writeFileSync(filename, '')
    for (i=0;i<clientes.length;i++) {
      fs.appendFileSync(filename, '\n%%' + JSON.stringify(clientes[i].toJSON()))
    }
  })

  // produtoModel.find({}, (err, produtos) => {
  //   filename = './backup/backup_produtos.txt'
  //   fs.writeFileSync(filename, '')
  //   for (i=0;i<produtos.length;i++) {
  //     fs.appendFileSync(filename, '\n%%' + JSON.stringify(produtos[i].toJSON()))
  //   }
  // })

  orcamentoModel.find({}, (err, orcamentos) => {
    filename = './backup/backup_orcamentos.txt'
    fs.writeFileSync(filename, '')
    for (i=0;i<orcamentos.length;i++) {
      fs.appendFileSync(filename, '\n%%' + JSON.stringify(orcamentos[i].toJSON()))
    }
  })

  fs.writeFileSync('./backup/backup_exists.txt', 'backup exists')

  console.log(chalk.black.bgBlue('\n BACKUP CONCLUÍDO \n'))
}

/*****************************
    RESTAURAR BACKUP SALVO
******************************/
function restore() {
  safeClear()

  fs.readFile('./backup/backup_clientes.txt', (err, data) => {
    clientes = data.toString().split('%%'); clientes.shift()
    for (i=0;i<clientes.length;i++) {
      clienteModel.insertMany(JSON.parse(clientes[i]))
    }
  })
  
  // fs.readFile('./backup/backup_produtos.txt', (err, data) => {
  //   produtos = data.toString().split('%%'); produtos.shift()
  //   for (i=0;i<produtos.length;i++) {
  //     produtoModel.insertMany(JSON.parse(produtos[i]))
  //   }
  // })

  fs.readFile('./backup/backup_orcamentos.txt', (err, data) => {
    orcamentos = data.toString().split('%%'); orcamentos.shift()
    for (i=0;i<orcamentos.length;i++) {
      orcamentoModel.insertMany(JSON.parse(orcamentos[i]))
    }
  })

  console.log(chalk.black.bgYellow('\n BACKUP RESTAURADO \n'))
  return "BACKUP RESTAURADO"
}

/**********************************************************
    APAGA O BANCO INTEIRO (CASO HAJA BACKUP DISPONÍVEL)
***********************************************************/
function safeClear() {
  fs.access('./backup/backup_exists.txt', (err) => {
    if (err) {
      console.log(chalk.white.bgRed.bold('\n ACESSO NEGADO \n'))
      return "ACESSO NEGADO"
    } else {
      // produtoModel.find({}, (err, produtos) => {
      //   for (i=0;i<produtos.length;i++) {produtos[i].remove()}
      // })

      clienteModel.find({}, (err, clientes) => {
        for (i=0;i<clientes.length;i++) {clientes[i].remove()}
      })
    
      orcamentoModel.find({}, (err, orcamentos) => {
        for (i=0;i<orcamentos.length;i++) {orcamentos[i].remove()}
      })

      console.log(chalk.white.bgRed.bold('\n BANCO APAGADO \n'))
      return "BANCO APAGADO"
    }
  })
}

/*****************************************
    APAGA O BANCO SEM SEGURANÇA NENHUMA
******************************************/
function forceClear() {
  // produtoModel.find({}, (err, produtos) => {
  //   for (i=0;i<produtos.length;i++) {produtos[i].remove()}
  // })

  clienteModel.find({}, (err, clientes) => {
    for (i=0;i<clientes.length;i++) {clientes[i].remove()}
  })

  orcamentoModel.find({}, (err, orcamentos) => {
    for (i=0;i<orcamentos.length;i++) {orcamentos[i].remove()}
  })

  console.log(chalk.white.bgRed.bold('\n BANCO APAGADO \n'))
}

module.exports = {backup, restore, safeClear, forceClear}