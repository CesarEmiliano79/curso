// ===== Configuración de Cloudinary =====
// Igual que firebaseConfig en firebase.jsx, estos valores se toman de
// variables de entorno (.env), nunca deben quedar hardcodeados en el código.
//
// Agrega a tu .env:
//   VITE_CLOUDINARY_CLOUD_NAME=tu-cloud-name
//   VITE_CLOUDINARY_UPLOAD_PRESET=tu-upload-preset   (debe ser "unsigned")
export const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Sube una imagen a Cloudinary vía HTTP (no hay SDK de "storage" como en Firebase).
 * @param {File} file - archivo seleccionado desde un <input type="file">
 * @returns {Promise<string>} la URL segura (https) del recurso subido (data.secure_url)
 */
export async function uploadImageToCloudinary(file) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      'Cloudinary no está configurado: faltan VITE_CLOUDINARY_CLOUD_NAME o VITE_CLOUDINARY_UPLOAD_PRESET en tu .env'
    );
  }

  if (!file) {
    throw new Error('No image file provided');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!response.ok) {
    throw new Error('Error uploading image to Cloudinary');
  }

  const data = await response.json();
  return data.secure_url;
}