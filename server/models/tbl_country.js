module.exports = (sequelize, DataTypes) => {
  const country = sequelize.define("tbl_country", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoInrement: true,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: DataTypes.STRING(100),
    status: DataTypes.INTEGER
  },
  {
    freezeTableName: true,
    tableName: 'tbl_country',
    updatedAt: false,
    createdAt: false,
  });
  
  return country;
};
