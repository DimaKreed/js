const { tableNames, NOW, foreignKey: { ID } } = require('../../constants/constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(tableNames.USERS, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            age: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: Sequelize.DataTypes.STRING
            }
        });

        await queryInterface.createTable(tableNames.CARS, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            model: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: tableNames.USERS,
                    key: ID
                }
            }
        });

        await queryInterface.createTable(tableNames.O_AUTH, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            access_token: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            refresh_token: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: tableNames.USERS,
                    key: ID
                }
            },
            created_at: {
                type: Sequelize.DataTypes.DATE,
                default: Sequelize.fn(NOW)
            }
        });

        await queryInterface.createTable(tableNames.CARS_FILES, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            type: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            file: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            car_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: tableNames.CARS,
                    key: ID
                }
            },
            created_at: {
                type: Sequelize.DataTypes.DATE,
                default: Sequelize.fn(NOW)
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(tableNames.USERS);
        await queryInterface.dropTable(tableNames.CARS);
        await queryInterface.dropTable(tableNames.O_AUTH);
    }
};
