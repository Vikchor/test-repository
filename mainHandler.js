import * as fsPromises from 'fs/promises';
import fs from 'fs';

export async function mainHandler(req, res) {
  const fileName = './client/index.html';
  const encoding = 'utf-8';
  console.log('asdsadasdasdasd');

  // 1. Синхронный вариант, - самый плохой, потому что блокируется основной поток приложения, что приводит к тому,
  // что весь остальной код программы не будет выполняться, пока не выполнится данный синхронный код
  const dataSync = fs.readFileSync(fileName, { encoding });

  // 2. Вариант на коллбэке, - уже намного лучше, потому что не блокируется поток
  // остальной код выполняется
  // Минус, - неудобно работать с кодом программы, потому что область видимости получаемых данных ограничена коллбэком
  fs.readFile(fileName, { encoding }, (err, dataCallback) => {
    // console.log(dataCallback);
  });

  // Promise - это ОБЪЕКТ, в котором появится результат асинхронной операции
  const promise = new Promise((resolve, reject) => {
    try {
      const dataSync = fs.readFileSync(fileName, { encoding });
      resolve(dataSync);
    } catch (error) {
      reject(error);
    }
  });

  // const promise = fsPromises.readFile(fileName, { encoding });

  // 3. Вариант через promise then/catch/finally
  promise
    .then((dataFromPromise) => {
      // console.log(dataFromPromise);
    })
    .catch((error) => {
      // console.log(error);
      return;
    });

  // 4. Вариант через promise async/await
  // САМЫЙ ЛУЧШИЙ ВАРИАНТ, потому что:
  // 1) Не блокируется основной поток
  // 2) Мы не ограничиваемся областью видимости коллбэка
  let dataFromPromise;
  try {
    dataFromPromise = await promise;
  } catch (error) {
    // console.log(error);
    return;
  }

  res.end(dataFromPromise);
}
