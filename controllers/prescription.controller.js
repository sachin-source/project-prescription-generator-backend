const prescription = require("../models/prescription");
const patient = require("../models/patient");
const visit = require("../models/visit");
const ExcelJS = require('exceljs');


const getPrescriptionList = (req, res) => {
    const { name, age, disease, contactNumber, appointmentDate, appointmentDetails } = req.body;
    
}

const savePrescription = (req, res) => {
    const { name, age, gender, email, diagnosis, appointmentDate, patientComplaint, bloodPressure, temparature, contactNumber, prescriptionDetails } = req.body;
    // console.log({ name, age, disease, contactNumber, appointmentDate, appointmentDetails, prescriptionDetails, email });
    patient.create({ name, age, gender, contactNumber, email }).then((data) => {
        patient.load({ criteria : {name, contactNumber} }).then((patientData) => {
            const patientId = patientData._id.toString();
            visit.create({ name, patientId, appointmentDate, diagnosis, patientComplaint, bloodPressure, temparature }).then((d) => {
                visit.load({ criteria : { name, patientId, appointmentDate }}).then((visitData) => {
                    const prescriptionDetailsArr = prescriptionDetails.map((p) => {
                        return {...p, ...{ visitId : visitData._id.toString(), patientId }}
                    })
                    prescription.insertMany(prescriptionDetailsArr).then((p) => {
                        console.log({ p, visitData, patientData })
                        res.send({ status : true, msg : "prescriptions saved successfully" })
                    })
                })
            })
        })
    })
}

const uploadPrescriptions = (req, res) => {
    console.log(req.files)
    // return res.send(req.files)
    const workbook = new ExcelJS.Workbook();

}

module.exports = { getPrescriptionList, savePrescription, uploadPrescriptions }