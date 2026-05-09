/**
 * Pendidik AI - Modular Navigation Component (2026)
 * Memusatkan pengurusan menu untuk memudahkan kemaskini site-wide.
 * 
 * Update 09/05/2026: Ditambah sistem Auto-Clear Cache untuk memastikan
 * pengguna mendapat versi terbaru secara automatik.
 */

(function() {
    // KEMASKINI VERSI INI BILA ADA PERUBAHAN BESAR PADA SITE
    // Ubah nilai ini setiap kali anda kemas kini site untuk force clear cache user
    const APP_VERSION = '2026.05.09.01'; 
    const savedVersion = localStorage.getItem('pendidik_ai_version');

    if (savedVersion !== APP_VERSION) {
        // Bersihkan storan lama
        localStorage.clear();
        sessionStorage.clear();
        
        // Simpan versi baru
        localStorage.setItem('pendidik_ai_version', APP_VERSION);
        
        console.log(`%c [Pendidik AI] System updated to v${APP_VERSION}. Cache cleared.`, 'background: #16a34a; color: white; padding: 2px 5px; border-radius: 3px;');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (!navPlaceholder) return;

    // Detect Current Page for active highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get Theme Options from Placeholder
    const theme = navPlaceholder.getAttribute('data-theme') || 'light'; // 'light' or 'dark'
    const accent = navPlaceholder.getAttribute('data-accent') || 'brand'; // 'brand', 'accent', 'gem', 'magic', 'teal'

    // Define Colors based on accent
    const accentColor = {
        'brand': 'brand-600',
        'accent': 'accent-600',
        'gem': 'gem-400',
        'magic': 'magic-400',
        'teal': 'teal-600'
    }[accent] || 'brand-600';

    const bgAccent = theme === 'light' ? 'bg-slate-50' : 'bg-slate-900';
    const textAccent = theme === 'light' ? `text-${accentColor}` : `text-${accentColor}`;
    const textBase = theme === 'light' ? 'text-slate-600' : 'text-slate-400';
    const textHover = theme === 'light' ? `hover:text-${accentColor}` : `hover:text-white`;

    // Helper to check active status
    const isActive = (path) => currentPath === path;
    const activeClass = (path) => isActive(path) 
        ? `font-bold ${textAccent} ${bgAccent}` 
        : `font-medium ${textBase} ${textHover}`;

    // Navigation HTML Template
    const navHTML = `
    <!-- Main Navigation Bar -->
    <nav class="fixed top-0 w-full z-50 ${theme === 'light' ? 'bg-white/80 border-slate-100' : 'bg-slate-950/80 border-slate-800'} backdrop-blur-lg border-b">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <!-- Logo -->
            <a href="index.html" class="flex items-center gap-2 group">
                <div class="w-10 h-10 ${accent === 'gem' ? 'bg-gem-600' : (accent === 'teal' ? 'bg-teal-600' : 'bg-brand-600')} rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105">
                    <i class="fas ${accent === 'gem' ? 'fa-gem' : (accent === 'magic' ? 'fa-wand-sparkles' : 'fa-sparkles')}"></i>
                </div>
                <div class="flex flex-col">
                    <span class="font-display font-bold text-lg ${theme === 'light' ? 'text-slate-800' : 'text-white'} leading-tight">
                        Pendidik<span class="${textAccent}"> AI</span>
                    </span>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Edisi 2026</span>
                </div>
            </a>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-1 ${theme === 'light' ? 'bg-slate-50/50 border-slate-100' : 'bg-slate-900/50 border-slate-800'} p-1 rounded-full border">
                <a href="index.html" class="px-5 py-2 text-sm ${activeClass('index.html')} rounded-full transition-all">Utama</a>
                
                <!-- Dropdown Kuasai AI -->
                <div class="relative group">
                    <button class="px-5 py-2 text-sm font-semibold ${textBase} ${textHover} rounded-full transition-all flex items-center gap-1">
                        Kuasai AI <i class="fas fa-chevron-down text-[10px] transition-transform group-hover:rotate-180"></i>
                    </button>
                    <div class="absolute top-full left-0 mt-2 w-48 ${theme === 'light' ? 'bg-white border-slate-100' : 'bg-slate-900 border-slate-800'} rounded-2xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 transform origin-top scale-95 group-hover:scale-100">
                        <a href="generatif_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('generatif_ai.html')} rounded-xl transition-colors">Generatif</a>
                        <a href="visual_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('visual_ai.html')} rounded-xl transition-colors">Visual</a>
                        <a href="audio_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('audio_ai.html')} rounded-xl transition-colors">Audio</a>
                        <a href="video_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('video_ai.html')} rounded-xl transition-colors">Video</a>
                    </div>
                </div>

                <!-- Dropdown Explorasi AI -->
                <div class="relative group">
                    <button class="px-5 py-2 text-sm font-semibold ${textBase} ${textHover} rounded-full transition-all flex items-center gap-1">
                        Explorasi AI <i class="fas fa-chevron-down text-[10px] transition-transform group-hover:rotate-180"></i>
                    </button>
                    <div class="absolute top-full left-0 mt-2 w-52 ${theme === 'light' ? 'bg-white border-slate-100' : 'bg-slate-900 border-slate-800'} rounded-2xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 transform origin-top scale-95 group-hover:scale-100">
                        <a href="explorasi_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_ai.html')} rounded-xl transition-colors">Laman Hub</a>
                        <a href="explorasi_imej.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_imej.html')} rounded-xl transition-colors">Explorasi Imej</a>
                        <a href="explorasi_notebook.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_notebook.html')} rounded-xl transition-colors">NotebookLM</a>
                        <a href="explorasi_canvas.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_canvas.html')} rounded-xl transition-colors">Gemini Canvas</a>
                        <a href="explorasi_minit.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_minit.html')} rounded-xl transition-colors">Minit AI</a>
                        <a href="explorasi_gems.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_gems.html')} rounded-xl transition-colors">Gemini Gems</a>
                        <a href="explorasi_laman.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_laman.html')} rounded-xl transition-colors">Laman Pembelajaran</a>
                        <a href="explorasi_storybook.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_storybook.html')} rounded-xl transition-colors">Buku Cerita AI</a>
                        <a href="explorasi_mindmap.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_mindmap.html')} rounded-xl transition-colors">Peta Minda</a>
                        <a href="juara_lagu.html" class="block px-4 py-2.5 text-sm ${activeClass('juara_lagu.html')} rounded-xl transition-colors">Juara Lagu (Suno)</a>
                    </div>
                </div>

                <!-- Dropdown AI Junior -->
                <div class="relative group">
                    <button class="px-5 py-2 text-sm font-semibold ${textBase} ${textHover} rounded-full transition-all flex items-center gap-1 group">
                        AI Junior <i class="fas fa-chevron-down text-[10px] transition-transform group-hover:rotate-180"></i>
                    </button>
                    <div class="absolute top-full right-0 md:left-0 mt-2 w-48 ${theme === 'light' ? 'bg-white border-slate-100' : 'bg-slate-900 border-slate-800'} rounded-2xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 transform origin-top scale-95 group-hover:scale-100">
                        <a href="ai_junior.html" class="block px-4 py-2.5 text-sm ${activeClass('ai_junior.html')} rounded-xl transition-colors">Hub Junior</a>
                        <a href="ai_junior_autodraw.html" class="block px-4 py-2.5 text-sm ${activeClass('ai_junior_autodraw.html')} rounded-xl transition-colors">AutoDraw</a>
                        <a href="ai_junior_citacita.html" class="block px-4 py-2.5 text-sm ${activeClass('ai_junior_citacita.html')} rounded-xl transition-colors">Cita-cita</a>
                        <a href="ai_junior_game.html" class="block px-4 py-2.5 text-sm ${activeClass('ai_junior_game.html')} rounded-xl transition-colors">Bina Game AI</a>
                    </div>
                </div>

                <a href="index.html#guestbook" class="px-5 py-2 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-full shadow-md transition-all ml-2">Pelawat</a>
            </div>

            <!-- Mobile Menu Button -->
            <button onclick="toggleMobileMenu()" class="md:hidden p-2 ${textBase} ${textHover} transition-colors">
                <i class="fas fa-bars fa-lg"></i>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu Drawer -->
    <div id="mobile-menu" class="fixed inset-0 z-[100] translate-x-full transition-transform duration-300 ease-in-out md:hidden">
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onclick="toggleMobileMenu()"></div>
        <div class="absolute right-0 top-0 bottom-0 w-80 ${theme === 'light' ? 'bg-white' : 'bg-slate-950'} shadow-2xl p-6 flex flex-col overflow-y-auto ${theme === 'dark' ? 'border-l border-slate-800' : ''}">
            <div class="flex justify-between items-center mb-8">
                <span class="font-display font-bold text-xl ${theme === 'light' ? 'text-slate-800' : 'text-white'}">Menu <span class="${textAccent}">Utama</span></span>
                <button onclick="toggleMobileMenu()" class="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <i class="fas fa-times fa-lg"></i>
                </button>
            </div>
            
            <div class="space-y-4">
                <a href="index.html" class="block px-4 py-3 ${activeClass('index.html')} font-semibold rounded-xl transition-all">Utama</a>
                
                <div class="border-t ${theme === 'light' ? 'border-slate-100' : 'border-slate-800'} my-4 pt-4">
                    <span class="px-4 text-[10px] font-bold ${textAccent} uppercase tracking-widest">Kuasai AI</span>
                    <div class="mt-2 space-y-1">
                        <a href="generatif_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('generatif_ai.html')} rounded-xl transition-colors">Generatif</a>
                        <a href="visual_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('visual_ai.html')} rounded-xl transition-colors">Visual</a>
                        <a href="audio_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('audio_ai.html')} rounded-xl transition-colors">Audio</a>
                        <a href="video_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('video_ai.html')} rounded-xl transition-colors">Video</a>
                    </div>
                </div>

                <div class="border-t ${theme === 'light' ? 'border-slate-100' : 'border-slate-800'} my-4 pt-4">
                    <span class="px-4 text-[10px] font-bold ${textAccent} uppercase tracking-widest">Explorasi AI</span>
                    <div class="mt-2 space-y-1">
                        <a href="explorasi_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_ai.html')} rounded-xl transition-colors">Laman Hub</a>
                        <a href="explorasi_imej.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_imej.html')} rounded-xl transition-colors">Explorasi Imej</a>
                        <a href="explorasi_notebook.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_notebook.html')} rounded-xl transition-colors">NotebookLM</a>
                        <a href="explorasi_canvas.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_canvas.html')} rounded-xl transition-colors">Gemini Canvas</a>
                        <a href="explorasi_minit.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_minit.html')} rounded-xl transition-colors">Minit AI</a>
                        <a href="explorasi_gems.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_gems.html')} rounded-xl transition-colors">Gemini Gems</a>
                        <a href="explorasi_laman.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_laman.html')} rounded-xl transition-colors">Laman Pembelajaran</a>
                        <a href="explorasi_storybook.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_storybook.html')} rounded-xl transition-colors">Buku Cerita AI</a>
                        <a href="explorasi_mindmap.html" class="block px-4 py-2.5 text-sm ${activeClass('explorasi_mindmap.html')} rounded-xl transition-colors">Peta Minda</a>
                        <a href="juara_lagu.html" class="block px-4 py-2.5 text-sm ${activeClass('juara_lagu.html')} rounded-xl transition-colors">Juara Lagu (Suno)</a>
                    </div>
                </div>

                <div class="border-t ${theme === 'light' ? 'border-slate-100' : 'border-slate-800'} my-4 pt-4">
                    <span class="px-4 text-[10px] font-bold text-teal-600 uppercase tracking-widest">AI Junior</span>
                    <div class="mt-2 space-y-1">
                        <a href="ai_junior.html" class="block px-4 py-2.5 text-sm ${activeClass('ai_junior.html')} rounded-xl transition-colors">Hub Junior</a>
                        <a href="ai_junior_autodraw.html" class="block px-4 py-2.5 text-sm ${activeClass('ai_junior_autodraw.html')} rounded-xl transition-colors">AutoDraw</a>
                        <a href="ai_junior_citacita.html" class="block px-4 py-2.5 text-sm ${activeClass('ai_junior_citacita.html')} rounded-xl transition-colors">Cita-cita</a>
                        <a href="ai_junior_game.html" class="block px-4 py-2.5 text-sm ${activeClass('ai_junior_game.html')} rounded-xl transition-colors">Bina Game AI</a>
                    </div>
                </div>

                <div class="pt-6">
                    <a href="index.html#guestbook" class="block w-full text-center px-6 py-4 bg-brand-600 text-white font-bold rounded-2xl shadow-lg transition-all">Buku Pelawat</a>
                </div>
            </div>
        </div>
    </div>
    `;

    navPlaceholder.innerHTML = navHTML;
});

/**
 * Mobile Menu Toggle Logic
 */
window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    
    if (menu.classList.contains('translate-x-full')) {
        menu.classList.remove('translate-x-full');
    } else {
        menu.classList.add('translate-x-full');
    }
}
