module.exports = (sequelize, DataTypes) => {
  const tblRemark = sequelize.define("tbl_remark", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoInrement: true,
        primaryKey: true
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whatsapp: DataTypes.STRING,
    telephone: DataTypes.STRING,
    status_refund: DataTypes.STRING,
    voided: DataTypes.STRING,
    chargeback: DataTypes.STRING,
    us_date: DataTypes.STRING,
    us_time: DataTypes.STRING,
    remark_name	: DataTypes.STRING,
    remark: DataTypes.TEXT,
    create_ts: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
  },
  {
    freezeTableName: true,
    tableName: 'tbl_remark',
    updatedAt: false,
    createdAt: false,
  });
  return tblRemark;
};
