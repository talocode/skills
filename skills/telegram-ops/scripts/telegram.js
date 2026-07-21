/**
 * Telegram Operations Client
 * Generic Telegram bot API wrapper for channel and bot management
 */

export interface TelegramConfig {
  token: string
  defaultChannel?: string
  timezone?: string
  webhookUrl?: string
}

export interface SendMessageOptions {
  chatId: string
  text: string
  parseMode?: 'HTML' | 'MarkdownV2' | 'Markdown'
  disableWebPagePreview?: boolean
  disableNotification?: string
  replyToMessageId?: number
  replyMarkup?: Record<string, unknown>
}

export interface SendMediaOptions {
  chatId: string
  caption?: string
  parseMode?: 'HTML' | 'MarkdownV2' | 'Markdown'
  disableNotification?: boolean
  replyToMessageId?: number
}

export interface ScheduleOptions {
  chatId: string
  text: string
  scheduledAt: Date | string
  parseMode?: 'HTML' | 'MarkdownV2' | 'Markdown'
  timezone?: string
}

export interface ChannelStats {
  id: number
  title: string
  username?: string
  memberCount: number
  description?: string
  type: string
}

export interface MessageAnalytics {
  messageId: number
  views: number
  forwards: number
  date: Date
}

export interface ScheduledPost {
  id: string
  chatId: string
  text: string
  scheduledAt: Date
  status: 'pending' | 'sent' | 'cancelled'
}

export class TelegramClient {
  private baseUrl: string
  private defaultChannel?: string
  private timezone: string

  constructor(config: TelegramConfig) {
    this.baseUrl = `https://api.telegram.org/bot${config.token}`
    this.defaultChannel = config.defaultChannel
    this.timezone = config.timezone || 'UTC'
  }

