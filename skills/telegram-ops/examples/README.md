# Examples

## Product Launch Announcement

```bash
# Using template
telegram-ops template --type product-launch \
  --name "DocuLane" \
  --version "0.1.0" \
  --tagline "Office Document CLI for AI Agents" \
  --description "Read, write, and edit Word, Excel, PowerPoint without Office installed." \
  --features "CLI for terminal users,TypeScript SDK,Python SDK,MCP server,Hosted API" \
  --install "npm i -g @talocode/doculane,pip install talocode-doculane" \
  --hashtags "DocuLane,AI,Agents,OpenSource"

# Direct post
telegram-ops post --channel @TalocodeChannel --text "🚀 DocuLane v0.1.0 released!"
```

## Scheduled Posting

```bash
# Schedule for tomorrow morning
telegram-ops schedule --channel @TalocodeChannel \
  --text "Good morning! Check out our latest release." \
  --time "2025-01-22 09:00" \
  --tz "America/New_York"

# Schedule with template
telegram-ops template --type announcement \
  --title "Weekly Update" \
  --body "Here's what we shipped this week..." | \
telegram-ops schedule --channel @TalocodeChannel --time "2025-01-24 17:00"
```

## Cross-Channel Posting

```bash
# Post to multiple channels
telegram-ops crosspost \
  --channels "@TalocodeChannel,@TeraAIChannel" \
  --text "📢 Major announcement across all channels!"

# Cross-post with media
telegram-ops crosspost \
  --channels "@TalocodeChannel,@TeraAIChannel" \
  --url https://example.com/demo.mp4 \
  --caption "Demo video of our latest feature"
```

## Media Posts

```bash
# Post screenshot
telegram-ops photo --channel @TalocodeChannel \
  --url https://example.com/screenshot.png \
  --caption "Look at this amazing UI!"

# Post demo video
telegram-ops video --channel @TalocodeChannel \
  --url https://example.com/demo.mp4 \
  --caption "60-second demo of DocuLane"

# Post PDF documentation
telegram-ops document --channel @TalocodeChannel \
  --url https://example.com/docs.pdf \
  --caption "Complete documentation"
```

## Analytics

```bash
# Get channel stats
telegram-ops stats --channel @TalocodeChannel

# Get views on specific message
telegram-ops views --channel @TalocodeChannel --message-id 123
```

## Message Management

```bash
# Edit a message
telegram-ops edit --channel @TalocodeChannel \
  --message-id 123 \
  --text "Updated content with correct info"

# Pin important announcement
telegram-ops pin --channel @TalocodeChannel --message-id 456

# Delete old message
telegram-ops delete --channel @TalocodeChannel --message-id 789
```

## Bot Information

```bash
# Get bot info
telegram-ops bot info

# Get channel info
telegram-ops channel info --channel @TalocodeChannel
```
