const slugify = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with -
    .replace(/^-+|-+$/g, '') // Remove leading/trailing -
    .substring(0, 100); // Max 100 chars
};

// Check uniqueness (call this in controller before save)
const generateUniqueSlug = async (BlogModel, title, existingId = null) => {
  let slug = slugify(title);
  let counter = 0;
  
  while (true) {
    const checkSlug = counter === 0 ? slug : `${slug}-${counter}`;
    const existing = await BlogModel.findOne({ 
      slug: checkSlug,
      ...(existingId && { _id: { $ne: existingId } })
    });
    
    if (!existing) return checkSlug;
    counter++;
  }
};

export { slugify, generateUniqueSlug };

