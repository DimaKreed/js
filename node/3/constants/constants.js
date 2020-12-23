module.exports = {
    AUTHORIZATION: 'Authorization',
    NOW: 'NOW',
    tableNames: {
        CARS: 'cars',
        USERS: 'users',
        O_AUTH: 'o_auth',
    },
    models: {
        CAR: 'Car',
        USER: 'User',
        O_AUTH: 'O_Auth'
    },
    foreignKey: {
        USER_ID: 'user_id',
        ID: 'id'
    },
    changeTypes: {
        CASCADE: 'cascade'
    },

    PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
    FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ],
    DOCS_MIMETYPES: [
        'application/msword', // DOC
        'application/pdf', // PDF
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOC 2007
    ]
};
