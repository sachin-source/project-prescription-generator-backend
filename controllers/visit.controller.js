const visit = require("../models/visit");
const prescription = require("../models/prescription");

const getvisitList = (req, res) => {
    const { patientId } = req.query;
    return visit.find({ patientId }, null, {sort: {createdAt: -1}}, (err, visits) => {
        const visitIds = visits.map((visitData) => visitData._id.toString())
        prescription.find({ visitId : { $in : visitIds }}, (err, prescriptions) => {
            res.send({ visits, prescriptions })
        })
    })
}

module.exports = { getvisitList }