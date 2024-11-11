import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

let driver;

beforeAll(async () => {
  const chromeOptions = new Options();
  chromeOptions.addArguments('--headless');

  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();
});

afterAll(async () => {
  await driver.quit();
});

jest.setTimeout(30000);

it('deve exibir o bairro e a localidade após consultar um CEP', async () => {
  await driver.get('http://localhost:3000');

  const cepInput = await driver.wait(until.elementLocated(By.id('cep')), 20000);
  const buscarButton = await driver.findElement(By.id('buscar-button'));

  await cepInput.sendKeys('01001000');
  await buscarButton.click();

  const bairroElement = await driver.wait(
    until.elementTextContains(
      await driver.findElement(By.id('bairro')),
      'Bairro:',
    ),
    40000,
  );

  const localidadeElement = await driver.wait(
    until.elementTextContains(
      await driver.findElement(By.id('localidade')),
      'Localidade:',
    ),
    40000,
  );

  const bairroText = await bairroElement.getText();
  const localidadeText = await localidadeElement.getText();

  expect(bairroText).toContain('Bairro: Sé');
  expect(localidadeText).toContain('Localidade: São Paulo');
});
