module.exports = (sequelize, DataTypes) => {
  const tblDownloadedHistory = sequelize.define('tbl_mail_history', {
    order_id  : {
      type: DataTypes.STRING(200),
    },
    create_ts  : {
      type: DataTypes.DATE,
    },
    us_date_time  : {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    tableName: 'tbl_mail_history',
    updatedAt: false,
    createdAt: false,
  });

  return tblDownloadedHistory;
}