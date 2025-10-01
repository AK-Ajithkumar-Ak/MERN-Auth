import { mailtrapClient, sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";


export const sendVerificationEmail = async (email, verificationToken) => {
const recipient= [{email}]
  try {
    const response= await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject:"Verify your email",
      category: "Email Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("verificationCode", verificationToken)
    })

    console.log("verify Email sent successfully", response);
    
  } catch (error) {
    console.log("error in sendVerificationEmail controller", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
	const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
      template_uuid:"bf125116-8e8c-4ec5-8180-2bb0fd31f24d",
      template_variables:{
        company_info_name: "AJ mern Auth Company",
				name: name,
      }
    })

    console.log("welcome Email sent successfully", response);

  } catch (error) {
    console.log("error in sendWelcome Email controller", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
      subject:"Reset your password",
      category:"Password Reset",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
    })
console.log("password reset Email sent successfully", response);
  } catch (error) {
    console.log("error in sendPasswordResetEmail controller", error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
      subject:"Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    })
    console.log("Password reset successfully", response);

  } catch (error) {
    console.log("error in sendResetSuccessEmail controller", error);
    throw new Error(`Error sending password reset success email: ${error}`)
  }
};