const { Schema, model } = require('mongoose');

const hospitalSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        require: true,
        type: Schema.Types.ObjectId, // To reference Users
        ref: 'User'
    }
});

// Avoid Return Elements
hospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Hospital', hospitalSchema);