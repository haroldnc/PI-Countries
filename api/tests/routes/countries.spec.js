const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../../src/app');
try {
   var { Country } = require('../../src/db');
} catch(err) {
   console.log('Country not found');
}
let { countries } = require("./load_data");

const expect = chai.expect;
chai.use(chaiHTTP);

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_SERVER_ERROR = 500;
const PATH = '/countries';
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';

function expectStatus(expected, res, method) {
   if (expected === STATUS_SERVER_ERROR) {
      throw new Error(`El estado esperado debe ser distinto a ${STATUS_SERVER_ERROR}`);
   }

   switch (res.status) {
      case STATUS_SERVER_ERROR:
         throw new Error(`El servidor arroja un error durante la ejecución de la solicitud ${method} ${PATH} (status code 500)`);

      default:
         if (expected !== res.status) {
            throw new Error(`Se esperaba status ${expected} pero se obtuvo ${res.status} de ${method} ${PATH}`);
         }

         expect(res).to.be.json;

         if (expected === STATUS_NOT_FOUND) {
            expect(res.body).to.have.property('error');
         }
   }
};


function req(method, status, body = null, path = PATH) {
   const property = method.toLowerCase();
   let request = chai.request(server)[property](path);

   if (body) {
      request = request.send(body);
   }

   return request
      .catch((err) => {
         if (err.response) {
            return err.response;
         }
         throw err;
      })
      .then((res) => {
         expectStatus(status, res, method);
         return res.body;
      })
};


function addCountries(countries) {
   return Promise.all(countries.map(country => Country.create(country)))
      .catch(err => console.error(err));
};


function sortCountries(countries) {
   return countries.sort((a,b) => {
      if (a.id > b.id) return 1;
      else if (a.id === b.id) return 0;
      else return -1;
   });
}


describe('Request', () => {
   before(async () => {
      await addCountries(countries)
      .catch(err => {
         console.error('No se pudo conectar al sevidor:', err)
      })
   });

   after(async () => {
      await Country.sync({ force: true });
   });


   countries = countries.map(country => {
      return {
         ...country,
         activities: []
      }
   });


   describe(`${METHOD_GET} ${PATH}`, () => {
      it('Se obtienen todos los paises con GET a /countries', async () => {
         try {
            const result = await req(METHOD_GET, STATUS_OK);

            expect(result).to.deep.equal(countries);
         } catch (err){
            console.error(err);
         }
      });

      it('Se obtienen los paises por nombre con GET a /countries?name=', async () => {
         const path = `${PATH}?name=`;

         try {
            const result = await Promise.all(countries.map((c) => {
               req(METHOD_GET, STATUS_OK, null, `${path}${c.name}`)
            }));

            expect(result).to.deep.equal(countries);
         } catch (err){
            console.error(err);
         }
      });

      it('Se obtienen los paises por fragmentos del nombre con GET a /countries?name=', (done) => {
         const path = `${PATH}?name=`;
 
         Promise.all([
            req(METHOD_GET, STATUS_OK, null, `${path}0`),
            req(METHOD_GET, STATUS_OK, null, `${path}s0`),
            req(METHOD_GET, STATUS_OK, null, `${path}s1`),
            req(METHOD_GET, STATUS_OK, null, `${path}s13`),
            req(METHOD_GET, STATUS_OK, null, `${path}2`),
            req(METHOD_GET, STATUS_OK, null, `${path}6`)
         ])
            .then(data => data.map(d => sortCountries(d)))
            .then(result => {
               expect(result[0]).to.deep.equal([
                  countries[0],
                  countries[10],
                  countries[20]
               ]);
               expect(result[1]).to.deep.equal([countries[0]]);
               expect(result[2]).to.deep.equal([
                  countries[1],
                  countries[10],
                  countries[11],
                  countries[12],
                  countries[13],
                  countries[14],
                  countries[15],
                  countries[16],
                  countries[17],
                  countries[18],
                  countries[19]
               ]);
               expect(result[3]).to.deep.equal([countries[13]]);
               expect(result[4]).to.deep.equal([
                  countries[2],
                  countries[12],
                  countries[20]
               ]);
               expect(result[5]).to.deep.equal([
                  countries[6],
                  countries[16]
               ]);
               done();
            })
            .catch(err => done(err));
      });
      it('Se obtienen los paises por fragmentos del nombre con GET a /countries?name= (case insensitive)', (done) => {
         const path = `${PATH}?name=`;
 
         Promise.all([
            req(METHOD_GET, STATUS_OK, null, `${path}PAI`),
            req(METHOD_GET, STATUS_OK, null, `${path}S0`),
            req(METHOD_GET, STATUS_OK, null, `${path}S1`),
            req(METHOD_GET, STATUS_OK, null, `${path}S13`),
         ])
            .then(data => data.map(d => sortCountries(d)))
            .then(result => {
               expect(result[0]).to.deep.equal(countries);
               expect(result[1]).to.deep.equal([countries[0]]);
               expect(result[2]).to.deep.equal([
                  countries[1],
                  countries[10],
                  countries[11],
                  countries[12],
                  countries[13],
                  countries[14],
                  countries[15],
                  countries[16],
                  countries[17],
                  countries[18],
                  countries[19]
               ]);
               expect(result[3]).to.deep.equal([countries[13]]);
               done();
            })
            .catch(err => done(err));
      });
      it('Se obtienen paise por id', (done) => {
         Promise.all(countries.map(c => {
            return req(METHOD_GET, STATUS_OK, null, `${PATH}/${c.id}`)
         }))
            .then(result => {
               expect(result).to.deep.equal(countries);
               done();
            })
            .catch(err => done(err));
      });
   });
});