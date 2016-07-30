module.exports = {
    GetBelongsTo: function(req, res) {
        // User.findAll({
        //         include: [{
        //             model: Passport
        //         }]
        //     })
        //     .then(function(users) {
        //         res.json(200, {
        //             data: users
        //         });
        //     }, function(err) {
        //         res.json(500, {
        //             error: err
        //         });
        //     });

        User.create({
                UserName: 'Khuong 111 111 111'
            })
            .then(function(user) {
                user.setPassport(3, {
                        ID: 100,
                        PassportNumber: 11111
                    }, true)
                    .then(function(passport) {
                        res.json(200, {
                            data: passport
                        });
                    }, function(err) {
                        res.json(500, {
                            error: err
                        });
                    })
            }, function(err) {
                res.json(500, {
                    error: err
                });
            });

        // User.create({
        //         UserName: 'TRAN VAN KK'
        //     })
        //     .then(function(user) {
        //         user.getPassport({
        //                 ID: 46
        //             })
        //             .then(function(passport) {
        //                 res.json(200, {
        //                     data: passport
        //                 });
        //             }, function(err) {
        //                 res.json(500, {
        //                     error: err
        //                 });
        //             });
        //     }, function(err) {
        //         res.json(500, {
        //             error: err
        //         });
        //     });
    },
    GetHasOne: function(req, res) {
        User.findAll({
                include: [{
                    model: Passport
                }]
            })
            .then(function(users) {
                res.json(200, {
                    data: users
                });
            }, function(err) {
                res.json(500, {
                    error: err
                });
            });
    },

    GetHasMany: function(req, res) {
        User.findAll({
                include: [{
                    model: Hobby,
                    as: 'Khuong'
                }]
            })
            .then(function(users) {
                res.json(200, {
                    data: users
                });
            }, function(err) {
                res.json(500, {
                    error: err
                });
            });

        // User.create({
        //         UserName: 'tran h h 11 111 11'
        //     })
        //     .then(function(user) {
        //         user.setHobbies(1)
        //             .then(function(hobby) {
        //                 res.json(200, {
        //                     data: hobby
        //                 });
        //             }, function(err) {
        //                 res.json(500, {
        //                     error: err
        //                 });
        //             });
        //     }, function(err) {
        //         res.json(500, {
        //             error: err
        //         });
        //     });

    },
    BelongsToMany: function(req, res) {
        UserRole.find()
            .then(function(userrole) {
                res.json(500, {
                    data: userrole
                });
            }, function(err) {
                res.json(500, {
                    error: err
                });
            });
        // Role.find({
        //         where: {
        //             ID: 1
        //         }
        //     })
        //     .then(function(roles) {
        //         roles.getUsers()
        //             .then(function(users) {
        //                 res.json(200, {
        //                     data: users
        //                 });
        //             });
        //     });
        // Role.create({
        //         RoleName: 'Add'
        //     })
        //     .then(function(role) {
        //         role.setUsers(32)
        //             .then(function(user) {
        //                 res.json(200, {
        //                     data: user
        //                 });
        //             });
        //     }, function(err) {
        //         res.json(500, {
        //             error: err
        //         });
        //     });
        // User.create({
        //         UserName: 'test role 111111'
        //     })
        //     .then(function(user) {
        //         user.addRole(1)
        //             .then(function(addR) {
        //                 res.json(500, {
        //                     data: addR
        //                 });
        //             }, function(err) {
        //                 res.json(500, {
        //                     error: err
        //                 });
        //             })
        //     }, function(err) {
        //         res.json(500, {
        //             error: err
        //         });
        //     });

        // User.create({
        //         UserName: 'user role 1111111'
        //     })
        //     .then(function(user) {
        //         user.addRole(1, {
        //                 status: 'started'
        //             })
        //             .then(function(role) {
        //                 res.json(200, {
        //                     data: role
        //                 });
        //             }, function(err) {
        //                 res.json(500, {
        //                     error: err
        //                 });
        //             });
        //     }, function(err) {
        //         res.json(500, {
        //             error: err
        //         });
        //     });


    },

    Transaction: function(req, res) {
        return sequelize.transaction()
            .then(function(t) {
                User.create({
                        UserName: 'test 111 111 111 11'
                    }, {
                        transaction: t
                    })
                    .then(function(user) {
                        return user.setPassport(1, {
                            transaction: t
                        });
                    })
                    .then(function(result) {
                        //success
                        t.commit();
                        res.json(200, {
                            data: result
                        });
                    })
                    .catch(function(err) {
                        //error
                        t.rollback();
                        res.json(500, {
                            error: err
                        });
                    });
            });
    }
};
