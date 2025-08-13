import Admin from '@/models/Admin.js';
import connectDB from '@/lib/DBconnection';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders });
}

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return new Response(JSON.stringify({ message: 'Admin already exists' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role: 'admin',
    });

    if (admin) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      return new Response(
        JSON.stringify({
          name: admin.name,
          email: admin.email,
          role: admin.role,
          token,
        }),
        {
          status: 201,
          headers: corsHeaders,
        }
      );
    } else {
      return new Response(JSON.stringify({ message: 'Invalid admin data' }), {
        status: 400,
        headers: corsHeaders,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}