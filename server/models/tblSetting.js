module.exports = (sequelize, DataTypes) => {
  const tblSetting = sequelize.define("tbl_setting", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoInrement: true,
        primaryKey: true
    },
    gateway_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: DataTypes.STRING,
    locationId: DataTypes.STRING,
    applicationId: DataTypes.STRING,
    access_token: DataTypes.STRING,
    prefix_key: DataTypes.STRING,
    is_active: DataTypes.STRING,
    create_ts: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
  },
  {
    freezeTableName: true,
    tableName: 'tbl_setting',
    updatedAt: false,
    createdAt: false,
  });
  return tblSetting;
};
