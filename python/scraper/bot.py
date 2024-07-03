import telebot

bot_token = '<token>'
bot = telebot.TeleBot(bot_token)

@bot.message_handler(func=lambda message: True)
def save_messages(message):
    with open('messages.txt', 'a') as f:
        print(message)
        f.write(f"{message.from_user.username}: {message.text}\n")

bot.polling()
