const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * patient Schema
 */

const patientSchema = new Schema({
  name: { type: String, trim: true, required: true },
  age: { type: String, trim: true, required: true },
  gender: { type: String, trim: true, required: true, enum : ['male', 'female', 'others'] },
  contactNumber: { type: String, trim: true, required: true },
  email: { type: String, trim: true }
}, { timestamps : true });

/**
 * Statics
 */

patientSchema.statics = {

  load: function (options, cb) {
    options.select = options.select || 'name age gender diagnosis contanctNumber email appointmentDate appointmentDetails patientComplaint bloodPresuure temparature';
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
    const { name, age, gender, contactNumber, email,  } = patientData;
    return this.updateOne({ name, contactNumber }, { age, gender, email }, { upsert : true })
  }
};

module.exports = mongoose.model('patient', patientSchema);