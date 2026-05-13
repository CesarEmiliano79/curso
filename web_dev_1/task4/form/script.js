// Canvas de firma digital
const canvas = document.getElementById('canvasFirma');
const ctx = canvas.getContext('2d');
const firmaInput = document.getElementById('firmaInput');
const limpiarBtn = document.getElementById('limpiarBtn');

let dibujando = false;

// Ajusta coordenadas según escala del canvas
function getCoordenadas(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches) {
        return {
            x: (e.touches[0].clientX - rect.left) * scaleX,
            y: (e.touches[0].clientY - rect.top) * scaleY
        };
    }
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

function iniciar(e) {
    e.preventDefault();
    dibujando = true;
    const { x, y } = getCoordenadas(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function dibujar(e) {
    if (!dibujando) return;
    e.preventDefault();
    const { x, y } = getCoordenadas(e);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#141414';
    ctx.lineTo(x, y);
    ctx.stroke();
}

function terminar(e) {
    if (!dibujando) return;
    dibujando = false;
    // Guarda la firma como base64 en el campo oculto
    firmaInput.value = canvas.toDataURL('image/png');
}

// Mouse
canvas.addEventListener('mousedown', iniciar);
canvas.addEventListener('mousemove', dibujar);
canvas.addEventListener('mouseup', terminar);
canvas.addEventListener('mouseleave', terminar);

// Touch (móvil)
canvas.addEventListener('touchstart', iniciar, { passive: false });
canvas.addEventListener('touchmove', dibujar, { passive: false });
canvas.addEventListener('touchend', terminar);

// Limpiar
limpiarBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    firmaInput.value = '';
});