import { storage } from './phone_storage.js';
const roles = [{ id: 'role_001', name: '林澈', avatar: 'LC', persona: '独立摄影师，安静敏锐，喜欢记录城市微小瞬间。' }, { id: 'role_002', name: '陈晚', avatar: 'CW', persona: '建筑事务所设计师，理性、幽默，工作节奏紧凑。' }, { id: 'role_003', name: '苏遥', avatar: 'SY', persona: '旅行编辑，自由热情，持续收集陌生城市的故事。' }];
export const getRoles = () => roles;
export function buildPhoneRoleContext(contactId, currentAppId = '') {
  const role = roles.find((item) => item.id === contactId);
  const snapshots = Object.entries(storage.config().phoneData?.[contactId] || {}).filter(([id]) => id !== currentAppId).map(([id, data]) => `【${id} 已有数据】\n${JSON.stringify(data)}`).join('\n');
  return `【角色人设】\n${role?.persona || ''}\n【世界书】\n现代都市，真实日常。\n【长期记忆】\n角色重视关系与已发生事件。\n【近期聊天】\n暂无新的聊天摘要。\n【其他 App 已有数据】\n${snapshots || '暂无'}\n【当前设备时间】\n${new Date().toLocaleString('zh-CN')}`;
}
