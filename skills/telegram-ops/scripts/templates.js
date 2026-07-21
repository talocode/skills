/**
 * Content Templates for Telegram Posts
 */

export interface ProductLaunchTemplate {
  name: string
  version: string
  tagline: string
  description: string
  features: string[]
  installCommands: string[]
  links: { label: string; url: string }[]
  hashtags: string[]
}

export interface ChangelogTemplate {
  name: string
  version: string
  changes: { type: 'added' | 'fixed' | 'changed' | 'removed'; description: string }[]
  changelogUrl?: string
}

export interface AnnouncementTemplate {
  title: string
  body: string
  cta?: { text: string; url: string }
}

export function productLaunch(data: ProductLaunchTemplate): string {
  const featuresList = data.features.map(f => `• ${f}`).join('\n')
  const installList = data.installCommands.map(c => `\`${c}\``).join('\n')
  const linksList = data.links.map(l => `[${l.label}](${l.url})`).join('\n')
  const hashtags = data.hashtags.map(h => `#${h}`).join(' ')

  return `🚀 <b>${data.name} v${data.version}</b> — ${data.tagline}

${data.description}

✨ <b>Features:</b>
${featuresList}

📦 <b>Install:</b>
${installList}

🔗 <b>Links:</b>
${linksList}

${hashtags}`
}

export function changelog(data: ChangelogTemplate): string {
  const changesList = data.changes.map(c => {
    const emoji = c.type === 'added' ? '✨' : c.type === 'fixed' ? '🐛' : c.type === 'changed' ? '🔄' : '🗑️'
    return `${emoji} <b>${c.type.charAt(0).toUpperCase() + c.type.slice(1)}:</b> ${c.description}`
  }).join('\n')

  const link = data.changelogUrl ? `\n\n🔗 Full changelog: [${data.name} ${data.version}](${data.changelogUrl})` : ''

  return `📋 <b>${data.name} v${data.version} — Changelog</b>

${changesList}${link}`
}

export function announcement(data: AnnouncementTemplate): string {
  const cta = data.cta ? `\n\n👉 <a href="${data.cta.url}">${data.cta.text}</a>` : ''

  return `📢 <b>${data.title}</b>

${data.body}${cta}`
}

export function formatHTML(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/~~(.*?)~~/g, '<s>$1</s>')
}

export function escapeMarkdownV2(text: string): string {
  return text
    .replace(/_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/~/g, '\\~')
    .replace(/`/g, '\\`')
    .replace(/>/g, '\\>')
    .replace(/#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/-/g, '\\-')
    .replace(/=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\./g, '\\.')
    .replace(/!/g, '\\!')
}
