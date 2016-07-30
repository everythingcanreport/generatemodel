module.exports = {
    attributes: {
        ID: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        RoleName: {
            type: Sequelize.STRING(200)
        }
    },
    options: {
        tableName: 'Role',
        timestamps: false
    }
};
