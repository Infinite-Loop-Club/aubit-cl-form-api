const nodemailer = require('nodemailer');

const { AUBIT_FROM_EMAIL, AUBIT_FROM_EMAIL_PASSWORD } = process.env;

exports.sendEmail = staffEmail => {
	// ? Send confirmation mail to student
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: AUBIT_FROM_EMAIL,
			pass: AUBIT_FROM_EMAIL_PASSWORD
		}
	});

	const mailOptions = {
		to: 'jacksparrow.mdjack@gmail.com', // ? Admin mail put here to inform it
		from: AUBIT_FROM_EMAIL,
		subject: 'Account Verification',
		text:
			'Hello,\n\n' +
			' - This is a Inform mail of student signup and Kindly verify it after 7days otherwise the signup account automatically will be truncated!' +
			staffEmail +
			' is an Unverified Profile.\n'
	};

	transporter.sendMail(mailOptions, function (err) {
		console.log('successfully mail send to admin!');
	});
};

exports.bulkMail = (emails, message) => {
	// Send confirmation mail to student
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: AUBIT_FROM_EMAIL,
			pass: AUBIT_FROM_EMAIL_PASSWORD
		}
	});

	var mailOptions = {
		to: emails, ///Admin mail put here to inform it
		from: AUBIT_FROM_EMAIL,
		subject: 'Announcement',
		text:
			'Hi students!,\n\n' +
			'This is for Ncc cadets\n\n' +
			message +
			'\n\n From anna university(Bit campus)'
	};

	transporter.sendMail(mailOptions, function (err) {
		if (err) console.log(err);

		console.log('successfully mail sen bulk mail!');
	});
};
