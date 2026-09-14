export const globalRules = '必须符合角色设定与世界观；优先参考长期记忆和近期聊天；不得制造重大剧情；不同 App 之间保持人物、地点、时间和行为一致；只返回合法 JSON，不要 Markdown。';
export function parseAiJson(raw) { try { const clean = raw.trim().replace(/^```(?:json)?|```$/g, ''); const data = JSON.parse(clean); if (!Array.isArray(data.items)) throw Error('items 缺失'); return data; } catch { throw Error('AI 返回的内容不是有效 JSON，旧数据没有被修改。'); } }
export async function requestAi({ context, prompt, app }) {
  // API adapter seam: replace this deterministic demo response with the configured provider request.
  await new Promise((resolve) => setTimeout(resolve, 520));
  const hour = new Date().getHours().toString().padStart(2, '0');
  return { items: [{ title: `${app.name} · 今日记录`, desc: '一段与当前角色状态相符的日常记录。', time: `${hour}:12`, detail: `${context}\n\n生成说明：${prompt.slice(0, 72)}` }] };
}
