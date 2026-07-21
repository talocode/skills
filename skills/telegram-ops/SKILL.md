---
name: telegram-ops
description: Telegram channel and bot operations — post, schedule, analyze, and manage content across channels. Use when asked to "post to Telegram", "schedule a message", "get channel stats", or "manage Telegram channels".
metadata:
  author: talocode
  version: "1.0.0"
  argument-hint: <command> [options]
---

# Telegram Operations Skill

Comprehensive Telegram channel and bot management for agents.

## Configuration

### Required Environment Variables

```bash
# Primary bot token (used for all operations)
TELEGRAM_BOT_TOKEN=your_bot_token

# Optional: Multiple bot tokens for different channels
TELEGRAM_BOT_TOKEN_2=secondary_bot_token
```

### Optional Environment Variables

```bash
# Default channel (used when no channel specified)
TELEGRAM_DEFAULT_CHANNEL=@your_channel

# Schedule timezone (default: UTC)
TELEGRAM_TIMEZONE=America/New_York

# Webhook URL for real-time updates
TELEGRAM_WEBHOOK_URL=https://your-domain.com/webhook
```

### Using User's Configuration

If the user has existing tokens in `.env`, the skill will auto-detect:
- `TELEGRAM_BOT_TOKEN` — Primary bot
- `TERAAI_BOT_TOKEN` — TeraAI bot
- `TERAAI_CHANNEL_ID` — TeraAI channel
- `TALOCODE_CHANNEL_ID` — Talocode channel

## Commands

### Post Message

```bash
# Basic post
npx skills run telegram-ops post --channel @TalocodeChannel --text "Hello World"

# Post with HTML formatting
npx skills run telegram-ops post --channel @TalocodeChannel --text "<b>Bold</b> and <i>italic</i>" --format html

# Post with preview disabled
npx skills run telegram-ops post --channel @TalocodeChannel --text "Check this out" --no-preview
```

### Post Media

```bash
# Post photo with caption
npx skills run telegram-ops photo --channel @TalocodeChannel --url https://example.com/image.jpg --caption "Image description"

# Post video
npx skills run telegram-ops video --channel @TalocodeChannel --url https://example.com/video.mp4 --caption "Video description"

# Post document
npx skills run telegram-ops document --channel @TalocodeChannel --url https://example.com/file.pdf --caption "PDF file"
```

### Schedule Posts

```bash
# Schedule for specific time
npx skills run telegram-ops schedule --channel @TalocodeChannel --text "Good morning!" --time "2025-01-21 09:00"

# Schedule with timezone
npx skills run telegram-ops schedule --channel @TalocodeChannel --text "Event starting" --time "2025-01-21 14:00" --tz "America/New_York"

# List scheduled posts
npx skills run telegram-ops schedule list

# Cancel scheduled post
npx skills run telegram-ops schedule cancel --id sched_123
```

### Analytics

```bash
# Get channel stats
npx skills run telegram-ops stats --channel @TalocodeChannel

# Get post views
npx skills run telegram-ops views --channel @TalocodeChannel --message-id 123

# Get recent posts performance
npx skills run telegram-ops analytics --channel @TalocodeChannel --limit 10
```

### Cross-Channel Posting

```bash
# Post to multiple channels
npx skills run telegram-ops crosspost --channels @TalocodeChannel,@TeraAIChannel --text "Announcement"

# Cross-post with media
npx skills run telegram-ops crosspost --channels @TalocodeChannel,@TeraAIChannel --url https://example.com/image.jpg --caption "Shared image"
```

### Content Templates

```bash
# Use product launch template
npx skills run telegram-ops template --type product-launch --name "DocuLane" --version "0.1.0" --description "Office document CLI"

# Use changelog template
npx skills run telegram-ops template --type changelog --version "0.1.0" --changes "Added Excel support, Fixed Word parsing"

# Use announcement template
npx skills run telegram-ops template --type announcement --title "New Feature" --body "We just launched..."
```

### Channel Management

```bash
# Get channel info
npx skills run telegram-ops channel info --channel @TalocodeChannel

# Get bot info
npx skills run telegram-ops bot info

# List channels bot has access to
npx skills run telegram-ops channels list

# Pin a message
npx skills run telegram-ops pin --channel @TalocodeChannel --message-id 123

# Unpin a message
npx skills run telegram-ops unpin --channel @TalocodeChannel --message-id 123
```

### Message Management

```bash
# Edit a message
npx skills run telegram-ops edit --channel @TalocodeChannel --message-id 123 --text "Updated content"

# Delete a message
npx skills run telegram-ops delete --channel @TalocodeChannel --message-id 123

# Forward a message
npx skills run telegram-ops forward --from @SourceChannel --to @DestChannel --message-id 456
```

## API Reference

### Core Functions

```typescript
import { TelegramClient } from './scripts/telegram.js'

const bot = new TelegramClient({
  token: process.env.TELEGRAM_BOT_TOKEN,
  defaultChannel: '@TalocodeChannel'
})

// Send message
await bot.sendMessage({
  chatId: '@TalocodeChannel',
  text: 'Hello World',
  parseMode: 'HTML'
})

// Send media
await bot.sendPhoto({
  chatId: '@TalocodeChannel',
  photo: 'https://example.com/image.jpg',
  caption: 'Image description'
})

// Get channel stats
const stats = await bot.getChannelStats('@TalocodeChannel')

// Schedule message
await bot.scheduleMessage({
  chatId: '@TalocodeChannel',
  text: 'Scheduled post',
  scheduledAt: new Date('2025-01-21T09:00:00Z')
})
```

## Templates

### Product Launch Template

```markdown
🚀 {name} v{version} — {tagline}

{description}

✨ Features:
{features_list}

📦 Install:
{install_commands}

🔗 Links:
{links}

#{hashtags}
```

### Changelog Template

```markdown
📋 {name} v{version} — Changelog

{changes_list}

🔗 Full changelog: {changelog_url}
```

### Announcement Template

```markdown
📢 {title}

{body}

{cta}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| `UNAUTHORIZED` | Invalid bot token | Check `TELEGRAM_BOT_TOKEN` |
| `CHAT_NOT_FOUND` | Channel/group not found | Bot must be added to channel |
| `NOT_ENOUGH_RIGHTS` | Bot lacks permissions | Make bot admin with post rights |
| `MESSAGE_TOO_LONG` | Text exceeds 4096 chars | Split into multiple messages |
| `FLOOD_WAIT` | Rate limit hit | Wait specified seconds |

## Best Practices

1. **Always use parse_mode** — Specify `HTML` or `MarkdownV2` for formatted text
2. **Preview control** — Use `--no-preview` for links without preview
3. **Media captions** — Keep captions under 1024 characters
4. **Scheduling** — Use UTC or specify timezone explicitly
5. **Error handling** — Check for `FLOOD_WAIT` and retry after delay

## Examples

See `examples/` directory for:
- Product announcement workflow
- Scheduled posting setup
- Cross-channel content distribution
- Analytics dashboard queries
