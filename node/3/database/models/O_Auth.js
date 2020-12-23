const { models: { O_AUTH }, tableNames, foreignKey: { ID } } = require('../../constants/constants');

module.exports = (client, DataTypes) => {
    const O_Auth = client.define(
        O_AUTH,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            access_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                reference: {
                    model: tableNames.USERS,
                    key: ID
                }
            },
            created_at: {
                type: DataTypes.DATE,
                default: client.fn('NOW')
            }
        },
        {
            tableName: tableNames.O_AUTH,
            timestamps: false
        }
    );

    return O_Auth;
};
