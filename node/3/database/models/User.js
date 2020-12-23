const {
    models: { USER }, tableNames: { USERS }, foreignKey: { USER_ID }, changeTypes: { CASCADE }
} = require('../../constants/constants');

module.exports = (client, DataTypes) => {
    const User = client.define(
        USER,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: USERS,
            timestamps: false
        }
    );
    const Car = require('./Car')(client, DataTypes);
    const O_Auth = require('./O_Auth')(client, DataTypes);

    User.hasMany(Car, {
        foreignKey: USER_ID,
        onDelete: CASCADE
    });

    User.hasMany(O_Auth, {
        foreignKey: USER_ID,
        onDelete: CASCADE
    });
    return User;
};
