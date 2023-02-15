const patient = require("../models/patient");

const getPatientList = (req, res) => {
    const { name, age, disease, contactNumber, appointmentDate, appointmentDetails } = req.body;
    return patient.create( { name, age, disease, contactNumber, appointmentDate, appointmentDetails } ).then((d) => {
        patient.find({name : "name"}, (err, patients)=>{
            res.send({ status:!err, patients })
        })
    })
}

module.exports = {getPatientList}