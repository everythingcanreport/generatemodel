module.exports = function() {
    var path = require("path");
    var databasePath = path.resolve(__dirname, "..", "..");
    fs = require("fs");
    var beautify = require('js-beautify').js_beautify;
    fs.readdir(databasePath + '/database', function(err, files) {
        if (err) throw err;
        else {
            files.forEach(function(file, index) {
                var isCreatedDate = false,
                    isModifiedDate = false;
                var tableName = "";
                var modelString = "";
                var arrayModel = {};
                var lazy = require("lazy");
                new lazy(fs.createReadStream(databasePath + "/database/" + file))
                    .lines
                    .forEach(function(line) {
                        var lineString = line.toString();
                        if (lineString.search("/*!") === -1 &&
                            lineString.search("--") === -1 &&
                            lineString != 0 &&
                            lineString.search("DROP") === -1 &&
                            lineString.search("LOCK TABLES") === -1 &&
                            lineString.search("UNLOCK TABLES") === -1 &&
                            lineString.length !== 1 &&
                            lineString.search('WITH') === -1 &&
                            lineString.search('OIDS=') === -1 &&
                            lineString.length !== 2 &&
                            lineString.search('ALTER TABLE') === -1 &&
                            lineString.search('OWNER TO') === -1) {
                            if (lineString.search("CREATE TABLE") !== -1) {
                                tableName = lineString.substring(lineString.indexOf('`') + 1, lineString.indexOf('`', lineString.indexOf('`') + 1));
                                sails.log.info('starting generate table', tableName);
                            } else {
                                if (lineString.indexOf("PRIMARY KEY") === -1 &&
                                    lineString.indexOf("FOREIGN KEY") === -1 &&
                                    lineString.indexOf('ENGINE') === -1 &&
                                    lineString.indexOf('UNIQUE KEY') === -1) {
                                    if (lineString.indexOf('KEY') !== 2) {
                                        var column = "";
                                        //get column name
                                        var columnName = lineString.substring(lineString.indexOf('`') + 1, lineString.indexOf('`', lineString.indexOf('`') + 1));
                                        column += columnName + ":{\n"; //started column
                                        switch (columnName) {
                                            case 'CreatedDate':
                                                isCreatedDate = true;
                                                break;
                                            case 'ModifiedDate':
                                                isModifiedDate = true;
                                                break;
                                            default:
                                                break;
                                        }
                                        //end get column name

                                        //get type
                                        var startTypeIndex = columnName.length + 5;
                                        var endTypeIndex = lineString.indexOf('(') !== -1 ? lineString.indexOf('(') : (lineString.indexOf(' ', startTypeIndex) !== -1 ? lineString.indexOf(' ', startTypeIndex) : lineString.indexOf(',', startTypeIndex));
                                        var typeName = lineString.substring(startTypeIndex, endTypeIndex);
                                        var columnLength = lineString.substring(lineString.indexOf('(') + 1, lineString.indexOf(')'));
                                        switch (typeName) {
                                            case 'bigserial':
                                                typeName = "BIGINT(20)";
                                                break;
                                            case 'bigint':
                                                typeName = "BIGINT(20)";
                                                break;
                                            case 'character varying':
                                                typeName = "STRING(" + columnLength + ')';
                                                break;
                                            case 'varchar':
                                                typeName = "STRING(" + columnLength + ')';
                                        }
                                        column += "type: Sequelize." + typeName.toUpperCase();
                                        //end get type

                                        //get autoincrement
                                        if (lineString.indexOf("AUTO_INCREMENT") !== -1) {
                                            column += ",\nautoIncrement: true"
                                        }
                                        //end get autoincrement

                                        //get not null, default null
                                        if (lineString.indexOf("NOT NULL") !== -1) {
                                            column += ",\nallowNull: false";
                                        } else if (lineString.indexOf("DEFAULT NULL") !== -1) {
                                            column += ",\nallowNull: true";
                                        }
                                        //end get not null, default null

                                        //get validate
                                        var endType = typeName.indexOf("(");
                                        var endLength = typeName.indexOf(")");
                                        if (endType === -1) {
                                            endType = typeName.length;
                                        }
                                        if (endLength === -1) {
                                            endLength = typeName.length;
                                        }
                                        var typeData = typeName.substring(0, endType);
                                        var lengthgtData = typeName.substring(endType + 1, endLength);
                                        column += ",\nvalidate:{\n";
                                        switch (typeData) {
                                            case "BIGINT":
                                                column += "isInt:{msg:'Must be an integer!'},"; //is int value
                                                break;
                                            case "STRING":
                                                switch (columnName) {
                                                    case "UID":
                                                        column += "isUUID:{args:4, msg:'Must be an UUID V4!'},"
                                                        break;
                                                    case 'Email':
                                                        column += "isEmail:{msg:'Invalid!'}"
                                                        column += ",\len:{args:[0," + lengthgtData + "], msg:'Too long!'},"
                                                        break;
                                                    default:
                                                        column += "len:{args:[0," + lengthgtData + "], msg:'Too long!'},"
                                                        break;
                                                }
                                                break;
                                            case "STRING":
                                                switch (columnName) {
                                                    case "UID":
                                                        column += "isUUID:{args:4, msg:'Must be an UUID V4!'},"
                                                        break;
                                                    case 'Email':
                                                        column += "isEmail:{msg:'Invalid!'}"
                                                        column += ",\nlen:{args:[0," + lengthgtData + "], msg:'Too long!'},"
                                                        break;
                                                    default:
                                                        column += "\nlen:{args:[0," + lengthgtData + "], msg:'Too long!'},"
                                                        break;
                                                }
                                                break;
                                            case "text":
                                                column += "\nlen:{args:[0,2048], msg:'Too long!'},"
                                                break;
                                            case "INT":
                                                column += "\nisInt:{msg:'Must be an integer!'},"; //is int value
                                                break;
                                            case "DOUBLE":
                                                column += "isDecimal:{msg:'Must be a number!'},"; //is int value
                                                break;
                                            case "timestamp":
                                                column += "isDate:{msg:'Invalid!'},";
                                                break;
                                            default:
                                                console.log("Type:" + typeData + " not exist please check generate model");
                                                break;
                                        }
                                        //end get validate
                                        column = column.substring(0, column.length - 1);
                                        column += "\n}\n}"; //closed column


                                        //convert type on sequelize
                                        column = column.replace("BIGINT", "BIG");
                                        column = column.replace("INT", "INTEGER");
                                        column = column.replace("BIG", "BIGINT");
                                        column = column.replace("VARCHAR", "STRING");
                                        column = column.replace("DATE", "DATEONLY");
                                        column = column.replace("TIMESTAMP", "DATE");

                                        arrayModel[columnName] = "";
                                        arrayModel[columnName] = column;
                                    }

                                }
                                //set primary key
                                if (lineString.indexOf("PRIMARY KEY") !== -1) {
                                    var primaryKey = lineString.substring(lineString.indexOf('(') + 2, lineString.indexOf(')') - 1);
                                    arrayModel[primaryKey] = arrayModel[primaryKey].substring(0, arrayModel[primaryKey].length - 1);
                                    arrayModel[primaryKey] += ",\nprimaryKey: true }"
                                }

                                //set reference key
                                if (lineString.indexOf("FOREIGN KEY") !== -1) {
                                    //foreign key
                                    var startIndexForeignKey = lineString.indexOf("`", lineString.indexOf("FOREIGN KEY"));
                                    var endIndexForegnKey = lineString.indexOf("`", startIndexForeignKey + 1);
                                    var foreignKey = lineString.substring(startIndexForeignKey + 1, endIndexForegnKey);
                                    //references
                                    var startIndexReferences = lineString.indexOf("`", lineString.indexOf("REFERENCES"));
                                    var endIndexReferences = lineString.indexOf("`", startIndexReferences + 1);
                                    var references = lineString.substring(startIndexReferences + 1, endIndexReferences);

                                    //primary key
                                    var startIndexPrimaryKey = lineString.indexOf("(", lineString.indexOf("REFERENCES") + 1);
                                    var endIndexPrimaryKey = lineString.indexOf(")", startIndexPrimaryKey);
                                    var primaryKey = lineString.substring(startIndexPrimaryKey + 2, endIndexPrimaryKey - 1);

                                    arrayModel[foreignKey] = arrayModel[foreignKey].substring(0, arrayModel[foreignKey].length - 1);
                                    arrayModel[foreignKey] += ",\nreferences:{\nmodel: '" + references + "',\nkey: '" + primaryKey + "'}}";
                                }
                            }
                        }
                        modelString = "";
                        for (var key in arrayModel) {
                            if (key !== undefined &&
                                key !== null &&
                                key.length !== 0 &&
                                arrayModel[key] !== undefined &&
                                arrayModel[key] !== null &&
                                arrayModel[key].length !== 0) {
                                modelString += arrayModel[key] + ",";
                            }
                        };
                        modelString = modelString.substring(0, modelString.length - 1);
                        modelString = "module.exports = {\nattributes: {\n" + modelString + "},\n";
                        modelString += "associations: function(){\n},\n";
                        modelString += "options:{\ntableName: '" + tableName + "'";
                        if (!isCreatedDate && !isModifiedDate) {
                            modelString += ",\ntimestamps: false";
                        }

                        if (isCreatedDate === true) {
                            modelString += ",\ncreatedAt: 'CreatedDate'";
                        }
                        if (isModifiedDate === true) {
                            modelString += ",\nupdatedAt: 'ModifiedDate'";
                        }
                        //before - after hooks
                        modelString += ",\nhooks:{\n"
                        modelString += "}\n}};" //close model
                        modelString = beautify(modelString, {
                            indent_size: 2
                        });
                        fs.writeFileSync(databasePath + "/model/" + file.substring(file.indexOf('_') + 1, file.indexOf('.')) + '.js', modelString);
                    });
            });
        }
    });
}
