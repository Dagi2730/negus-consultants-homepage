    function toggleTheme() {
      const html = document.documentElement;
      const isDark = html.classList.toggle('dark');
      try {
        localStorage.setItem('negus_theme', isDark ? 'dark' : 'light');
      } catch (e) {}
    }

    // Check stored theme
    try {
      if (localStorage.getItem('negus_theme') === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } catch(e) {}

    function switchAuthTab(mode) {
      const pLogin = document.getElementById('auth-panel-login');
      const pReg = document.getElementById('auth-panel-register');
      const tIn = document.getElementById('tab-btn-signin');
      const tReg = document.getElementById('tab-btn-register');

      if (mode === 'login') {
        pLogin.style.display = 'block';
        pReg.style.display = 'none';
        tIn.classList.add('active');
        tIn.setAttribute('aria-selected', 'true');
        tReg.classList.remove('active');
        tReg.setAttribute('aria-selected', 'false');
      } else {
        pLogin.style.display = 'none';
        pReg.style.display = 'block';
        tIn.classList.remove('active');
        tIn.setAttribute('aria-selected', 'false');
        tReg.classList.add('active');
        tReg.setAttribute('aria-selected', 'true');
      }
      if (window.lucide) lucide.createIcons();
    }

    function handleSubmit(e, msg) {
      e.preventDefault();
      const alertBox = document.getElementById('portal-alert');
      alertBox.className = 'portal-status-alert success';
      alertBox.textContent = msg + ' Redirecting to homepage...';
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1200);
    }

    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide) lucide.createIcons();
    });
