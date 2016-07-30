module.exports = {
    attributes: {
        status: {
            type: Sequelize.STRING(200)
        },
        UserID: {
            type: Sequelize.INTEGER(200),
            references: {
                model: 'User',
                key: 'ID'
            }
        },
        RoleID: {
            type: Sequelize.INTEGER(200),
            references: {
                model: 'Role',
                key: 'ID'
            }
        },
    },
    options: {
        tableName: 'UserRole',
        timestamps: false
    }
};
