// funcao para chamar o arquivo
const fs = require('fs');

const data = fs.readFileSync('./broken-database.json', 'utf-8');

//transformando o .json para poder compreende-lo e editalo no js
var newData = JSON.parse(data);

//variavel para puxar todos os dados futuramente
var dataArray = [];

//Primeira funcao, para corrigir os precos
function mudarPreco() {
    // ajustar preco com repeticao para todo o arquivo
    for (tabela in newData) {
        newData[tabela].price = parseFloat(newData[tabela].price);
    }
}
//chamar funcao
mudarPreco();

//segunda funcao, para corrigir as letras
function mudarLetras() {
    //ajustar letras com repeticao para todo o arquivo
    for (tabela in newData) {
        var str = newData[tabela].name;
        str = str.split('æ').join('a')
        str = str.split('¢').join('c')
        str = str.split('ø').join('o')
        str = str.split('ß').join('b')
        newData[tabela].name = str;
    }
}
//chamar funcao
mudarLetras();

//terceira funcao, para adicionar as quantidades

function addQuantity() {
    //adicionar quantidade com repeticao para todo o arquivo
    for (tabela in newData) {
        if (newData[tabela].quantity == null) {
            newData[tabela].quantity = 0;
        }
    }
}
//chamar funcao
addQuantity();

// for para definir a ordem dos dados dentro do array
for (tabela in newData) {

    dataArray.push({
        id: newData[tabela].id,
        name: newData[tabela].name,
        quantity: newData[tabela].quantity,
        price: newData[tabela].price,
        category: newData[tabela].category
    });
}

//variavel para criar um novo arquivo de .json corrigido
var newJSON = JSON.stringify(dataArray, null, 2);
fs.writeFile("fixed-database.json", newJSON, function (err) {
    if (err) throw err;
    console.log('');
})

//mapear todos os nomes
dataArray.map((allNames) => {
    //console.log(allNames.category) //allNames.name,
});


//mapear category and id
const sortByNumerAsc = (a, b) => {
    return a.id - b.id;
}
const sortByNameAsc = (a, b) => {
    return a.category.localeCompare(b.category);
}

// passar o nome da const para que escolha se quer buscar a category ou o id
const sorted = newData.sort(sortByNumerAsc)
console.log(sorted);

//valor total de todos os prices
const totalPrice = newData.reduce((valr1, elem) => valr1 + elem.price, 0)

//console.log(totalPrice);

//buscar valor da category por
const changePrices = newData.filter((valorMultiplo) => {
    return valorMultiplo.category.includes("Eletrônicos")
})
//console.log(changePrices);

// //ler arquivo
//console.log(newData);