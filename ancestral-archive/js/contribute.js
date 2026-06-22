const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('file-input');
const uploadPreview = document.getElementById('upload-preview');
const submitBtn = document.getElementById('btn-submit');
const submitSuccess = document.getElementById('submit-success');

uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') fileInput.click();
});

uploadZone.addEventListener('dragover', e => {
  e.preventDefault();
  uploadZone.style.borderColor = 'var(--earth)';
  uploadZone.style.background = '#fdf8f2';
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.style.borderColor = '';
  uploadZone.style.background = '';
});

uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.style.borderColor = '';
  uploadZone.style.background = '';
  const file = e.dataTransfer.files[0];
  if (file) showPreview(file);
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) showPreview(file);
});

function showPreview(file) {
  const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
  uploadPreview.style.display = 'flex';
  uploadPreview.innerHTML = '<span style="font-size:18px;">&#128196;</span>'
    + '<span>' + file.name + ' &middot; ' + sizeMB + ' MB</span>';
}

submitBtn.addEventListener('click', () => {
  const title = document.getElementById('input-title').value.trim();
  const name = document.getElementById('input-name').value.trim();
  const type = document.querySelector('input[name="media-type"]:checked');

  if (!title || !name || !type) {
    const missing = [];
    if (!type) missing.push('media type');
    if (!title) missing.push('title');
    if (!name) missing.push('your name');
    alert('Please fill in: ' + missing.join(', ') + '.');
    return;
  }

  submitBtn.closest('.form-submit-row').style.display = 'none';
  submitSuccess.style.display = 'flex';
  submitSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
