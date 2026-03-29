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
    console.log('📤 Uploading featured image:', filePath);
    const { existsSync } = await import('node:fs');
    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'consultancy/blogs/featured',
      transformation: [
        { width: 1200, height: 630, crop: 'fill' }, // SEO/OG
        { width: 800, height: 600, crop: 'fill' }
      ]
    });
    console.log('✅ Featured image uploaded:', result.secure_url);
    return result;
  } catch (error) {
    console.error('❌ Featured upload failed:', error.message);
    throw error;
  }
};

// New: Upload multiple content images (for Quill editor)
export const uploadContentImages = async (files) => {
  try {
    console.log(`📤 Uploading ${files.length} content images`);
    const uploadPromises = files.map(async (filePath, index) => {
      const { existsSync } = await import('node:fs');
      if (!existsSync(filePath)) {
        console.warn(`⚠️ Skipping missing file: ${filePath}`);
        return null;
      }
      
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `consultancy/blogs/content/${Date.now()}`,
        transformation: [
          { width: 1000, height: 1000, crop: 'limit' }, // Responsive
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ],
        public_id: `content-${Date.now()}-${index}`
      });
      console.log(`✅ Content image ${index + 1}:`, result.secure_url);
      return result.secure_url;
    });
    
    const results = await Promise.all(uploadPromises);
    return results.filter(url => url !== null);
  } catch (error) {
    console.error('❌ Content images upload failed:', error.message);
    throw error;
  }
};

export default cloudinary;
