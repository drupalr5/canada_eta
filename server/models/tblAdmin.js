module.exports = (sequelize, DataTypes) => {
  const tblAdmin = sequelize.define('tbl_admin', {
    name  : {
      type: DataTypes.STRING(200),
    },
    email  : {
      type: DataTypes.STRING(200),
    },
    password  : {
      type: DataTypes.STRING(200),
    },
    type  : {
      type: DataTypes.STRING(50),
    },
    profile_path  : {
      type: DataTypes.STRING,
    },
    create_ts  : {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    tableName: 'tbl_admin',
    updatedAt: false,
    createdAt: false,
  });

  return tblAdmin;
}