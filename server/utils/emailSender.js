import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: Number(process.env.PORT_EMAIL),
  secure: Boolean(process.env.SECURE),
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});
const testTransporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "jody.marks47@ethereal.email",
    pass: "wAHp52Ndg7Fpua8STu",
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Vérification de votre adresse email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Confirmation d'email</h2>
        <p>Merci de vous être inscrit. Veuillez cliquer sur le lien ci-dessous pour vérifier votre adresse email :</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">Vérifier mon email</a>
        <p>Si vous n'avez pas créé de compte, veuillez ignorer cet email.</p>
      </div>
    `,
  };

  try {
    await testTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Erreur lors de l'envoi du mail:", error);
    throw new Error("Échec de l'envoi du mail");
  }
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Réinitialisation du mot de passe</h2>
        <p>Vous avez demandé une réinitialisation de mot de passe. Cliquez sur le lien ci-dessous pour procéder :</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">Réinitialiser mon mot de passe</a>
        <p>Ce lien expirera dans 1 heure. Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
      </div>
    `,
  };

  try {
    await testTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Erreur lors de l'envoi du mail:", error);
    throw new Error("Échec de l'envoi du mail");
  }
};

// دالة لإرسال البريد الإلكتروني للمدير بعد إنشاء الطلب
export const sendOrderEmailToAdmin = async (orderPopulated) => {
  const { userId, phone, company, address, message, total_price, items } =
    orderPopulated;

  const mailOptions = {
    from: process.env.USER,
    to: process.env.ADMIN_EMAIL,
    subject: "Nouvelle commande reçue",
    html: `
      <h2>Nouvelle commande</h2>
      <p><strong>Utilisateur Name:</strong> ${userId.name}</p>
<p><strong>Utilisateur Email:</strong> ${userId.email}</p>
      <p><strong>Téléphone:</strong> ${phone}</p>
      <p><strong>Adresse:</strong> ${address}</p>
      <p><strong>Société:</strong> ${company || "N/A"}</p>
      <p><strong>Message:</strong> ${message || "Aucun"}</p>
      <p><strong>Prix total:</strong> ${total_price} MAD</p>
      <h3>Articles:</h3>
      <ul>
        ${items
          .map(
            (item) => `
          <li><strong>${item.produitId.name}</strong> - Qté: ${item.quantity}</li>
        `
          )
          .join("")}
      </ul>
    `,
  };

  try {
    await testTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Erreur lors de l'envoi du mail:", error);
    throw new Error("Échec de l'envoi du mail");
  }
};