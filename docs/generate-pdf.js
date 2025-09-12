const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const marked = require('marked');

async function generatePDF() {
  try {
    // Read the markdown file
    const markdownPath = path.join(__dirname, 'PROJECT_DOCUMENTATION.md');
    const markdownContent = fs.readFileSync(markdownPath, 'utf8');
    
    // Convert markdown to HTML
    const htmlContent = marked.parse(markdownContent);
    
    // Create full HTML document with styling
    const fullHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>AI Train Optimization System Documentation</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            h1 {
                color: #2563eb;
                border-bottom: 3px solid #2563eb;
                padding-bottom: 10px;
            }
            h2 {
                color: #1e40af;
                border-bottom: 2px solid #e5e7eb;
                padding-bottom: 5px;
                margin-top: 30px;
            }
            h3 {
                color: #1e3a8a;
                margin-top: 25px;
            }
            code {
                background-color: #f3f4f6;
                padding: 2px 4px;
                border-radius: 3px;
                font-family: 'Courier New', monospace;
            }
            pre {
                background-color: #f9fafb;
                border: 1px solid #e5e7eb;
                border-radius: 5px;
                padding: 15px;
                overflow-x: auto;
            }
            table {
                border-collapse: collapse;
                width: 100%;
                margin: 15px 0;
            }
            th, td {
                border: 1px solid #e5e7eb;
                padding: 8px 12px;
                text-align: left;
            }
            th {
                background-color: #f3f4f6;
                font-weight: bold;
            }
            .page-break {
                page-break-before: always;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding: 20px;
                background: linear-gradient(135deg, #2563eb, #1e40af);
                color: white;
                border-radius: 10px;
            }
            .toc {
                background-color: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
            }
            .metric-box {
                background-color: #eff6ff;
                border-left: 4px solid #2563eb;
                padding: 15px;
                margin: 15px 0;
            }
            @media print {
                body { margin: 0; }
                .page-break { page-break-before: always; }
            }
        </style>
    </head>
    <body>
        ${htmlContent}
    </body>
    </html>
    `;
    
    // Launch puppeteer and generate PDF
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(fullHTML, { waitUntil: 'networkidle0' });
    
    const pdfPath = path.join(__dirname, 'AI_Train_Optimization_System_Documentation.pdf');
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
          AI-Based Train Optimization System Documentation
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `
    });
    
    await browser.close();
    
    console.log(`PDF generated successfully: ${pdfPath}`);
    return pdfPath;
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

// Run the function
generatePDF().catch(console.error);