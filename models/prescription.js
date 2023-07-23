const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * patient Schema
 */

const prescriptionSchema = new Schema({
  name: { type: String, trim: true, required: true },
  type: { type: String, trim: true, required: true },
  intakeRoute: { type: String, trim: true, required: true },
  dosage: { type: String, trim: true, required: true },
  intakeRoutine: { type: String, trim: true, required: true  },
  intakePattern: { type: String, trim: true, required: true },
  patientId: { type: String, trim: true, required: true },
  visitId: { type: String, trim: true, required: true },
  medicationPeriod: { type: Number }
}, { timestamps : true});

/**
 * Statics
 */

prescriptionSchema.statics = {

  load: function (options, cb) {
    options.select = options.select || 'name type dosage intakeRoute intakeRoutine intakePattern medicationPeriod';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  },

  list: function (options, cb) {
    const { find, select = 'name type dosage intakeRoute intakeRoutine intakePattern medicationPeriod' } = options;
    return this.find(find)
      .select(select)
      .exec(cb);
  },

  create: function (patientData) {
    const { name, age, disease, contactNumber, appointmentDate, appointmentDetails, medicationPeriod } = patientData;
    return this.updateOne({ name, contactNumber }, { age, disease, appointmentDate, appointmentDetails, medicationPeriod }, { upsert : true })
  }
};

module.exports = mongoose.model('prescription', prescriptionSchema);