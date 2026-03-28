import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

console.log('☁️ Cloudinary config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'MISSING',
  api_key: process.env.CLOUDINARY_API_KEY ? 'SET' : 'MISSING',
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'MISSING'
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath) => {
  try {
    console.log('📤 Uploading image:', filePath);
    const { existsSync } = await import('node:fs');
    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'consultancy',
      transformation: [{ width: 800, height: 600, crop: 'fill' }]
    });
    console.log('✅ Image uploaded:', result.secure_url);
    return result;
  } catch (error) {
    console.error('❌ Cloudinary upload failed:', error.message);
    console.error('Full error:', error);
    throw error;
  }
};

export default cloudinary;
