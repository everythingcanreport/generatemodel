var Passport = {
    attributes: {
        ID: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        PassportNumber: {
            type: Sequelize.STRING(50)
        }
    },
    options: {
        tableName: 'Passport',
        timestamps: false
    }
};
module.exports = Passport;
