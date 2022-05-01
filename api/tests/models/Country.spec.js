const { expect } = require('chai');
const { Country, conn } = require('../../src/db');
const {
   sequelize,
   dataTypes,
   checkModelName,
   checkPropertyExists
} = require('sequelize-test-helpers');

describe('Country Model Validation', () => {
   it('Model Country is defined in src/models/Country.js', () => {
      expect(Country).not.to.be.undefined;
   });

   it('Country is a function', () => {
      expect(typeof Country).to.be('function');
   });

   it('Country expected 2 parameters', () => {
      expect(Country.length).to.be(2);
   });

   checkModelName(Country)('country');
});

describe('Country Model Structure', () => {
   const describedModel = Country && Country(sequelize,dataTypes);
   const country = describedModel && new describedModel();

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