const PDFDocument = require('pdfkit');
const path = require('path')

// index.js
prescriptionDataa = {
	name: 'Pankaj Kumavat',
	age: '12',
	gender: 'male',
	email: 'pankaj.kumavat',
	diagnosis: 'Loosing weight',
	appointmentDate: '2023-08-31',
	patientComplaint: 'Loosing weight, slow heart beat, cough etc',
	bloodPressure: '120-80',
	temparature: '234',
	contactNumber: '9812345678',
	prescriptionDetails: [
		{
			name: 'DOLO 350',
			type: 'TAB',
			intakeRoute: 'Oral Head',
			dosage: '1mg',
			intakeRoutine: '111',
			intakePattern: 'Before Meals'
		},
		{
			name: 'B complex',
			type: 'INJ',
			intakeRoute: 'IV',
			dosage: '2mg',
			intakeRoutine: '100',
			intakePattern: 'After Meals'
		},
	],
	followup: 'no followup',
	advise: 'no advise\nadvisesss'
}

const invoice = {
	shipping: {
		name: 'John Doe',
		address: '1234 Main Street',
		city: 'San Francisco',
		state: 'CA',
		country: 'US',
		postal_code: 94111,
	},
	items: [
		{
			item: 'TC 100',
			description: 'Toner Cartridge',
			quantity: 2,
			amount: 6000,
		},
		{
			item: 'USB_EXT',
			description: 'USB Cable Extender',
			quantity: 1,
			amount: 2000,
		},
	],
	subtotal: 8000,
	paid: 0,
	invoice_nr: 1234,
};

const getDataToPDF = (req, res) => {
	const prescriptionData = req.body
	let doc = new PDFDocument({ margin: 50 });
	doc.registerFont('kannada', path.join(__dirname + '/..', 'Kedage.ttf'));
	doc.font('Helvetica')
	doc.pipe(res)
	generateHeader(doc);
	generatePatientInformation(doc, prescriptionData);
	generatePrescripptionTable(doc, prescriptionData);
	generateFollowUpAndAdviceSection(doc, prescriptionData);
	doc.end();
}

const generateHeader = (doc) => {
	doc
		.image('pre-logo.png', 50, 45, { width: 50 })
		.fillColor('#444444')
		.fontSize(20)
		.text('Ayushman Hospital', 110, 57)
		.fontSize(10)
		.text('Dr. Shivashankar Huddar', 200, 50, { align: 'right' })
		.text('123 Main Street', 200, 65, { align: 'right' })
		.text('Chennamma Circle, Hubli, 10021', 200, 80, { align: 'right' })
		.underline(48, 80, 530, 23)
		.moveDown();
}

const generateFooter = (doc) => {
	doc.fontSize(
		10,
	).text(
		'Payment is due within 15 days. Thank you for your business.',
		50,
		740,
		{ align: 'center', width: 500 },
	);
}

const generatePatientInformation = (doc, prescriptionData) => {
	doc
		.fontSize(15)
		.text(`Patient details`, 50, 120)
		.fontSize(10)
		.text(`Patient Name : ${prescriptionData.name}`, 50, 150)
		.text(`Age/Gender : ${prescriptionData.age}/${prescriptionData.gender.at(0).toUpperCase()}`, 50, 165)
		.text(`Patient Complaint : ${prescriptionData.patientComplaint}`, 50, 180)
		.text(`Diagnosis : ${prescriptionData.diagnosis}`, 50, 195)
		.text(`Contact number : ${prescriptionData.contactNumber}`, 400, 150)
		.text(`Date : ${prescriptionData.appointmentDate}`, 400, 165)
		.text(`Blood Pressure : ${prescriptionData.bloodPressure}`, 400, 180)
		.text(`Temparature : ${prescriptionData.temparature}`, 400, 195)
		.moveDown();
}

const generateTableRow = (doc, y, item) => {
	const { name, type, intakeRoute, dosage, intakeRoutine, intakePattern } = item;

	doc.fontSize(10)
	.text(type, 50, y)
		.text(name, 90, y, { width: 150 })
		.text(intakeRoute, 240, y, { width: 80 })
		.text(dosage, 325, y)
		.font('kannada')
		.text(generateRoutine(intakeRoutine), 370, y, { width: 130 })
		.text(getKannadaText(intakePattern), 490, y)
		.font('Helvetica')
		.moveDown()
}

const getKannadaText = (text) => {
	const textUpdated = text.toLowerCase();
	const kannadaStrings = ['ಬೆಳಗ್ಗೆ', 'ಮಧ್ಯಾಹ್ನ', 'ರಾತ್ರಿ', 'ಊಟದ ನಂತರ', 'ಊಟದ ಮೊದಲು']
	const englishStrings = ['morning', 'afternoon', 'night', 'after meals', 'before meals']
	const textIndex = englishStrings.findIndex(e => e == textUpdated);
	return kannadaStrings[textIndex]
}

const generateRoutine = (routineText) => {
	const routineTimings = ['morning', 'afternoon', 'night']
	const routines = routineText.split('').map((s, i) => +s ? getKannadaText(routineTimings[i]) : '        ').join(' - ')
	return routines
}

const generatePrescriptionHeadings = (doc, y) => {
	doc.fontSize(12)
		.text('Type', 50, y)
		.text('Name', 90, y, { width: 150 })
		.text('Intake Route', 240, y, { width: 80 })
		.text('Dose', 325, y)
		.text('Routine', 370, y, { align: 'left', width: 130 })
		.text('Pattern', 490, y)
		.underline(48, y, 510, 18)
		.moveDown()
}

function generatePrescripptionTable(doc, prescriptionData) {
	let i, invoiceTableTop = 295;
	doc.fontSize(15)
		.text(`Prescription details`, 50, 250)
		.fontSize(10)
		generatePrescriptionHeadings( doc, 290);
	for (i = 0; i < prescriptionData.prescriptionDetails.length; i++) {
		const item = prescriptionData.prescriptionDetails[i];
		const position = invoiceTableTop + (i + 1) * 20;
		generateTableRow( doc, position, item );
	}
}

const generateFollowUpAndAdviceSection = (doc, prescriptionData) => {
	doc
	.moveDown()
	.moveDown()
	.moveDown()
	.fontSize(15)
	.text(`Followup`, 50)
	.fontSize(10)
	.text(`${prescriptionData.followup}`)
	.moveDown()
	.moveDown()
	.moveDown()
	.fontSize(15)
	.text(`Advises`, 50)
	.fontSize(10)
	.text(`${prescriptionData.advise}`)
	.moveDown()
}

module.exports = { getDataToPDF }