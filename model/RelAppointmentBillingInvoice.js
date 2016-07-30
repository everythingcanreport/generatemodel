module.exports = {
  attributes: {
    ID: {
      type: Sequelize.BIGINT(20),
      autoIncrement: true,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Must be an integer!'
        }
      },
      primaryKey: true
    },
    AppointmentID: {
      type: Sequelize.BIGINT(20),
      allowNull: true,
      validate: {
        isInt: {
          msg: 'Must be an integer!'
        }
      },
      references: {
        model: 'Appointment',
        key: 'ID'
      }
    },
    BillingInvoiceID: {
      type: Sequelize.BIGINT(20),
      allowNull: true,
      validate: {
        isInt: {
          msg: 'Must be an integer!'
        }
      },
      references: {
        model: 'BillingInvoice',
        key: 'ID'
      }
    }
  },
  associations: function() {},
  options: {
    tableName: 'RelAppointmentBillingInvoice',
    timestamps: false,
    hooks: {}
  }
};