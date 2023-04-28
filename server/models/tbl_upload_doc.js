module.exports = (sequelize, DataTypes) => {
  const tbl_upload_doc = sequelize.define("tbl_upload_doc", {
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
    email: DataTypes.STRING(100),
    mail_sent: DataTypes.INTEGER,
    is_downloaded	: DataTypes.INTEGER,
    file1: DataTypes.STRING,
    file2: DataTypes.STRING,
    table_id: DataTypes.STRING,
    reference_no: DataTypes.STRING,
    create_ts: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
  },
  {
    freezeTableName: true,
    tableName: 'tbl_upload_doc',
    updatedAt: false,
    createdAt: false,
  });
  tbl_upload_doc.associate = function (models) {
    tbl_upload_doc.belongsTo(models.tblmain, {
        foreignKey: 'order_id'
    });
  }
  return tbl_upload_doc;
};
