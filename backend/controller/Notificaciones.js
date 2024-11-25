import nodemailer from 'nodemailer';  

class EmailService {
  constructor() {
    
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'josueandres.ap@gmail.com', 
        pass: '' //agreguen la contraseña privada
        //cuando manden comitts no suban con la clave porfa
      }
    });
  }

  // Método para enviar un correo con asunto y texto
  async sendEmail(subject, text) {
    const mailOptions = {
      from: 'josueandres.ap@gmail.com', 
      to: 'josueandres.form@gmail.com',
      subject: subject, 
      text: text         
    };

    try {
      let info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado: ' + info.response);
    } catch (error) {
      console.error('Error al enviar correo: ', error);
    }
  }
}

export default EmailService;
