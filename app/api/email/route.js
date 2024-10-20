// pages/api/email.js
import { ConnectDb } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from 'next/server';

const LoadDB = async () => {
  await ConnectDb();
};

LoadDB();

export async function POST(request) {
  const formData = await request.formData();
  const email = formData.get('email');

  // Basic email validation
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ success: false, msg: "Invalid email address" }, { status: 400 });
  }

  const emailData = { email: email };

  try {
    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, msg: "Email Subscribed" });
  } catch (error) {
    console.error('Error saving email:', error); // Log the error
    return NextResponse.json({ success: false, msg: "Failed to subscribe email" }, { status: 500 });
  }
}

export async function GET(request) {
    const emails = await EmailModel.find({});
    return NextResponse.json({emails});
}

export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({success:true,msg:"Email Deleted"})
}