// ===== Utilidades de validación =====
// Revisan que los datos tengan el tipo/formato esperado ANTES de guardarlos
// en Firebase, para evitar que datos corruptos rompan la app más adelante.

const isNonEmptyString = (value) =>
  typeof value === 'string' && value.trim().length > 0

// Un nombre debe ser texto y no puramente un número (ej: "12345")
const isNameLike = (value) =>
  isNonEmptyString(value) && Number.isNaN(Number(value.trim()))

const isValidEmail = (value) =>
  isNonEmptyString(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

// Acepta dígitos, espacios, guiones, paréntesis y un + inicial opcional
const isValidPhone = (value) =>
  isNonEmptyString(value) && /^\+?[0-9()\-\s]{7,20}$/.test(value.trim())

const isValidZip = (value) =>
  isNonEmptyString(value) && /^\d{4,10}$/.test(value.trim())

// Acepta mm/dd/yyyy o yyyy-mm-dd
const isValidDateLike = (value) =>
  isNonEmptyString(value) &&
  (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value.trim()) ||
    /^\d{4}-\d{1,2}-\d{1,2}$/.test(value.trim()))

const isStringArray = (value) =>
  Array.isArray(value) && value.every((v) => typeof v === 'string')

/**
 * Valida los datos del formulario de inscripción de jugadores.
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateRegistration(data) {
  const errors = []

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Registration data is missing or invalid'] }
  }

  if (!isNameLike(data.first_name)) errors.push('First name must be text, not a number')
  if (!isNameLike(data.last_name)) errors.push('Last name must be text, not a number')
  if (!isNameLike(data.parent)) errors.push('Parent/Guardian name must be text, not a number')
  if (!isNameLike(data.city)) errors.push('City must be text, not a number')
  if (!isNonEmptyString(data.address)) errors.push('Address is required')
  if (!isValidZip(data.zip)) errors.push('Zip code must contain only digits (4-10)')
  if (!isValidDateLike(data.birth)) errors.push('Birth date must be in mm/dd/yyyy format')
  if (!['male', 'female'].includes(data.gender)) errors.push('Gender must be "male" or "female"')
  if (!isNonEmptyString(data.grade)) errors.push('Grade is required')
  if (!isValidPhone(data.phone)) errors.push('Phone number format is invalid')
  if (!isValidEmail(data.email)) errors.push('Email format is invalid')
  if (!isStringArray(data.normal_positions)) errors.push('Normal positions must be a list of text values')
  if (!isStringArray(data.wanted_positions)) errors.push('Wanted positions must be a list of text values')
  if (typeof data.has_uniform !== 'boolean') errors.push('has_uniform must be true or false')

  if (data.has_uniform) {
    if (!isNonEmptyString(data.jersey_size)) errors.push('Jersey size is required when you already have a uniform')
    if (!isNonEmptyString(data.shorts_size)) errors.push('Shorts size is required when you already have a uniform')
  }

  if (!isNameLike(data.signature)) errors.push('Signature must be text, not a number')
  if (!isNonEmptyString(data.date)) errors.push('Date is required')

  return { valid: errors.length === 0, errors }
}

/**
 * Valida un comentario/mensaje antes de guardarlo en messages/{gameId}.
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateMessage(message) {
  const errors = []

  if (!message || typeof message !== 'object') {
    return { valid: false, errors: ['Message data is missing or invalid'] }
  }

  if (!isNonEmptyString(message.gameId)) errors.push('gameId must be text')
  if (!isNonEmptyString(message.userId)) errors.push('userId must be text')
  if (!isNameLike(message.userName)) errors.push('userName must be text, not a number')
  if (!isNonEmptyString(message.text)) errors.push('Comment text cannot be empty')
  if (typeof message.text === 'string' && message.text.length > 2000) {
    errors.push('Comment text is too long (max 2000 characters)')
  }
  if (message.userPhotoURL !== undefined && message.userPhotoURL !== null && typeof message.userPhotoURL !== 'string') {
    errors.push('userPhotoURL must be text (a URL)')
  }
  if (message.likes !== undefined && typeof message.likes !== 'number') {
    errors.push('likes must be a number')
  }
  if (message.replies !== undefined && typeof message.replies !== 'number') {
    errors.push('replies must be a number')
  }

  return { valid: errors.length === 0, errors }
}