const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * visit Schema
 */

const visitSchema = new Schema({
  name: { type: String, trim: true },
  patientId: { type: String, trim: true, required: true },
  appointmentDate: { type: String, trim: true, required: true },
  diagnosis: { type: String, trim: true, required: true  },
  patientComplaint: { type: String },
  bloodPressure : { type: String, trim : true },
  temparature: { type : String, trim : true },
  followup : { type: String, trim : true },
  advise: { type : String, trim : true }
}, { timestamps : true});

/**
 * Statics
 */

visitSchema.statics = {

  load: function (options, cb) {
    options.select = options.select || 'name patientId appointmentDate';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  },

  list: function (options, cb) {
    const { find, select = 'name patientId' } = options;
    return this.find(find)
      .select(select)
      .exec(cb);
  },
  create: function (patientData) {
    const { name, patientId, appointmentDate, diagnosis, patientComplaint, bloodPressure, temparature, followup, advise } = patientData;
    console.log({ name, patientId, appointmentDate, diagnosis, patientComplaint, bloodPressure, temparature, followup, advise })
    return this.updateOne({ patientId, appointmentDate }, { name, diagnosis, patientComplaint, bloodPressure, temparature, followup, advise }, { upsert : true })
  }
};

module.exports = mongoose.model('visit', visitSchema);