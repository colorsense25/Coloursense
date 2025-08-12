import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fetch all photos API
export async function GET() {
  try {

    const { resources } = await cloudinary.search
      .expression('resource_type:image AND folder:Gallery')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    const photos = resources.map((resource) => ({
      public_id: resource.public_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      created_at: resource.created_at,
    }));

    return NextResponse.json({
      success: true,
      photos,
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch photos',
      details: error.message 
    }, { status: 500 });
  }
}