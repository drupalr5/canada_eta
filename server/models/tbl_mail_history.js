module.exports = (sequelize, DataTypes) => {
  const tbl_mail_history = sequelize.define('tbl_mail_history', {
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
  tbl_mail_history.associate = function (models) {
    tbl_mail_history.belongsTo(models.tblmain, {
        foreignKey: 'order_id'
    });
  }
  return tbl_mail_history;
}