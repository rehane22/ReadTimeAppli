require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModels');
const nodemailer = require('nodemailer');
const { isStrongPassword, sendEmail, generateCode } = require('../../utils/sendEmail');
const secretKey = process.env.SECRET_KEY


exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      console.error({ success: false, message: 'There was an Error' });
      return res.send({ success: false, message: 'If user exists, an email was sent' });
    }

    const token = await generateCode(5)
    existingUser.resetToken = token;
    existingUser.resetTokenExpiration = Date.now() + 3600000;
    await existingUser.save();
    await sendEmail(email, 'Reset Token', `Here is your Reset Token: ${token}`);
    return res.send({ success: true, message: 'Email sent' });

  } catch (error) {
    console.error(error)
  }
};

exports.resetPasswordConfirm = async (req, res) => {
  try {
    const email = req.body.email
    const verificationCode = req.body.verificationCode
    const password = req.body.newPassword
    const user = await User.findOne({ email });

    passwordStrength = isStrongPassword(password)
    if (!passwordStrength.strong) {
      return res.send({ success: false, message: passwordStrength.missingRequirements.join('\n') });
    }

    if (!user || user.resetToken !== verificationCode) {

      return res.status(400).send({ success: false });
    }
    if (user.resetTokenExpiration < new Date()) {
      return res.status(400).send({ success: false, message: 'Token has expired.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.token = '';
    user.tokenExpiration = null;
    await user.save();
    return res.status(200).send({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'An error occurred. Please try again later.' });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie('jwtToken');
    res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la déconnexion' });
  }
};
/* exports.update = async (req, res) => {
  console.log(req)
  const { userId } = req.user;

  try {

    const { firstName, lastName, dateOfBirth, country } = req.body;


    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }


    user.firstName = firstName;
    user.lastName = lastName;
    user.dateOfBirth = dateOfBirth;
    user.country = country;


    await user.save();

    res.status(200).json({ message: "Profil mis à jour avec succès", user });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil" });
  }

};
 */