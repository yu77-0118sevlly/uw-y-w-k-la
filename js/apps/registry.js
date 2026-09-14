const basePrompt = `根据提供的人物设定、记忆、聊天记录和其他 App 数据，生成本应用数据。符合角色设定，与其他 App 保持一致，可以补全普通日常细节，不得随意制造重大剧情。只返回 {"items":[{"title":"","desc":"","time":"","detail":""}]}`;
const app = (id, name, description, icon) => ({ id, name, description, icon, prompt: basePrompt, getCount: (data) => data?.items?.length || 0,
  renderList(data) { return (data.items || []).map((item, index) => `<button class="record" data-detail="${index}"><span><b>${item.title}</b><small>${item.desc}</small></span><time>${item.time}</time></button>`).join('') || '<div class="empty-state">还没有记录<br><small>点击刷新生成第一条数据</small></div>'; },
  renderDetail(data, index) { const item = data.items[index]; return `<article class="detail"><span class="eyebrow">${name.toUpperCase()}</span><h2>${item.title}</h2><time>${item.time}</time><p>${item.detail}</p></article>`; }
});
export const PHONE_APPS = { wechat: app('wechat', '微信', '聊天记录', 'chat'), gallery: app('gallery', '相册', '照片记录', 'gallery'), wallet: app('wallet', '钱包', '消费记录', 'wallet'), browser: app('browser', '浏览器', '浏览记录', 'browser'), notes: app('notes', '备忘录', '生活记录', 'note') };
