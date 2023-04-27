const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * patient Schema
 */

const patientSchema = new Schema({
  name: { type: String, trim: true, required: true },
  age: { type: String, trim: true, required: true },
  disease: { type: String, trim: true, required: true  },
  contactNumber: { type: String, trim: true, required: true },
  appointmentDate: { type: String, default: 'user', trim: true, required: true },
  appointmentDetails: { type: String },
}, { timestamps : true });

/**
 * Statics
 */

patientSchema.statics = {

  load: function (options, cb) {
    options.select = options.select || 'name age disease contanctNumber appointmentDate appointmentDetails';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  },

  list: function (options, cb) {
    const { find, select = 'name email -_id' } = options;
    return this.find(find)
      .select(select)
      .exec(cb);
  },

  create: function (patientData) {
    const { name, age, disease, contactNumber, appointmentDate, appointmentDetails } = patientData;
    return this.updateOne({ name, contactNumber }, { age, disease, appointmentDate, appointmentDetails }, { upsert : true })
  }
};

module.exports = mongoose.model('patient', patientSchema);