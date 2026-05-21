// ===== CONFIGURAZIONE =====
const SUPABASE_URL = 'https://nryMp4gt6YgNysZVN8rgnw.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_nryMp4gt6YgNysZVN8rgnw_t68dnmPT';
// ==========================

function populateHours() {
    const select = document.getElementById('ora');
    for (let h = 9; h <= 19; h++) {
        if (h === 13) continue;
        const hourStr = h.toString().padStart(2, '0');
        select.innerHTML += `<option value="${hourStr}:00">${hourStr}:00</option>`;
        if (h !== 19) select.innerHTML += `<option value="${hourStr}:30">${hourStr}:30</option>`;
    }
}
populateHours();

document.getElementById('prenotazioneForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefono = document.getElementById('telefono').value;
    const servizio = document.getElementById('servizio').value;
    const data = document.getElementById('data').value;
    const ora = document.getElementById('ora').value;
    const data_ora = new Date(`${data}T${ora}:00`).toISOString();

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/parrucchiere/appuntamenti`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ nome, telefono, servizio, data_ora, stato: 'in_attesa' })
        });
        if (response.ok) {
            document.getElementById('messaggio').innerHTML = '<p style="color:green">✅ Richiesta inviata! Riceverai conferma a breve su WhatsApp.</p>';
            document.getElementById('prenotazioneForm').reset();
        } else {
            const err = await response.json();
            document.getElementById('messaggio').innerHTML = '<p style="color:red">❌ Errore: ' + (err.message || 'riprova') + '</p>';
        }
    } catch (error) {
        document.getElementById('messaggio').innerHTML = '<p style="color:red">❌ Errore di connessione.</p>';
    }
});