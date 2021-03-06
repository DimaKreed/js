const { models: { CARS_FILES }, tableNames: { USERS, CARS }, foreignKey: { ID } } = require('../../constants/constants');

module.exports = (client, DataTypes) => {
    const Car = client.define(
        CARS_FILES,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: USERS,
                    key: ID
                }
            },
            photos: {
                type: DataTypes.STRING
            },
            files: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: CARS,
            timestamps: false
        }
    );

    return Car;
};
