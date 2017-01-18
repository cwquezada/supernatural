module.exports.sendContactMessage = function(obj) {

	sails.hooks.email.send(
		"contactMessage", 
		{
			Name: obj.name,
			Email: obj.email,
			Message: obj.message
		},
		{
			to: "info@supernaturallingerie.com",
			subject: "A message from " + obj.name
		},
		function(err) {
			console.log(err || "Contact Message Sent!");
		}
	)
	
}