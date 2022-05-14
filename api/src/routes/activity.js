const { Router } = require('express');
const { Tourist_activity } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
   const {
      name,
      difficulty,
      duration,
      season,
      countriesId
   } = req.body;

   try {
      const [activity,] = await Tourist_activity.findOrCreate({
         where: {
            name,
            difficulty,
            duration,
            season
         }
      });

      countriesId.forEach(async (countryId) => {
         await activity.addCountries(countryId);
      });

      res.status(200).json({ message: 'The activity was sucessfully created' });
   } catch (error) {
      res.status(422).json({ error: error.message });
   }
});

module.exports = router;