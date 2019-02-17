
//constante clientes
const clients = [
  { id: 1, taxNumber: '86620855', name: 'HECTOR ACUÑA BOLAÑOS' },
  { id: 2, taxNumber: '7317855K', name: 'JESUS RODRIGUEZ ALVAREZ' },
  { id: 3, taxNumber: '73826497', name: 'ANDRES NADAL MOLINA' },
  { id: 4, taxNumber: '88587715', name: 'SALVADOR ARNEDO MANRIQUEZ' },
  { id: 5, taxNumber: '94020190', name: 'VICTOR MANUEL ROJAS LUCAS' },
  { id: 6, taxNumber: '99804238', name: 'MOHAMED FERRE SAMPER' }
];
//costante cuenta
const accounts = [
  { clientId: 6, bankId: 1, balance: 15000 },
  { clientId: 1, bankId: 3, balance: 18000 },
  { clientId: 5, bankId: 3, balance: 135000 },
  { clientId: 2, bankId: 2, balance: 5600 },
  { clientId: 3, bankId: 1, balance: 23000 },
  { clientId: 5, bankId: 2, balance: 15000 },
  { clientId: 3, bankId: 3, balance: 45900 },
  { clientId: 2, bankId: 3, balance: 19000 },
  { clientId: 4, bankId: 3, balance: 51000 },
  { clientId: 5, bankId: 1, balance: 89000 },
  { clientId: 1, bankId: 2, balance: 1600 },
  { clientId: 5, bankId: 3, balance: 37500 },
  { clientId: 6, bankId: 1, balance: 19200 },
  { clientId: 2, bankId: 3, balance: 10000 },
  { clientId: 3, bankId: 2, balance: 5400 },
  { clientId: 3, bankId: 1, balance: 9000 },
  { clientId: 4, bankId: 3, balance: 13500 },
  { clientId: 2, bankId: 1, balance: 38200 },
  { clientId: 5, bankId: 2, balance: 17000 },
  { clientId: 1, bankId: 3, balance: 1000 },
  { clientId: 5, bankId: 2, balance: 600 },
  { clientId: 6, bankId: 1, balance: 16200 },
  { clientId: 2, bankId: 2, balance: 10000 }
]
//constante bancos
const banks = [
  { id: 1, name: 'SANTANDER' },
  { id: 2, name: 'CHILE' },
  { id: 3, name: 'ESTADO' }
];


// 0 Arreglo con los ids de clientes
function listClientsIds() {
  //realizo mapeo por id de cliente
  return clients.map((client) => client.id);
};

// 1 Arreglo con los ids de clientes ordenados por rut
function listClientsIdsSortByTaxNumber() {
  //genero lista por rut usando sort
  let lista = clients.sort((a, b) => parseInt(a['taxNumber']) - parseInt(b['taxNumber']));
  //retorno de resultado
  return lista.map((client) => client.id);
};

// 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.
function sortClientsTotalBalances() {
  //realizo un mapeo luego filtro los datos por id y comparo en balance si es mayor de 0 luego busco los totales y por ultimo realizo un mapeo de nombres
  let resultado = clients.map((client) => ({
    nombre: client.name,
    total: accounts.filter(account => account.clientId === client.id).reduce((a, b) => a + b.balance, 0)
  })).sort((a, b) => b.total - a.total).map(client => client.nombre);
  //retorno de resultado
  return resultado;
}

// 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.
function banksClientsTaxNumbers() {
  //json
  let data = {};
  //mapeo de bancos
  banks.map((bank) => {
    //array ruts
    let ruts = [];
    //filtramos cuentas y validamos x id, luego realizamos un mapeo  filtrando por el id del cliente
    accounts.filter(account => account.bankId === bank.id).map(accountClient => {
        clients.filter(client => client.id === accountClient.clientId).map(item => ruts.push(item));
    })
    //agregamos a el arreglo realizando una busqueda por ruts
    ruts = ruts.sort((a, b) => a.name > b.name).map(a => a.taxNumber);
    //asignamos el resultado a el json creado inicialmente
    data[bank.name] = ruts;
  });
  //retorno de resultado
  return data;
}

// 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
function richClientsBalances() {
  //asignamos el resultado de la busqueda por nombre santanedr al id
  let bancoSantander = banks.find(x => x.name == 'SANTANDER').id;
  //condicion de negocio a cumplir
  const saldo = 25000;
  //asignamos el saldo luego de buscar por cuenta en  banco santander y que cumpla el saldo minimo 
  let saldoSantander = accounts.filter(account => account.bankId == bancoSantander && account.balance > saldo).map(account => account.balance).sort((a, b) => b - a);
  //retorno de resultado
  return saldoSantander;
}

// 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
function banksRankingByTotalBalance() {
  //realizamos mapeo en busqueda de los bancos y buscamos el total por id del banco y cuenta al final buscamos por totales ordenados ascendente
  let bancos = banks.map((bank) => ({
    id: bank.id,
    total: accounts.filter(account => account.bankId === bank.id).reduce((a, b) => a + b.balance, 0)
  })).sort((a, b) => a.total - b.total).map(totales => totales.id);
  //retorno de resultado
  return bancos;
}


//Resultados 
console.log('Pregunta 0');
console.log(listClientsIds());
console.log('Pregunta 1');
console.log(listClientsIdsSortByTaxNumber());
console.log('Pregunta 2');
console.log(sortClientsTotalBalances());
console.log('Pregunta 3');
console.log(banksClientsTaxNumbers());
console.log('Pregunta 4');
console.log(richClientsBalances());
console.log('Pregunta 5');
console.log(banksRankingByTotalBalance());




