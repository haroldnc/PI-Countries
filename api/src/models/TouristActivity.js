module.exports = (sequelize, dataTypes) => {
   const Tourist_activity = sequelize.define('tourist_activity', {
      name: {
         type: dataTypes.STRING,
         allowNull: false
      },
      difficulty: {
         type: dataTypes.SMALLINT,
         allowNull: false,
         validate: {
            isIn: [[1,2,3,4,5]]
         }
      },
      duration: {
         type: dataTypes.SMALLINT
      },
      season: {
         type: dataTypes.STRING,
         validate: {
            isIn: [['Summer','Fall','Winter','Spring']]
         }
      }
   },{
      timestamps: false
   });

   Tourist_activity.associate = (models) => {
      Tourist_activity.belongsToMany(models.Country, {
         through: 'country_activity',
         foreignKey: 'activities',
         as: 'countries'
      });
   };

   return Tourist_activity;
};