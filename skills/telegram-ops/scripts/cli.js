#!/usr/bin/env node

/**
 * Telegram Operations CLI
 * Usage: telegram-ops <command> [options]
 */

import { createClient, TelegramClient } from './telegram.js'
import { productLaunch, changelog, announcement } from './templates.js'

interface CLIOptions {
  command: string
  subcommand?: string
  channel?: string
  text?: string
  url?: string
  caption?: string
  format?: string
  time?: string
  tz?: string
  id?: string
  messageId?: number
  channels?: string
  name?: string
  version?: string
  tagline?: string
  description?: string
  features?: string
  install?: string
  links?: string
  hashtags?: string
  changes?: string
  title?: string
  body?: string
  cta?: string
  noPreview?: boolean
  limit?: number
}

function parseArgs(args: string[]): CLIOptions {
  const options: CLIOptions = {
    command: args[2] || 'help'
  }

  for (let i = 3; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--')) {
      const key = arg.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      const value = args[i + 1]
      if (!value || value.startsWith('--')) {
        (options as Record<string, unknown>)[key] = true
      } else {
        (options as Record<string, unknown>)[key] = value
        i++
      }
    } else if (!options.subcommand) {
      options.subcommand = arg
    }
  }

  return options
}

function printUsage(): void {
  console.log(`
Telegram Operations CLI

Usage: telegram-ops <command> [subcommand] [options]

Commands:
  post         Post a message to a channel
  photo        Post a photo with caption
  video        Post a video with caption
  document     Post a document
  schedule     Schedule a message
  stats        Get channel statistics
  views        Get message views
  analytics    Get recent posts performance
  crosspost    Post to multiple channels
  template     Use a content template
  channel      Channel management
  bot          Bot management
  edit         Edit a message
  delete       Delete a message
  pin          Pin a message
  unpin        Unpin a message
  forward      Forward a message
  help         Show this help

Options:
  --channel    Channel username or ID (e.g., @TalocodeChannel)
  --text       Message text
  --url        Media URL
  --caption    Media caption
  --format     Parse mode (html, markdown)
  --time       Scheduled time (ISO format)
  --tz         Timezone
  --id         Message or schedule ID
  --message-id Message ID
  --channels   Comma-separated channels for crosspost
  --no-preview Disable link preview
  --limit      Number of results to return

Examples:
  telegram-ops post --channel @TalocodeChannel --text "Hello World"
  telegram-ops photo --channel @TalocodeChannel --url https://example.com/img.jpg --caption "Photo"
  telegram-ops schedule --channel @TalocodeChannel --text "Morning!" --time "2025-01-21 09:00"
  telegram-ops crosspost --channels "@TalocodeChannel,@TeraAIChannel" --text "Announcement"
  telegram-ops template --type product-launch --name "MyApp" --version "1.0.0"
`)
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv)

  if (options.command === 'help' || options.command === '--help') {
    printUsage()
    return
  }

  try {
    const client = createClient()

    switch (options.command) {
      case 'post': {
        if (!options.channel || !options.text) {
          console.error('Error: --channel and --text are required')
          process.exit(1)
        }
        const result = await client.sendMessage({
          chatId: options.channel,
          text: options.text,
          parseMode: (options.format as 'HTML' | 'MarkdownV2' | 'Markdown') || 'HTML',
          disableWebPagePreview: options.noPreview === true
        })
        console.log(JSON.stringify(result, null, 2))
        break
      }

      case 'photo': {
        if (!options.channel || !options.url) {
          console.error('Error: --channel and --url are required')
          process.exit(1)
        }
        const result = await client.sendPhoto({
          chatId: options.channel,
          photo: options.url,
          caption: options.caption
        })
        console.log(JSON.stringify(result, null, 2))
        break
      }

      case 'video': {
        if (!options.channel || !options.url) {
          console.error('Error: --channel and --url are required')
          process.exit(1)
        }
        const result = await client.sendVideo({
          chatId: options.channel,
          video: options.url,
          caption: options.caption
        })
        console.log(JSON.stringify(result, null, 2))
        break
      }

      case 'document': {
        if (!options.channel || !options.url) {
          console.error('Error: --channel and --url are required')
          process.exit(1)
        }
        const result = await client.sendDocument({
          chatId: options.channel,
          document: options.url,
          caption: options.caption
        })
        console.log(JSON.stringify(result, null, 2))
        break
      }

      case 'schedule': {
        if (options.subcommand === 'list') {
          console.log('Scheduled posts: (stored in memory)')
          break
        }
        if (options.subcommand === 'cancel') {
          console.log(`Cancelled schedule: ${options.id}`)
          break
        }
        if (!options.channel || !options.text || !options.time) {
          console.error('Error: --channel, --text, and --time are required')
          process.exit(1)
        }
        const result = await client.scheduleMessage({
          chatId: options.channel,
          text: options.text,
          scheduledAt: options.time,
          timezone: options.tz
        })
        console.log(JSON.stringify(result, null, 2))
        break
      }

      case 'stats': {
        if (!options.channel) {
          console.error('Error: --channel is required')
          process.exit(1)
        }
        const stats = await client.getChat(options.channel)
        console.log(JSON.stringify(stats, null, 2))
        break
      }

      case 'views': {
        if (!options.channel || !options.messageId) {
          console.error('Error: --channel and --message-id are required')
          process.exit(1)
        }
        const views = await client.getMessageViews(options.channel, options.messageId)
        console.log(JSON.stringify(views, null, 2))
        break
      }

      case 'analytics': {
        if (!options.channel) {
          console.error('Error: --channel is required')
          process.exit(1)
        }
        const stats = await client.getChat(options.channel)
        console.log(JSON.stringify({ channel: stats, note: 'Detailed analytics requires webhook setup' }, null, 2))
        break
      }

      case 'crosspost': {
        if (!options.channels || !options.text) {
          console.error('Error: --channels and --text are required')
          process.exit(1)
        }
        const channelList = options.channels.split(',').map(c => c.trim())
        const results = await client.crossPost({
          channels: channelList,
          text: options.text,
          mediaUrl: options.url,
          caption: options.caption
        })
        console.log(JSON.stringify(results, null, 2))
        break
      }

      case 'template': {
        const type = options.subcommand || 'announcement'
        let output = ''

        if (type === 'product-launch') {
          output = productLaunch({
            name: options.name || 'Product',
            version: options.version || '1.0.0',
            tagline: options.tagline || 'New release',
            description: options.description || '',
            features: options.features?.split(',') || [],
            installCommands: options.install?.split(',') || [],
            links: [],
            hashtags: options.hashtags?.split(',') || []
          })
        } else if (type === 'changelog') {
          output = changelog({
            name: options.name || 'Product',
            version: options.version || '1.0.0',
            changes: options.changes?.split(',').map(c => ({ type: 'added' as const, description: c.trim() })) || []
          })
        } else {
          output = announcement({
            title: options.title || 'Announcement',
            body: options.body || '',
            cta: options.cta ? { text: 'Learn More', url: options.cta } : undefined
          })
        }

        console.log(output)
        break
      }

      case 'channel': {
        if (options.subcommand === 'info') {
          if (!options.channel) {
            console.error('Error: --channel is required')
            process.exit(1)
          }
          const info = await client.getChat(options.channel)
          console.log(JSON.stringify(info, null, 2))
        } else if (options.subcommand === 'list') {
          const botInfo = await client.getBotInfo()
          console.log(JSON.stringify({ bot: botInfo, note: 'List channels by sending a message to each' }, null, 2))
        } else {
          console.error('Unknown subcommand. Use: info, list')
        }
        break
      }

      case 'bot': {
        const info = await client.getBotInfo()
        console.log(JSON.stringify(info, null, 2))
        break
      }

      case 'edit': {
        if (!options.channel || !options.messageId || !options.text) {
          console.error('Error: --channel, --message-id, and --text are required')
          process.exit(1)
        }
        const result = await client.editMessage({
          chatId: options.channel,
          messageId: options.messageId,
          text: options.text,
          parseMode: options.format
        })
        console.log(JSON.stringify(result, null, 2))
        break
      }

      case 'delete': {
        if (!options.channel || !options.messageId) {
          console.error('Error: --channel and --message-id are required')
          process.exit(1)
        }
        await client.deleteMessage({
          chatId: options.channel,
          messageId: options.messageId
        })
        console.log(JSON.stringify({ deleted: true }, null, 2))
        break
      }

      case 'pin': {
        if (!options.channel || !options.messageId) {
          console.error('Error: --channel and --message-id are required')
          process.exit(1)
        }
        await client.pinMessage({
          chatId: options.channel,
          messageId: options.messageId
        })
        console.log(JSON.stringify({ pinned: true }, null, 2))
        break
      }

      case 'unpin': {
        if (!options.channel || !options.messageId) {
          console.error('Error: --channel and --message-id are required')
          process.exit(1)
        }
        await client.unpinMessage({
          chatId: options.channel,
          messageId: options.messageId
        })
        console.log(JSON.stringify({ unpinned: true }, null, 2))
        break
      }

      case 'forward': {
        if (!options.channel || !options.messageId) {
          console.error('Error: --channel and --message-id are required')
          process.exit(1)
        }
        const result = await client.forwardMessage({
          fromChatId: options.channel,
          toChatId: options.channels?.split(',')[0] || options.channel,
          messageId: options.messageId
        })
        console.log(JSON.stringify(result, null, 2))
        break
      }

      default:
        console.error(`Unknown command: ${options.command}`)
        printUsage()
        process.exit(1)
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

main()
