const nodemailer = require('nodemailer');
const user_gmail = process.env.USER_GMAIL
const password_gmail = process.env.PASSWORD_GMAIL


 const sendEmail = async (to, subject, message) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user_gmail,
      pass: password_gmail,
    },
  });

  const mailOptions = {
    from: user_gmail,
    to: to,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail', error);
  }
};


 const isStrongPassword = (password) => {
    const minLength = 6;
    const missingRequirements = [];
  
    if (password.length < minLength) {
      missingRequirements.push(`Password should be at least ${minLength} characters long.`);
    }
  
  
    const strong = missingRequirements.length === 0;
  
    return { strong, missingRequirements };
  };

 const generateCode = (length) => {
    const characters = '0123456789';
    let code = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    return code;
  };
  

  module.exports = {
    sendEmail,
    isStrongPassword,
    generateCode,
  };