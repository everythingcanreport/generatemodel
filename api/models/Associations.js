module.exports = {
    associations: function() {
        //belongsTo: foreign key on source
        User.belongsTo(Passport, {
            foreignKey: 'PassportID'
        });

        //hasOne: foreign key on target
        User.hasOne(Passport, {
            foreignKey: 'UserID'
        });

        //hasMany
        User.hasMany(Hobby, {
            foreignKey: 'UserID',
            as: 'Khuong'
        });
        Hobby.belongsTo(User, {
            foreignKey: 'UserID'
        });

        //belongsToMany
        User.belongsToMany(Role, {
            through: 'UserRole',
            foreignKey: 'UserID'
        });
        Role.belongsToMany(User, {
            through: 'UserRole',
            foreignKey: 'RoleID'
        });
        //getUsers. setUsers, addUser, addUsers  - Role
        //getRoles, setRoles, addRole, addRoles - User
    }
};
