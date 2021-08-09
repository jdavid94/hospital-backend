const { Schema, model } = require('mongoose');

const doctorSchema = Schema({
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
    },
    hospital: {
        require: true,
        type: Schema.Types.ObjectId, // To reference Hospitals
        ref: 'Hospital'
    }
});

// Avoid Return Elements
doctorSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Doctor', doctorSchema);