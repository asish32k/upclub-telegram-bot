const { Telegraf, Markup } = require('telegraf');

// Replace with your bot token from @BotFather or use environment variable
const bot = new Telegraf(process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE');

// Main Menu buttons
const mainMenu = Markup.keyboard([
  ['🎁 Daily Gift Codes', '🚀 Promote & Earn More'],
  ['💰 Salary / Earnings', '🏆 50 Lakh Prize Contest'],
  ['🎮 Game Issue Support', '🔐 Account / Login Issue'],
  ['💬 Talk to Live Agent']
]).resize();

const welcomeMsg = `
👋 Hello Agent! Welcome to *UP CLUB SUPPORT*

🔥 *Today’s Offer:* Deposit ₹300 = 1 Spin – Win up to ₹10,000 or a Black Scorpio Bike!

👇 Please choose an option to continue:
`;

// Banner URL (replace with your actual banner image URL)
const bannerUrl = 'https://yourdomain.com/path/to/banner.jpg';

bot.start(async (ctx) => {
  try {
    await ctx.replyWithPhoto({ url: bannerUrl });
    await ctx.replyWithMarkdown(welcomeMsg, mainMenu);
  } catch (err) {
    console.error('Error sending welcome:', err);
  }
});

// Respond to greetings
bot.hears(/hi|hello|start/i, async (ctx) => {
  try {
    await ctx.replyWithPhoto({ url: bannerUrl });
    await ctx.replyWithMarkdown(welcomeMsg, mainMenu);
  } catch (err) {
    console.error('Error sending welcome:', err);
  }
});

// Button handlers
bot.hears('🎁 Daily Gift Codes', (ctx) =>
  ctx.reply('Use code UPCLUB300 to get a bonus today!'));

bot.hears('🚀 Promote & Earn More', (ctx) =>
  ctx.reply('Share your referral link to earn up to ₹1000 per user!'));

bot.hears('💰 Salary / Earnings', (ctx) =>
  ctx.reply('Your salary will be credited weekly to your registered UPI.'));

bot.hears('🏆 50 Lakh Prize Contest', (ctx) =>
  ctx.reply('Join now! Winners will be announced on Sunday!'));

bot.hears('🎮 Game Issue Support', (ctx) =>
  ctx.reply('Please send your Game UID and describe the issue.'));

bot.hears('🔐 Account / Login Issue', (ctx) =>
  ctx.reply('Please send your registered mobile number and error details.'));

bot.hears(/live agent|support|agent/i, (ctx) => {
  ctx.reply('Connecting you to a live agent. Please wait...');
  // TODO: Add forwarding to human agent group or integration here
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
