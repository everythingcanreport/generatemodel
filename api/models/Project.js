var Project = {
    attributes: {
        ID: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        ProjectName: {
            type: Sequelize.STRING(50)
        }
    },
    associations: function() {
        //belongsTo, hasMany, belongsToMany
    },
    options: {
        tableName: 'Project',
        timestamps: false
    }
};
module.exports = Project;
