const path = require('path');
const fs = require('fs');

module.exports = function (app) {
  // پروکسی برای مسیر /api/products
  app.get('/api/products', (req, res) => {
    const filePath = path.resolve(__dirname, '../public/mock-api/products/index.json');
    
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      setTimeout(() => {
        res.json(data);
      }, 500); // اضافه کردن تاخیر مصنوعی برای شبیه‌سازی شبکه
    } catch (error) {
      console.error('خطا در خواندن فایل محصولات:', error);
      res.status(500).json({ error: 'خطا در دریافت داده‌ها' });
    }
  });

  // پروکسی برای مسیر /api/categories
  app.get('/api/categories', (req, res) => {
    const filePath = path.resolve(__dirname, '../public/mock-api/categories/index.json');
    
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      setTimeout(() => {
        res.json(data);
      }, 500); // اضافه کردن تاخیر مصنوعی برای شبیه‌سازی شبکه
    } catch (error) {
      console.error('خطا در خواندن فایل دسته‌بندی‌ها:', error);
      res.status(500).json({ error: 'خطا در دریافت داده‌ها' });
    }
  });

  // مسیرهای دیگر می‌توانند در اینجا اضافه شوند
};