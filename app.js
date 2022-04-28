
const puppeteer = require('puppeteer');

async function robo(acao)  {
  const browser = await puppeteer.launch({headless: true}); //Headersless false ou true mostrar ou nao navegador
  
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto('https://www.advfn.com/stock-market/bovespa/'+acao.Codigo+'/dividends');

  const valorAtual = await page.evaluate(() => document.querySelector('#quoteElementPiece5').innerText);
  const varDia = await page.evaluate(() => document.querySelector('#quoteElementPiece4').innerText);
  var custoMedio = acao.Investido/acao.Qtd;
  var valorTotal = valorAtual*acao.Qtd;
  var lucro = valorTotal-acao.Investido;
  var percentLucro = (lucro/acao.Investido)*100;

  console.log(acao.Codigo+","
                +acao.Qtd+","
                +parseFloat(valorAtual).toFixed(2)+","
                +custoMedio.toFixed(2)+","
                +valorTotal.toFixed(2)+","
                +acao.Investido.toFixed(2)+","
                +lucro.toFixed(2)+","
                +percentLucro.toFixed(2)+"%,"
                +varDia
              );
  return;
};

(async () => {
  const InvestimentosDAO = require("./InvestimentosDAO");
  const clientes = await InvestimentosDAO.selectCustomers();
  process.setMaxListeners(0);

  console.log('Código, Qtd, Valor, Custo, Total, Investido, Lucro, %Lucro, %Dia');
  clientes.forEach(function(cliente) {
    robo(cliente);
  });
  return;
})();

