const prescription = require("../models/prescription");
const patient = require("../models/patient");
const visit = require("../models/visit");

const getPrescriptionList = (req, res) => {
    const { name, age, disease, contactNumber, appointmentDate, appointmentDetails } = req.body;
    
}

const savePrescription = (req, res) => {
    const { name, age, disease, contactNumber, appointmentDate, appointmentDetails, prescriptionDetails } = req.body;
    console.log({ name, age, disease, contactNumber, appointmentDate, appointmentDetails, prescriptionDetails });
    patient.create({ name, age, disease, contactNumber, appointmentDate, appointmentDetails }).then((data) => {
        patient.load({ criteria : {name, contactNumber} }).then((patientData) => {
            const patientId = patientData._id.toString();
            visit.create({ name, patientId, appointmentDate }).then((d) => {
                visit.load({ criteria : { name, patientId, appointmentDate }}).then((visitData) => {
                    const prescriptionDetailsArr = prescriptionDetails.map((p) => {
                        return {...p, ...{ visitId : visitData._id.toString(), patientId }}
                    })
                    console.log(prescriptionDetailsArr)
                    prescription.insertMany(prescriptionDetailsArr).then((p) => {
                        res.send({ status : true, msg : "prescriptions saved successfully" })
                    })
                })
            })
        })
    })
}

const uploadPrescriptions = (req, res) => {
    console.log(req.files)
    return res.send(req.files)
}

module.exports = { getPrescriptionList, savePrescription, uploadPrescriptions }