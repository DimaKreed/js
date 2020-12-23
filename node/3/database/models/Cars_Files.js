const { models: { CARS_FILES }, tableNames, foreignKey: { ID } } = require('../../constants/constants');

module.exports = (client, DataTypes) => {
    const Cars_Files = client.define(
        CARS_FILES,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            file: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            car_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                reference: {
                    model: tableNames.CARS,
                    key: ID
                }
            },
            created_at: {
                type: DataTypes.DATE,
                default: client.fn('NOW')
            }
        },
        {
            tableName: tableNames.CARS_FILES,
            timestamps: false
        }
    );

    return Cars_Files;
};
