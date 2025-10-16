document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hbm');
  const navLinks = document.querySelector('nav ul');
  const closeBtn = document.querySelector('.close-btn');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
  });

  closeBtn.addEventListener('click', () => {
    navLinks.classList.remove('nav-active');
  });

  const fileInput = document.getElementById('file-upload');
  const uploadBtn = document.querySelector('.upload-btn');
  const galleryGrid = document.querySelector('.gallery-grid');

  if (fileInput && uploadBtn && galleryGrid) {
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        handleFileUpload(file);
      }
    });
  }

  async function handleFileUpload(file) {
  uploadBtn.textContent = 'Uploading...';
  uploadBtn.classList.add('uploading');

  const formData = new FormData();
  formData.append('reqtype', 'fileupload');
  formData.append('fileToUpload', file);

  try {
    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error(`Upload failed with status: ${response.status}`);

    const imageUrl = await response.text();

    if (!imageUrl.startsWith('http')) {
      throw new Error('Unexpected response: ' + imageUrl);
    }

    const link = document.createElement('a');
    link.href = imageUrl;
    link.target = '_blank';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'User uploaded image';

    link.appendChild(img);
    galleryGrid.prepend(link);
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Sorry, there was an error uploading your photo. Please try again.');
  } finally {
    uploadBtn.textContent = 'Upload Your Photo';
    uploadBtn.classList.remove('uploading');
    fileInput.value = '';
  }
}

});