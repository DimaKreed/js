const fs = require('fs-extra').promises;
const uuid = require('uuid').v1();
const path = require('path');

module.exports = {
    createDirectory: async (pathToDir) => {
        await fs.mkdir(pathToDir, { recursive: true });
    },
    createPathToFileWithUUID: (pathWithoutPublic, file) => {
        const fileExtension = file.name.split('.').pop();
        const fileName = `${uuid}.${fileExtension}`;
        const finalPath = path.join(pathWithoutPublic, fileName);
        return { finalPath, fileName };
    },

};
