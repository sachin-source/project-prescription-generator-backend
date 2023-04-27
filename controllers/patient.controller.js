const patient = require("../models/patient");

const getPatientList = (req, res) => {
    const { name, age, disease, contactNumber, appointmentDate, appointmentDetails } = req.body;
    return patient.find({}, (err, patients)=>{
        res.send({ status:!err, patients })
    })
}

module.exports = {getPatientList}