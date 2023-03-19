const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * patient Schema
 */

const prescriptionSchema = new Schema({
  name: { type: String, trim: true, required: true },
  dosage: { type: String, trim: true, required: true },
  intakeRoutine: { type: String, trim: true, required: true  },
  intakePattern: { type: String, trim: true, required: true },
  patientId: { type: String, trim: true, required: true },
  visitId: { type: String, trim: true, required: true },
}, { timestamps : true});

/**
 * Statics
 */

prescriptionSchema.statics = {

  load: function (options, cb) {
    options.select = options.select || 'name dosage intakeRoutine intakePattern';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  },

  list: function (options, cb) {
    const { find, select = 'name dosage intakeRoutine intakePattern' } = options;
    return this.find(find)
      .select(select)
      .exec(cb);
  },

  create: function (patientData) {
    const { name, age, disease, contactNumber, appointmentDate, appointmentDetails } = patientData;
    return this.updateOne({ name, contactNumber }, { age, disease, appointmentDate, appointmentDetails }, { upsert : true })
  }
};

module.exports = mongoose.model('prescription', prescriptionSchema);