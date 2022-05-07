try{
   var { Country, conn } = require('../../src/db');
}catch(err){
   console.log('Country not found');
}
try{
   var countryModel = require('../../src/models/Country');
}catch(err){
   console.log('countryModel not found');
}
const { expect } = require('chai');
const {
   sequelize,
   dataTypes,
   checkModelName,
   checkPropertyExists
} = require('sequelize-test-helpers');

describe('Model Country Validation', () => {
   it('Model Country is defined in src/models/Country.js', () => {
      expect(countryModel).not.to.be.undefined;
   });

   it('Country is a function', () => {
      expect(typeof countryModel).to.equal('function');
   });
   
   it('Country expected 2 parameters', () => {
      expect(countryModel.length).to.equal(2);
   });
});

describe('Model Country Properties', () => {
   const model = countryModel && countryModel(sequelize, dataTypes);
   const country = model && new model();

   checkModelName(model)('country');
   
   [
      'id',
      'name',
      'flag',
      'continent',
      'capital',
      'subregion',
      'area',
      'population'
   ].forEach(checkPropertyExists(country));
});

describe('Country Structure', () => {
   const { STRING, FLOAT, INTEGER } = require('sequelize').DataTypes
   const {
      id,
      name,
      flag,
      continent,
      capital,
      subregion,
      area,
      population
   } = Country?.tableAttributes ?? {};

   describe('Property "id"', () => {
      it('"id" is a STRING', () => {
         expect(id?.type).to.be.instanceOf(STRING);
      });

      it('"id" have max length 3', () => {
         expect(id?.type._length).to.equal(3);
      });

      it('"id" is a required field', () => {
         expect(id?.allowNull).to.equal(false);
      });

      it('"id" is primary key', () => {
         expect(id?.primaryKey).to.equal(true);
      });

      it('"id" is unique', () => {
         expect(id?.unique).to.equal(true);
      });
   });

   describe('Property "name"', () => {
      it('"name" is a STRING', () => {
         expect(name?.type).to.be.instanceOf(STRING);
      });

      it('"name" is a required field', () => {
         expect(name?.allowNull).to.equal(false);
      });

      it('"name" is unique', () => {
         expect(name?.unique).to.equal(true);
      });
   });

   describe('Property "flag"', () => {
      it('"flag" is a STRING', () => {
         expect(flag?.type).to.be.instanceOf(STRING);
      });

      it('"flag" is a required field', () => {
         expect(flag?.allowNull).to.equal(false);
      });

      it('"flag" is unique', () => {
         expect(flag?.unique).to.equal(true);
      });
   });

   describe('Property "continent"', () => {
      it('"continent" is a STRING', () => {
         expect(continent?.type).to.be.instanceOf(STRING);
      });

      it('"continent" is a required field', () => {
         expect(continent?.allowNull).to.equal(false);
      });
   });

   describe('Property "capital"', () => {
      it('"capital" is a STRING', () => {
         expect(capital?.type).to.be.instanceOf(STRING);
      });

      it('"capital" is a required field', () => {
         expect(capital?.allowNull).to.equal(false);
      });
   });

   describe('Property "subregion"', () => {
      it('"subregion" is a STRING', () => {
         expect(subregion?.type).to.be.instanceOf(STRING);
      });
   });

   describe('Property "area"', () => {
      it('"area" is a FLOAT', () => {
         expect(area?.type).to.be.instanceOf(FLOAT);
      });
   });

   describe('Property "population"', () => {
      it('"population" is a INTEGER', () => {
         expect(population?.type).to.be.instanceOf(INTEGER);
      });
   });
});

describe('Country database', () => {
   before(() => conn.authenticate()
      .catch(err => {
         console.error('Unable to connect to the database:', err)
      })
   );

   const countries = [];
   const letters = ['A','b']
   let j, k;

   for (let i=0; i<2; i++){
      j = Math.floor(Math.random() * 4) + 1;  // Random number 1-4
      k = Math.floor(Math.random() * 10) + 1;  // Random number 1-10

      countries.push({
         id: `pa${letters[i]}`,
         name: `Pais${i}`,
         flag: `bandera_pais${i}`,
         continent: `continent${j}`,
         capital: `capital${i}`,
         subregion: `subregion${k}`,
         area: 1000.5*k + 100.5*j,
         population: 1000*k + 100*j
      });
   }

   describe('Create new data in the database', () => {
      beforeEach(() => Country.sync({ force: true }));

      describe('Field "id"', () => {
         it('A new element must not be created if "id" is missing', (done) => {
            Country.create({...countries[0], id: undefined})
               .then(() => done(new Error('The "id" property is required')))
               .catch(() => done());
         });

         it('"id" only accepts letter', (done) => {
            Country.create({...countries[0], id: '14q'})
               .then(() => done(new Error('The "id" property only accepts letters not numbers in string')))
               .catch(() => done());
         });

         it('"id" only accepts letter', (done) => {
            Country.create(countries[0])
               .then(() => done())
               .catch(() => done(new Error('The "id" property only accepts letters')));
         });

         it('"id" accepts 3 character max', (done) => {
            Country.create({...countries[0], id: 'pais'})
               .then(() => done(new Error('The "id" property accepts 3 character max')))
               .catch(() => done());
         });

         it('"id" is unique', (done) => {
            Promise.all([
               Country.create(countries[0]),
               Country.create({...countries[1], id: countries[0].id})
            ])
               .then(() => done(new Error('The "id" property must be unique for each country')))
               .catch(() => done());
         });
      });

      describe('Field "name"', () => {
         it('A new element must not be created if "name" is missing', (done) => {
            Country.create({...countries[0], name: undefined})
               .then(() => done(new Error('The "name" property is required')))
               .catch(() => done());
         });

         it('"name" is unique', (done) => {
            Promise.all([
               Country.create(countries[0]),
               Country.create({...countries[1], name: countries[0].name})
            ])
               .then(() => done(new Error('The "name" property must be unique for each country')))
               .catch(() => done());
         });
      });

      describe('Field "flag"', () => {
         it('A new element must not be created if "flag" is missing', (done) => {
            Country.create({...countries[0], flag: undefined})
               .then(() => done(new Error('The "flag" property is required')))
               .catch(() => done());
         });

         it('"flag" is unique', (done) => {
            Promise.all([
               Country.create(countries[0]),
               Country.create({...countries[1], flag: countries[0].flag})
            ])
               .then(() => done(new Error('The "flag" property must be unique for each country')))
               .catch(() => done());
         });
      });

      describe('Field "continent"', () => {
         it('A new element must not be created if "continent" is missing', (done) => {
            Country.create({...countries[0], continent: undefined})
               .then(() => done(new Error('The "continent" property is required')))
               .catch(() => done());
         });
      });

      describe('Field "capital"', () => {
         it('A new element must not be created if "capital" is missing', (done) => {
            Country.create({...countries[0], capital: undefined})
               .then(() => done(new Error('The "capital" property is required')))
               .catch(() => done());
         });
      });
   });
});