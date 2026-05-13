// Lee los parámetros de la URL y llena la hoja de registro
const params = new URLSearchParams(window.location.search);

// Campos simples — el id del span coincide con el name del input
const campos = [
    'first_name', 'last_name', 'street_address', 'city',
    'postal_code', 'country', 'birth_date', 'age',
    'mobile_phone', 'email', 'club_membership',
    'cycling_experience', 'cycling_license', 'gender',
    'emergency_name', 'emergency_phone', 'agreement_date'
];

campos.forEach(campo => {
    const el = document.getElementById('val-' + campo);
    if (el) {
        const valor = params.get(campo);
        el.textContent = valor ? decodeURIComponent(valor) : '—';
    }
});

// Modalidades (checkboxes — pueden ser varios valores)
const modalidades = params.getAll('cycling_type');
const elModalidades = document.getElementById('val-cycling_type');
if (elModalidades) {
    elModalidades.textContent = modalidades.length > 0
        ? modalidades.map(m => decodeURIComponent(m)).join(', ')
        : '—';
}

// Firma digital (imagen en base64)
const firma = params.get('digital_signature');
const imgFirma = document.getElementById('val-firma');
if (imgFirma) {
    if (firma && firma.startsWith('data:image')) {
        imgFirma.src = firma;
        imgFirma.style.display = 'block';
    } else {
        imgFirma.style.display = 'none';
    }
}