/**
 * Aesthetic OS - Core Application Logic
 * 单页应用 (SPA) 控制器
 */
class AestheticOS {
  constructor() {
    // 绑定 DOM 元素
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
    // 使用事件委托监听桌面图标点击
    document.getElementById('view-desktop').addEventListener('click', (e) => {
      const iconWrapper = e.target.closest('.app-icon-wrapper');
      if (iconWrapper) {
        const appId = iconWrapper.getAttribute('data-app');
        const nameEl = iconWrapper.querySelector('.app-name');
        // Dock 栏的图标没有 .app-name，使用 fallback 处理
        const appName = nameEl ? nameEl.textContent : this.getDockAppName(appId);
        this.openApp(appId, appName);
      }
    });

    // 返回桌面事件
    this.btnHome.addEventListener('click', () => {
      this.closeApp();
    });
  }

  getDockAppName(id) {
    const map = { phone: '电话', sms: '短信', wechat: '微信', settings: '设置' };
    return map[id] || 'App';
  }

  // 路由挂载逻辑：打开应用
  openApp(id, name) {
    if (!id) return;
    
    this.appTitle.textContent = name;
    
    // 【开发扩展点】在这里写入对应模块的 HTML 和业务逻辑
    // 后续开发只需完善不同 id 下的 HTML 模板即可
    let template = '';
    
    if (id === 'wechat') {
      template = `
        <div style="text-align: center; margin-top: 50px;">
          <h3 style="margin-bottom: 10px;">微信聊天模块加载完成</h3>
          <p style="color: #777; font-size: 14px;">这里可注入独立的数据层逻辑和消息列表。</p>
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
          <p>${name} 模块建设中...</p>
        </div>
      `;
    }
    
    this.appContent.innerHTML = template;

    // 触发 CSS 过渡动画
    this.viewDesktop.classList.add('hidden');
    this.viewApp.classList.remove('hidden');
  }

  // 卸载逻辑：返回桌面
  closeApp() {
    this.viewApp.classList.add('hidden');
    this.viewDesktop.classList.remove('hidden');
    
    // 延迟清空内容以避免动画过程中的闪烁
    setTimeout(() => {
      this.appContent.innerHTML = '';
      this.appTitle.textContent = '';
    }, 400);
  }
}

// 初始化系统实例
document.addEventListener('DOMContentLoaded', () => {
  new AestheticOS();
});
