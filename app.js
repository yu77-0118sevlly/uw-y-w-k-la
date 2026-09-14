/**
 * Aesthetic OS - Core Application Logic
 */
class AestheticOS {
  constructor() {
    this.viewDesktop = document.getElementById('view-desktop');
    this.viewApp = document.getElementById('view-app');
    this.appContent = document.getElementById('app-content');
    this.appTitle = document.getElementById('app-title');
    this.btnHome = document.getElementById('btn-home');
    this.clockElements = document.querySelectorAll('.time-large');
    
    this.init();
  }

  init() {
    this.startClock();
    this.bindEvents();
  }

  startClock() {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      this.clockElements.forEach(el => el.textContent = `${h}:${m}`);
    };
    setInterval(updateTime, 1000);
    updateTime();
  }

  bindEvents() {
    document.getElementById('view-desktop').addEventListener('click', (e) => {
      const iconWrapper = e.target.closest('.app-icon-wrapper');
      if (iconWrapper) {
        const appId = iconWrapper.getAttribute('data-app');
        const nameEl = iconWrapper.querySelector('.app-name');
        const appName = nameEl ? nameEl.textContent : this.getDockAppName(appId);
        this.openApp(appId, appName);
      }
    });

    this.btnHome.addEventListener('click', () => {
      this.closeApp();
    });
  }

  getDockAppName(id) {
    const map = { phone: '电话', sms: '短信', wechat: '微信', settings: '设置' };
    return map[id] || 'App';
  }

  openApp(id, name) {
    if (!id) return;
    this.appTitle.textContent = name;
    
    let template = '';
    if (id === 'wechat') {
      template = `
        <div style="text-align: center; margin-top: 50px;">
          <h3 style="margin-bottom: 10px;">微信聊天模块</h3>
          <p style="color: #777; font-size: 14px;">后续数据结构与逻辑编写区。</p>
        </div>
      `;
    } else if (id === 'worldbook') {
      template = `
        <div style="padding: 10px;">
          <h3>世界书编辑器</h3>
          <p style="color: #777; font-size: 14px; margin-top:10px;">支持角色与设定管理。</p>
        </div>
      `;
    } else {
      template = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; color: #888;">
          <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: currentColor; margin-bottom: 16px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          <p>${name} 模块加载中...</p>
        </div>
      `;
    }
    
    this.appContent.innerHTML = template;
    this.viewDesktop.classList.add('hidden');
    this.viewApp.classList.remove('hidden');
  }

  closeApp() {
    this.viewApp.classList.add('hidden');
    this.viewDesktop.classList.remove('hidden');
    
    setTimeout(() => {
      this.appContent.innerHTML = '';
      this.appTitle.textContent = '';
    }, 400);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AestheticOS();
});
