import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(req : Request){
  const request = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  try {
    await transporter.sendMail({
      from: `${request.email}`,
      to: process.env.EMAIL_USER, 
      subject: `New Contact Form Message from ${request.name}`,
      text: `Name: ${request.name}\nEmail: ${request.email}\n\nMessage: ${request.message}`,
    });
    return NextResponse.json({ message: "Email sent successfully" }, {status: 200} );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Email sending failed" }, {status: 500} );
  }
}
