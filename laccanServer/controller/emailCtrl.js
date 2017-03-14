var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
	service: 'Gmail',
		auth: {
			user: 'laxos.server@gmail.com',
			pass: 'laxos-1234'
		}
});

exports.send = function(emailList, query, callback){
	var mailOptions = {
		from: '"no-reply 🍹" <noreply@laccan.ufal.br>',
		to: emailList,
		subject: 'Saudações',
		html: '<b>Estimado usuário, esse é um email automático do servidor Laccan.</b>'+
			'<p>Segue o link da sua solicitação:</p>'+
			'<a href='+query.replace(/\s/g,'%20')+'>Download</a>'
	}

	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			callback({error:"Não foi possível enviar o email para: "+emailList});
		} else{
			callback("Enviado");
		}
	});
};
