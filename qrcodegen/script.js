let string = document.getElementById('url').value;
let button = document.getElementById('button');
let container = document.getElementById('image_cont');

// Function to check if the URL is valid
function isValidUrl(string) {
  try {
    let url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

button.addEventListener('click', async () => {
  let url = document.getElementById('url').value;
  
  // Validate the URL
  if (!isValidUrl(url)) {
    alert("Le lien n'est pas valide");
    return; // Exit if the URL is invalid
  }

  // Optionally remove 'wtlocale' parameter from the URL
  url = removeWtlocale(url);

  try {
    // Generate QR Code
    const qrCodeUrl = await generateQRCode(url);
    console.log("Generated QR Code:", qrCodeUrl);
    
    // Display the QR Code in the container
    container.innerHTML = `<img src="${qrCodeUrl}" alt="QR Code">`;

    // Create a button to generate the PDF
    createPdfButton(url);

  } catch (error) {
    console.error("Error:", error);
  }
});

// Function to remove 'wtlocale' parameter from the URL
function removeWtlocale(url) {
    // Regular expression to match both 'wtlocale' and 'prefer' parameters
    const pattern = /([?&])(wtlocale|prefer)=[^&]*&?/g;

    // Loop to repeatedly remove both parameters until they no longer exist
    let updatedUrl = url;
    while (pattern.test(updatedUrl)) {
        updatedUrl = updatedUrl.replace(pattern, '$1');
    }

    // Clean up any trailing '?' or '&' if they exist
    updatedUrl = updatedUrl.replace(/[?&]$/, '');

    return updatedUrl;
}

// Function to generate QR Code URL
async function generateQRCode(data) {
  const baseUrl = "https://api.qrserver.com/v1/create-qr-code/";
  const params = new URLSearchParams({
    size: "150x150",
    data: data
  });
  const qrCodeUrl = `${baseUrl}?${params.toString()}`;
  return qrCodeUrl;
}

// Function to create a PDF generation button inside the container
function createPdfButton(url) {
  const pdfButton = document.createElement('button');
  pdfButton.textContent = "Générer PDF";
  pdfButton.addEventListener('click', () => generateQRCodePDF(url));
  container.appendChild(pdfButton);
}

// Function to generate PDF with QR Code
async function generateQRCodePDF(data) {
  try {
    const qrCodeUrl = await generateQRCode(data);
    const response = await fetch(qrCodeUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch QR code: ${response.statusText}`);
    }
    const blob = await response.blob();
    const qrCodeDataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    // Generate PDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const qrWidth = 30; // 3 cm in points
    const qrHeight = 30; // 3 cm in points
    const margin = 10; // Margin around the edges of the page
    const rows = 7; // Number of rows
    const cols = 5; // Number of columns

    let xPos = margin;
    let yPos = margin;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        pdf.addImage(qrCodeDataUrl, "PNG", xPos, yPos, qrWidth, qrHeight);
        xPos += qrWidth + margin;
      }
      xPos = margin;
      yPos += qrHeight + margin;
    }

    // Save PDF
    pdf.save("QRCodeGrid.pdf");
    console.log("PDF generated successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}
