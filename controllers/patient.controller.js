const patient = require("../models/patient");

const patientList = (req, res) => {
    const { name, age, disease, contactNumber, appointmentDate, appointmentDetails } = req.body;
    return patient.create( { name, age, disease, contactNumber, appointmentDate, appointmentDetails } ).then((d) => {
        patient.find({name : "name"}, (err, patients)=>{
            res.send({ status:!err, patients })
        })
    })
}
const getPatientList = (req, res) => {
    return patient.find({}, null, {sort: {createdAt: -1}}, (err, patients)=>{
            res.send({ status:!err, patients })
    })
}

module.exports = {getPatientList}