module.exports = {
    attributes: {
        ID: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
        },
        HobbyName: {
            type: Sequelize.STRING(200)
        }
    },
    options: {
        tableName: 'Hobby',
        timestamps: false
    }
};
