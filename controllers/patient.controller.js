const patient = require("../models/patient");

const patientList = (req, res) => {
    const { name, age, disease, contactNumber, appointmentDate, appointmentDetails } = req.body;
    return patient.find({}, (err, patients)=>{
        res.send({ status:!err, patients })
    })
}
const getPatientList = (req, res) => {
    return patient.find({}, null, {sort: {createdAt: -1}}, (err, patients)=>{
            res.send({ status:!err, patients })
    })
}
const getPatientNames = (req, res) => {
    return patient.find({}, { name : 1 }, { sort: { createdAt : -1}}, (err, names) => {
        res.send({status:!err, names})
    })
}

module.exports = {getPatientList, getPatientNames}