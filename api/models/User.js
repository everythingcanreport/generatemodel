var User = {
    attributes: {
        ID: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        UserName: {
            type: Sequelize.STRING(10),
            validate: {
                len: {
                    args: 10,
                    msg: 'Name must at least 10 character!'
                },
                // maxLength: function(value, next) {
                //     if (value.length > 10) {
                //         next('Name too long!');
                //     } else {
                //         next();
                //     }
                // }
            }
        },
        Email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: {
                    msg: 'Email Invalid!'
                }
            }
        }
        /*
        Type: 
	        STRING, CHAR, TEXT, INTEGER, BIGINT, FLOAT, REAL, DOUBLE, DECIMAL, BOOLEAN,
	        TIME, DATE, DATEONLY, HSTORE, JSON, JSONB, NOW, BLOB, RANGE, UUID, UUIDV1, UUIDV4,
	        VIRTUAL, ENUM, ARRAY
        */
    },
    associations: function() {
        //belongsTo, hasMany, belongsToMany
    },
    options: {
        tableName: 'User',
        timestamps: false
    }
};
module.exports = User;
