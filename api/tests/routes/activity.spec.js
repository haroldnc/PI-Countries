const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../../src/app');
try{
   var {
      Tourist_activity,
      country_activities
   } = require('../../src/db');
}catch(err){
   console.log('Tourist_activity not found');
}
const { activities, no_seasons } = require("./load_data");
const expect = chai.expect;
chai.use(chaiHTTP);

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_ENTITY_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const PATH = '/activity';
const METHOD_POST = 'POST';

function expectStatus(expected, res, method) {
   if (expected === STATUS_SERVER_ERROR || expected === STATUS_NOT_FOUND) {
      throw new Error(`El estado esperado debe ser distinto a ${STATUS_SERVER_ERROR} o ${STATUS_NOT_FOUND}`);
   }

   switch (res.status) {
      case STATUS_SERVER_ERROR:
         throw new Error(`El servidor arroja un error durante la ejecución de la solicitud ${method} ${PATH} (status code 500)`);

      case STATUS_NOT_FOUND:
         throw new Error(`El gestor de la solicitud ${method} ${PATH} no está implementada (status code 404)`);

      default:
         if (expected !== res.status) {
            throw new Error(`Se esperaba status ${expected} pero se obtuvo ${res.status} de ${method} ${PATH}`);
         }

         expect(res).to.be.json;

         if (expected === STATUS_ENTITY_ERROR) {
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


function addActivity(activity) {
   return req(METHOD_POST, STATUS_OK, activity).then((success) =>{
      expect(success).to.have.property('message').that.equals('The activity was sucessfully created');

         return success;
   });
};

describe('Request', () => {
   beforeEach(async () => {
      await Tourist_activity.sync({ force: true });
      await country_activities.sync({ force: true });
   });

   describe(`${METHOD_POST} ${PATH}`, () => {
      it('Agrega una nueva Actividad', () => {
         return addActivity(activities[0])
            .then((success) => {
               expect(success.message).to.deep.equal('The activity was sucessfully created');
            });
      });

      it('Informa que falta el parámetro `name`', () => {
         return req(METHOD_POST, STATUS_ENTITY_ERROR, { ...activities[0], name: undefined });
      });

      it('Informa que falta el parámetro `difficulty`', () => {
         return req(METHOD_POST, STATUS_ENTITY_ERROR, { ...activities[0], difficulty: undefined });
      });

      it('`difficulty` acepta valores en [1,2,3,4,5] enteros', (done) => {
         Promise.all(activities.map(activity => req(METHOD_POST, STATUS_OK, activity)))
            .then(result => done())
            .catch(err => done(err));
      });

      it('Informa que el parámetro `difficulty` no acepta enteros mayores a 5 ni menores a 1', (done) => {
         Promise.all(activities.map((activity,i) => req(METHOD_POST, STATUS_ENTITY_ERROR, {
               ...activity,
               difficulty: (i < 6) ? i-5 : i
            }))
         )
            .then(result => done())
            .catch(err => done(err));
      });

      it('`season` acepta valores en ["Summer","Fall","Winter","Spring"] (Case Sensitive)', (done) => {
         Promise.all(activities.map(activity => req(METHOD_POST, STATUS_OK, activity)))
            .then(result => done())
            .catch(err => done(err));
      });

      it('Informa que el parámetro `season` no acepta valores diferentes a ["Summer","Fall","Winter","Spring"] (Case Sensitive)', (done) => {
         Promise.all(activities.map(activity => req(METHOD_POST, STATUS_ENTITY_ERROR, {
               ...activity,
               season: activity.season.toLowerCase()
            }))
         )
            .then(result => done())
            .catch(err => done(err));
      });

      it('Informa que el parámetro `season` no permite Case Unsensitive ["Summer","Fall","Winter","Spring"]', (done) => {
         Promise.all(activities.map((activity,i) => req(METHOD_POST, STATUS_ENTITY_ERROR, {
               ...activity,
               season: no_seasons[i]
            }))
         )
            .then(result => done())
            .catch(err => done(err));
      });
   });
});