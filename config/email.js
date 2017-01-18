module.exports.email = {
	service: "Mailgun",
	auth: {
		user: "postmaster@mg.supernaturallingerie.com", 
		pass: "d1ca4563c1e044b442a1a94a9d004e49"
	},
	templateDir: "api/emailTemplates",
	from: "info@supernaturallingerie.com",
	testMode: false,
	ssl: true
}