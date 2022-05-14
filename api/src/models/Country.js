module.exports = (sequelize, dataTypes) => {
   const Country = sequelize.define('country', {
      id: {
         type: dataTypes.STRING(3),
         allowNull: false,
         primaryKey: true,
         unique: true,
         validate: {
            is: /[a-zA-Z]{3}/i
         }
      },
      name: {
         type: dataTypes.STRING,
         allowNull: false,
         unique: true
      },
      flag: {
         type: dataTypes.STRING,
         allowNull: false,
         unique: true
      },
      continent: {
         type: dataTypes.STRING,
         allowNull: false
      },
      capital: {
         type: dataTypes.STRING,
         allowNull: false
      },
      subregion: {
         type: dataTypes.STRING,
         allowNull: false
      },
      area: {
         type: dataTypes.FLOAT
      },
      population: {
         type: dataTypes.INTEGER
      }
   },{
      timestamps: false
   });

   Country.associate = (models) => {
      Country.belongsToMany(models.Tourist_activity, {
         through: 'country_activities',
         foreignKey: 'countries',
         as: 'activities',
         timestamps: false
      });
   };

   return Country;
};