  private async request(method: string, params: Record<string, unknown> = {}): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })

    const data = await response.json() as { ok: boolean; result?: unknown; description?: string; error_code?: number }

    if (!data.ok) {
      throw new Error(`Telegram API error: ${data.description || 'Unknown error'} (${data.error_code})`)
    }

    return data.result
  }

  async sendMessage(options: SendMessageOptions): Promise<{ messageId: number; chat: Record<string, unknown> }> {
    const result = await this.request('sendMessage', {
      chat_id: options.chatId,
      text: options.text,
      parse_mode: options.parseMode || 'HTML',
      disable_web_page_preview: options.disableWebPagePreview || false,
      disable_notification: options.disableNotification || false,
      reply_to_message_id: options.replyToMessageId,
      reply_markup: options.replyMarkup
    }) as { message_id: number; chat: Record<string, unknown> }

    return {
      messageId: result.message_id,
      chat: result.chat
    }
  }

  async sendPhoto(options: SendMediaOptions & { photo: string }): Promise<{ messageId: number; chat: Record<string, unknown> }> {
    const result = await this.request('sendPhoto', {
      chat_id: options.chatId,
      photo: options.photo,
      caption: options.caption,
      parse_mode: options.parseMode || 'HTML',
      disable_notification: options.disableNotification || false,
      reply_to_message_id: options.replyToMessageId
    }) as { message_id: number; chat: Record<string, unknown> }

    return {
      messageId: result.message_id,
      chat: result.chat
    }
  }

  async sendVideo(options: SendMediaOptions & { video: string }): Promise<{ messageId: number; chat: Record<string, unknown> }> {
    const result = await this.request('sendVideo', {
      chat_id: options.chatId,
      video: options.video,
      caption: options.caption,
      parse_mode: options.parseMode || 'HTML',
      disable_notification: options.disableNotification || false,
      reply_to_message_id: options.replyToMessageId
    }) as { message_id: number; chat: Record<string, unknown> }

    return {
      messageId: result.message_id,
      chat: result.chat
    }
  }

  async sendDocument(options: SendMediaOptions & { document: string }): Promise<{ messageId: number; chat: Record<string, unknown> }> {
    const result = await this.request('sendDocument', {
      chat_id: options.chatId,
      document: options.document,
      caption: options.caption,
      parse_mode: options.parseMode || 'HTML',
      disable_notification: options.disableNotification || false,
      reply_to_message_id: options.replyToMessageId
    }) as { message_id: number; chat: Record<string, unknown> }

    return {
      messageId: result.message_id,
      chat: result.chat
    }
  }

  async sendAudio(options: SendMediaOptions & { audio: string }): Promise<{ messageId: number; chat: Record<string, unknown> }> {
    const result = await this.request('sendAudio', {
      chat_id: options.chatId,
      audio: options.audio,
      caption: options.caption,
      parse_mode: options.parseMode || 'HTML',
      disable_notification: options.disableNotification || false,
      reply_to_message_id: options.replyToMessageId
    }) as { message_id: number; chat: Record<string, unknown> }

    return {
      messageId: result.message_id,
      chat: result.chat
    }
  }

  async sendAnimation(options: SendMediaOptions & { animation: string }): Promise<{ messageId: number; chat: Record<string, unknown> }> {
    const result = await this.request('sendAnimation', {
      chat_id: options.chatId,
      animation: options.animation,
      caption: options.caption,
      parse_mode: options.parseMode || 'HTML',
      disable_notification: options.disableNotification || false,
      reply_to_message_id: options.replyToMessageId
    }) as { message_id: number; chat: Record<string, unknown> }

    return {
      messageId: result.message_id,
      chat: result.chat
    }
  }

  async editMessage(options: { chatId: string; messageId: number; text: string; parseMode?: string }): Promise<{ messageId: number }> {
    const result = await this.request('editMessageText', {
      chat_id: options.chatId,
      message_id: options.messageId,
      text: options.text,
      parse_mode: options.parseMode || 'HTML'
    }) as { message_id: number }

    return { messageId: result.message_id }
  }

  async deleteMessage(options: { chatId: string; messageId: number }): Promise<boolean> {
    await this.request('deleteMessage', {
      chat_id: options.chatId,
      message_id: options.messageId
    })
    return true
  }

  async pinMessage(options: { chatId: string; messageId: number; disableNotification?: boolean }): Promise<boolean> {
    await this.request('pinChatMessage', {
      chat_id: options.chatId,
      message_id: options.messageId,
      disable_notification: options.disableNotification || false
    })
    return true
  }

  async unpinMessage(options: { chatId: string; messageId: number }): Promise<boolean> {
    await this.request('unpinChatMessage', {
      chat_id: options.chatId,
      message_id: options.messageId
    })
    return true
  }

  async forwardMessage(options: { fromChatId: string; toChatId: string; messageId: number }): Promise<{ messageId: number }> {
    const result = await this.request('forwardMessage', {
      chat_id: options.toChatId,
      from_chat_id: options.fromChatId,
      message_id: options.messageId
    }) as { message_id: number }

    return { messageId: result.message_id }
  }

  async getChat(chatId: string): Promise<ChannelStats> {
    const result = await this.request('getChat', { chat_id: chatId }) as {
      id: number
      title: string
      username?: string
      description?: string
      type: string
    }

    const memberCount = await this.request('getChatMemberCount', { chat_id: chatId }) as number

    return {
      id: result.id,
      title: result.title,
      username: result.username,
      memberCount,
      description: result.description,
      type: result.type
    }
  }

  async getBotInfo(): Promise<{ id: number; username: string; firstName: string; canJoinGroups: boolean; canReadAllGroupMessages: boolean }> {
    return this.request('getMe') as Promise<{ id: number; username: string; firstName: string; canJoinGroups: boolean; canReadAllGroupMessages: boolean }>
  }

  async getChannelMemberCount(chatId: string): Promise<number> {
    return this.request('getChatMemberCount', { chat_id: chatId }) as Promise<number>
  }

  async getChannelMember(chatId: string, userId: number): Promise<Record<string, unknown>> {
    return this.request('getChatMember', { chat_id: chatId, user_id: userId }) as Promise<Record<string, unknown>>
  }

  async getMessageViews(chatId: string, messageId: number): Promise<{ views: number; forwards: number }> {
    const result = await this.request('getChat', {
      chat_id: chatId,
      message_id: messageId
    }) as { views?: number; forwards?: number }

    return {
      views: result.views || 0,
      forwards: result.forwards || 0
    }
  }

  async scheduleMessage(options: ScheduleOptions): Promise<ScheduledPost> {
    const scheduledAt = typeof options.scheduledAt === 'string'
      ? new Date(options.scheduledAt)
      : options.scheduledAt

    const scheduledDate = new Date(scheduledAt)
    const now = new Date()

    if (scheduledDate <= now) {
      throw new Error('Scheduled time must be in the future')
    }

    const delayMs = scheduledDate.getTime() - now.getTime()
    const postId = `sched_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    // Store scheduled post (in memory for now, could be persistent)
    const scheduledPost: ScheduledPost = {
      id: postId,
      chatId: options.chatId,
      text: options.text,
      scheduledAt: scheduledDate,
      status: 'pending'
    }

    // Schedule the message
    setTimeout(async () => {
      try {
        await this.sendMessage({
          chatId: options.chatId,
          text: options.text,
          parseMode: options.parseMode || 'HTML'
        })
        scheduledPost.status = 'sent'
      } catch (error) {
        console.error(`Failed to send scheduled message ${postId}:`, error)
        scheduledPost.status = 'cancelled'
      }
    }, delayMs)

    return scheduledPost
  }

  async crossPost(options: { channels: string[]; text: string; parseMode?: string; mediaUrl?: string; caption?: string }): Promise<{ channel: string; messageId: number }[]> {
    const results: { channel: string; messageId: number }[] = []

    for (const channel of options.channels) {
      try {
        if (options.mediaUrl) {
          // Determine media type from URL
          const isVideo = options.mediaUrl.match(/\.(mp4|mov|avi|webm)$/i)
          const isDocument = options.mediaUrl.match(/\.(pdf|doc|docx|xls|xlsx|zip)$/i)

          if (isVideo) {
            const result = await this.sendVideo({
              chatId: channel,
              video: options.mediaUrl,
              caption: options.caption,
              parseMode: (options.parseMode as 'HTML' | 'MarkdownV2' | 'Markdown') || 'HTML'
            })
            results.push({ channel, messageId: result.messageId })
          } else if (isDocument) {
            const result = await this.sendDocument({
              chatId: channel,
              document: options.mediaUrl,
              caption: options.caption,
              parseMode: (options.parseMode as 'HTML' | 'MarkdownV2' | 'Markdown') || 'HTML'
            })
            results.push({ channel, messageId: result.messageId })
          } else {
            const result = await this.sendPhoto({
              chatId: channel,
              photo: options.mediaUrl,
              caption: options.caption || options.text,
              parseMode: (options.parseMode as 'HTML' | 'MarkdownV2' | 'Markdown') || 'HTML'
            })
            results.push({ channel, messageId: result.messageId })
          }
        } else {
          const result = await this.sendMessage({
            chatId: channel,
            text: options.text,
            parseMode: (options.parseMode as 'HTML' | 'MarkdownV2' | 'Markdown') || 'HTML'
          })
          results.push({ channel, messageId: result.messageId })
        }
      } catch (error) {
        console.error(`Failed to post to ${channel}:`, error)
      }
    }

    return results
  }
}

export function createClient(config?: Partial<TelegramConfig>): TelegramClient {
  const token = config?.token || process.env.TELEGRAM_BOT_TOKEN || process.env.TERAAI_BOT_TOKEN
  if (!token) {
    throw new Error('Telegram bot token required. Set TELEGRAM_BOT_TOKEN or provide token in config.')
  }

  return new TelegramClient({
    token,
    defaultChannel: config?.defaultChannel || process.env.TELEGRAM_DEFAULT_CHANNEL,
    timezone: config?.timezone || process.env.TELEGRAM_TIMEZONE
  })
}
