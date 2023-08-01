const PDFDocument = require('pdfkit');

// index.js
prescriptionData = {
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
      intakeRoutine: '010',
      intakePattern: 'After Meals'
    }
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
    const { name, age, gender, diagnosis, contactNumber, patientComplaint, appointmentDate, bloodPressure, temparature, followup, advise, prescriptionDetails } = req.body;

    console.log(JSON.stringify(req.body))
    let doc = new PDFDocument({ margin: 50 });
    doc.pipe(res)
    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);
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
		.moveDown();
}

const generateFooter = (doc) => {
	doc.fontSize(
		10,
	).text(
		'Payment is due within 15 days. Thank you for your business.',
		50,
		780,
		{ align: 'center', width: 500 },
	);
}

const generateCustomerInformation = (doc, invoice) => {
	const shipping = invoice.shipping;

	doc.text(`Invoice Number: ${invoice.invoice_nr}`, 50, 200)
		.text(`Invoice Date: ${new Date().getDate()}`, 50, 215)
		.text(`Balance Due: ${invoice.subtotal - invoice.paid}`, 50, 130)

		.text(shipping.name, 300, 200)
		.text(shipping.address, 300, 215)
		.text(
			`${shipping.city}, ${shipping.state}, ${shipping.country}`,
			300,
			130,
		)
		.moveDown();
}

const generateTableRow = (doc, y, c1, c2, c3, c4, c5) => {
	doc.fontSize(10)
		.text(c1, 50, y)
		.text(c2, 150, y)
		.text(c3, 280, y, { width: 90, align: 'right' })
		.text(c4, 370, y, { width: 90, align: 'right' })
		.text(c5, 0, y, { align: 'right' });
}

function generateInvoiceTable(doc, invoice) {
	let i,
		invoiceTableTop = 330;

	for (i = 0; i < invoice.items.length; i++) {
		const item = invoice.items[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			item.item,
			item.description,
			item.amount / item.quantity,
			item.quantity,
			item.amount,
		);
	}
}

module.exports = { getDataToPDF }