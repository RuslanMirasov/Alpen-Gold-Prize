export const initDropzones = () => {
  if (typeof Dropzone === 'undefined') {
    console.warn('Dropzone не подключён');
    return;
  }

  Dropzone.autoDiscover = false;

  const instances = {};
  const dropzones = document.querySelectorAll('.dropzone');

  if (!dropzones.length) return instances;

  const validateForm = form => {
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return;

    let isValid = true;

    form.querySelectorAll('.dropzone').forEach(zone => {
      const dz = zone.dropzone;
      if (!dz) return;

      const isRequired = zone.hasAttribute('data-required');
      const files = dz.files || [];

      const hasError = files.some(file => file.status === Dropzone.ERROR);
      const hasValidFile = files.length > 0 && !hasError;

      if (hasError) {
        isValid = false;
      }

      if (isRequired && !hasValidFile) {
        isValid = false;
      }
    });

    submitButton.disabled = !isValid;
  };

  dropzones.forEach(zone => {
    if (zone.dropzone) return;

    const form = zone.closest('form');
    if (!form) return;

    const name = zone.dataset.name || 'file';
    const message = zone.dataset.message || 'Перетащите файл';
    const accept = zone.dataset.accept || 'image/*';
    const maxFiles = Number(zone.dataset.maxFiles || 1);

    const dz = new Dropzone(zone, {
      url: '#',
      autoProcessQueue: false,
      uploadMultiple: false,
      maxFiles,
      acceptedFiles: accept,
      addRemoveLinks: true,
      clickable: true,
      thumbnailWidth: 500,
      thumbnailHeight: 500,
      dictDefaultMessage: message,
      maxFilesize: 10,
      dictRemoveFile: 'Удалить',
    });

    dz.on('addedfile', () => {
      if (dz.files.length > 1) {
        dz.removeFile(dz.files[0]);
      }
      validateForm(form);
    });

    dz.on('complete', () => validateForm(form));
    dz.on('removedfile', () => validateForm(form));

    instances[name] = dz;
  });

  return instances;
};
