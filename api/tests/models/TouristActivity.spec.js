try{
   var { Tourist_activity, conn } = require('../../src/db');
}catch(err){
   console.log('Tourist_activity not found');
}
try{
   var activityModel = require('../../src/models/TouristActivity');
}catch(err){
   console.log('activityModel not found');
}
const { expect } = require('chai');
const {
   sequelize,
   dataTypes,
   checkModelName,
   checkPropertyExists
} = require('sequelize-test-helpers');

describe('Model Tourist_activity Validation', () => {
   it('Model Tourist_activity is defined in src/models/TouristActivity.js', () => {
      expect(activityModel).not.to.be.undefined;
   });

   it('Tourist_activity is a function', () => {
      expect(typeof activityModel).to.equal('function');
   });
   
   it('Tourist_activity expected 2 parameters', () => {
      expect(activityModel.length).to.equal(2);
   });
});

describe('Model Tourist_activity Properties', () => {
   const model = activityModel && activityModel(sequelize, dataTypes);
   const activity = model && new model();

   checkModelName(model)('tourist_activity');
   
   [
      'name',
      'difficulty',
      'duration',
      'season'
   ].forEach(checkPropertyExists(activity));
});

describe('Tourist_activity Structure', () => {
   const { STRING, SMALLINT, INTEGER } = require('sequelize').DataTypes
   const {
      id,
      name,
      difficulty,
      duration,
      season
   } = Tourist_activity?.tableAttributes ?? {};

   describe('Property "id"', () => {
      it('"id" is a INTEGER', () => {
         expect(id?.type).to.be.instanceOf(INTEGER);
      });

      it('"id" is a required field', () => {
         expect(id?.allowNull).to.equal(false);
      });

      it('"id" is primary key', () => {
         expect(id?.primaryKey).to.equal(true);
      });

      it('"id" is auto-incremented', () => {
         expect(id?.autoIncrement).to.equal(true);
      });
   });

   describe('Property "name"', () => {
      it('"name" is a STRING', () => {
         expect(name?.type).to.be.instanceOf(STRING);
      });

      it('"name" is a required field', () => {
         expect(name?.allowNull).to.equal(false);
      });
   });

   describe('Property "difficulty"', () => {
      it('"difficulty" is a SMALLINT', () => {
         expect(difficulty?.type).to.be.instanceOf(SMALLINT);
      });

      it('"difficulty" is a required field', () => {
         expect(difficulty?.allowNull).to.equal(false);
      });
   });

   describe('Property "duration"', () => {
      it('"duration" is a SMALLINT', () => {
         expect(duration?.type).to.be.instanceOf(SMALLINT);
      });
   });

   describe('Property "season"', () => {
      it('"season" is a STRING', () => {
         expect(season?.type).to.be.instanceOf(STRING);
      });
   });
});

describe('Tourist_activity database', () => {
   before(() => conn.authenticate()
      .catch(err => {
         console.error('Unable to connect to the database:', err)
      })
   );

   const activities = [];
   const seasons = ['Summer','Fall','Winter','Spring']
   let j, k;

   for (let i=1; i<6; i++){
      j = Math.floor(Math.random() * 4) + 1;  // Random number 1-4

      activities.push({
         name: `activity${i}`,
         difficulty: i,
         duration: j,
         capital: `capital${i}`,
         season: seasons[j-1]
      });
   }

   beforeEach(() => Tourist_activity.sync({ force: true }));

   describe('Create new data in the database', () => {
      beforeEach(() => Tourist_activity.sync({ force: true }));

      describe('Field "name"', () => {
         it('A new element must not be created if "name" is missing', (done) => {
            Tourist_activity.create({...activities[0], name: undefined})
               .then(() => done(new Error('The "name" property is required')))
               .catch(() => done());
         });
      });

      describe('Field "difficulty"', () => {
         it('A new element must not be created if "difficulty" is missing', (done) => {
            Tourist_activity.create({...activities[0], difficulty: undefined})
               .then(() => done(new Error('The "difficulty" property is required')))
               .catch(() => done());
         });

         it('"difficulty" is in [1,2,3,4,5]', (done) => {
            Promise.all(activities.map(act => Tourist_activity.create(act)))
               .then(() => done())
               .catch(() => done(new Error('The "difficulty" property accept numbers in [1,2,3,4]')));
         });

         it('"difficulty" is in [1,2,3,4,5] not 0 or negative numbers', (done) => {
            const k = -Math.floor(Math.random() * 10)
            Tourist_activity.create({...activities[0], difficulty:k})
               .then(() => done(new Error('The "difficulty" property reject numbers less than 1')))
               .catch(() => done());
         });

         it('"difficulty" is in [1,2,3,4,5] not numbers greater than 5', (done) => {
            const k = 6+Math.floor(Math.random() * 10)
            Tourist_activity.create({...activities[0], difficulty:k})
               .then(() => done(new Error('The "difficulty" property reject numbers greater than 5')))
               .catch(() => done());
         });
      });

      describe('Field "season"', () => {
         it('"difficulty" is in ["Summer","Fall","Winter","Spring"]', (done) => {
            Promise.all(activities.map(act => Tourist_activity.create(act)))
               .then(() => done())
               .catch(() => done(new Error('The "flag" property accept values in ["Summer","Fall","Winter","Spring"]')));
         });

         it('"difficulty" is in ["Summer","Fall","Winter","Spring"] not other words', (done) => {
            const k = Math.floor(Math.random() * 4);
            Tourist_activity.create({...activities[k], season: activities[k]+k})
               .then(() => done(new Error('The "flag" property reject others values')))
               .catch(() => done());
         });
      });
   });
});