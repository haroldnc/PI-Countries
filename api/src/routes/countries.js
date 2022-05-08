const { Router } = require('express');
const { Op } = require('sequelize');
const { Country, Tourist_activity } = require('../db');
const axios = require('axios');
const router = Router();
const urlApi = 'https://restcountries.com/v3/all';

router.get('/', async (req, res) => {
   const { name } = req.query;
   let data;

   try {
      if (name){
         data = await Country.findAll({
            where: {
               name: {
                  [Op.iLike]: `%${name}%`
               }
            },
            include: 'activities'
         });
      } else {
         data = await Country.findAll({
            include: 'activities'
         });

         if (!data.length){
            const result = await axios.get(urlApi);

            result.data.forEach(country => {
               data.push({
                  id: country.cca3,
                  name: country.name.common,
                  flag: country.flags[1],
                  continent: country.continents[0],
                  capital: (country.capital && country.capital[0]) || '',
                  subregion: country.subregion || country.region,
                  area: country.area,
                  population: country.population,
                  activities: country.activities
               });

               Country.create(data[data.length-1]);
            });
         }
      }

      res.status(200).json(data);
   } catch (error) {
      res.status(404).json({ error: error.message });
   }
});

router.get('/:idCountry', async (req, res) => {
   const { idCountry } = req.params;
   const { fields } = req.body;

   try {
      const result = await Country.findByPk(idCountry, {
         attributes: fields,
         include: 'activities'
      });

      if (!result) throw new Error('The country was not found');

      res.status(200).json(result);
   } catch (error) {
      res.status(404).json({ error: error.message });
   }
});

module.exports = router;