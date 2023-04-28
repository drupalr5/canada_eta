module.exports = (sequelize, DataTypes) => {
  const tblDownloadedHistory = sequelize.define('tbl_downloaded_history', {
    order_id  : {
      type: DataTypes.STRING(100),
    },
    ip  : {
      type: DataTypes.STRING(100),
    },    
    create_ts  : {
      type: DataTypes.DATE,
    },
    browser  : {
      type: DataTypes.STRING,
    },
    os  : {
      type: DataTypes.STRING(100),
    },
    timezone  : {
      type: DataTypes.STRING(100),
    },
  },
  {
    freezeTableName: true,
    tableName: 'tbl_downloaded_history',
    updatedAt: false,
    createdAt: false,
  });

  return tblDownloadedHistory;
}