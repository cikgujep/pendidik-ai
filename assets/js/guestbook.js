/* Pendidik AI - Guestbook Logic (2026) */

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwntdf3Dl2cFrHyWKfm8aDxqqCcguZk5z0ABjP0wxepaYxy3tk3OnaESFkXOFH3DiiFTQ/exec';
let allMessages = [];
let currentPage = 0;
const perPage = 6;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guestbook-form');
    if (form) {
        form.addEventListener('submit', handleGuestbookSubmit);
    }
    
    if (document.getElementById('messages-container')) {
        loadMessages();
    }
});

async function handleGuestbookSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('status-message');
    const btnText = document.getElementById('btn-text');

    if (!btn || !status || !btnText) return;

    btn.disabled = true;
    btnText.innerText = 'Menghantar...';

    const data = new FormData(e.target);
    const params = new URLSearchParams();
    for (const pair of data.entries()) { params.append(pair[0], pair[1]); }

    try {
        // Post to Google Apps Script
        await fetch(WEB_APP_URL, { 
            method: 'POST', 
            mode: 'no-cors', 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
            body: params.toString() 
        });
        
        status.innerHTML = '<span class="text-green-600 font-bold flex items-center justify-center gap-2"><i data-lucide="check-circle" class="w-4 h-4"></i> Berjaya dihantar! Terima kasih.</span>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
        
        e.target.reset();
        
        setTimeout(() => {
            loadMessages();
            status.innerHTML = '';
            btn.disabled = false;
            btnText.innerText = 'Hantar Ucapan';
        }, 2000);
    } catch (err) {
        status.innerHTML = '<span class="text-red-500">Ralat sambungan. Sila cuba lagi.</span>';
        btn.disabled = false;
        btnText.innerText = 'Hantar Ucapan';
    }
}

async function loadMessages() {
    const loading = document.getElementById('loading');
    if (!loading) return;

    try {
        const res = await fetch(WEB_APP_URL + '?action=get');
        const json = await res.json();
        if (json.success) {
            allMessages = json.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            renderPage(0);
            loading.style.display = 'none';
            
            const pagination = document.getElementById('pagination-controls');
            if (pagination) {
                pagination.classList.remove('hidden');
                pagination.classList.add('flex');
            }
        }
    } catch (err) {
        loading.innerHTML = '<span class="text-red-500">Gagal memuat turun data.</span>';
    }
}

function renderPage(page) {
    currentPage = page;
    const start = page * perPage;
    const end = start + perPage;
    const slice = allMessages.slice(start, end);
    const container = document.getElementById('messages-container');

    if (!container) return;
    container.innerHTML = '';

    if (slice.length === 0) {
        container.innerHTML = '<div class="p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-center text-slate-400 flex flex-col items-center"><i data-lucide="message-circle" class="w-8 h-8 mb-2 text-slate-300"></i>Jadilah yang pertama menulis di sini!</div>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
        return;
    }

    slice.forEach((msg, idx) => {
        const date = new Date(msg.timestamp).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' });
        const initial = msg.nama.charAt(0).toUpperCase();
        
        // Dynamic colors for avatars
        const colors = [
            'bg-indigo-50 text-indigo-600 border-indigo-100',
            'bg-teal-50 text-teal-600 border-teal-100',
            'bg-orange-50 text-orange-600 border-orange-100',
            'bg-pink-50 text-pink-600 border-pink-100'
        ];
        const colorClass = colors[idx % colors.length];

        const div = document.createElement('div');
        div.className = 'testimonial-card flex flex-col h-full';
        div.innerHTML = `
            <i data-lucide="quote" class="testimonial-quote w-8 h-8"></i>
            <div class="flex items-center gap-3 mb-4">
                <div class="avatar-sphere ${colorClass} border">${initial}</div>
                <div>
                    <h4 class="font-bold text-slate-900 text-sm leading-none">${msg.nama}</h4>
                    <p class="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">${msg.dari}</p>
                </div>
            </div>
            <div class="flex-grow">
                <p class="text-slate-600 text-sm leading-relaxed italic">"${msg.ucapan}"</p>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                <span class="text-[10px] text-slate-400 font-bold">${date}</span>
                <div class="flex gap-0.5">
                    <i data-lucide="star" class="w-2.5 h-2.5 text-orange-400 fill-orange-400"></i>
                    <i data-lucide="star" class="w-2.5 h-2.5 text-orange-400 fill-orange-400"></i>
                    <i data-lucide="star" class="w-2.5 h-2.5 text-orange-400 fill-orange-400"></i>
                    <i data-lucide="star" class="w-2.5 h-2.5 text-orange-400 fill-orange-400"></i>
                    <i data-lucide="star" class="w-2.5 h-2.5 text-orange-400 fill-orange-400"></i>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
    
    if (typeof lucide !== 'undefined') lucide.createIcons();


    // Pagination Update
    const totalPages = Math.ceil(allMessages.length / perPage);
    const pageInfo = document.getElementById('page-info');
    const prevBtn = document.getElementById('prev-btn-guestbook');
    const nextBtn = document.getElementById('next-btn-guestbook');

    if (pageInfo) pageInfo.innerText = `${currentPage + 1} / ${totalPages}`;
    if (prevBtn) {
        prevBtn.disabled = currentPage === 0;
        prevBtn.onclick = () => renderPage(currentPage - 1);
    }
    if (nextBtn) {
        nextBtn.disabled = currentPage >= totalPages - 1;
        nextBtn.onclick = () => renderPage(currentPage + 1);
    }
}
