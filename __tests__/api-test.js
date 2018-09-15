const names = require('../src/api/names');
const namesDb = names.connectDb('__tests__/test.db');

describe("Names search", () => {

  test("should search if the query contains 1 char", (done) => {
    namesDb.searchNames('k', function (namesFound) {
      expect(namesFound.length).toBeGreaterThan(0);
      done();
    });
  });

  test("should search if there are many chars in the request", (done) => {
    namesDb.searchNames('kkkkkkkkkkkk', function (namesFound) {
      expect(namesFound.length).toBe(0);
      done();
    });
  });

  test("should search if the query contains the numbers", (done) => {
    namesDb.searchNames('1g', function (namesFound) {
      expect(namesFound.length).toBeGreaterThan(0);
      done();
    });
  });

  test("should search if there are special symbol in the request", (done) => {
    namesDb.searchNames('- Xl', function (namesFound) {
      expect(namesFound.length).toBe(1);
      done();
    });
  });

  test("should search if the request contains Latin and Cyrillic", (done) => {
    namesDb.searchNames('етvi', function (namesFound) {
      expect(namesFound.length).toBeGreaterThan(0);
      done();
    });
  });

  test("should search if only Latin is present in the request", (done) => {
    namesDb.searchNames('vi', function (namesFound) {
      expect(namesFound.length).toBeGreaterThan(0);
      done();
    });
  });

  test("should search if there are 2 words in the request in a space", (done) => {
    namesDb.searchNames('Eliane Eliana', function (namesFound) {
      expect(namesFound.length).toBeGreaterThan(0);
      done();
    });
  });

  test("should search if there are 2 words in the request through the special symbol", (done) => {
    namesDb.searchNames('Eliana2+Eliana', function (namesFound) {
      expect(namesFound.length).toBeGreaterThan(0);
      done();
    });
  });

  test("should search if there are 5 words in the request", (done) => {
    namesDb.searchNames('Eliana Eroicajhjb oghkh roighlwgh lwijghwhglwhgwh;g', function (namesFound) {
      expect(namesFound.length).toBeGreaterThan(0);
      done();
    });
  });
});

describe("create new name", () => {

  test("should add a name with a capital letter", (done) => {
    namesDb.createNewName('assert', function () {
      namesDb.searchNames('assert', function (names) {
        expect(names[0].name).toBe('Assert');
        done();
      });
    });
  });

  test("should trim special char at the beginning and end", (done) => {
    namesDb.createNewName('&*assert///', function () {
      namesDb.searchNames('assert', function (names) {
        expect(names[0].name).toBe('Assert');
        done();
      });
    });
  });

  test("should to remove the spaces at the beginning and end", () => {
  });

  test("should cut only at the beginning of the word numbers", () => {
  });

});