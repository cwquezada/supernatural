/**
 * ContactController
 *
 * @description :: Server-side logic for managing Contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
		Contact.create(req.body).exec(function(err, contact) {
			if (err) {
				return res.json(err.status, {err: err});
			}
			if (contact) {
				Mailer.sendContactMessage(contact);
				res.json(200, {contact: contact});
			}
		});
	}
};

