// This is a serverless function for Vercel to send results to Telegram
// You need to set environment variables in Vercel:
// TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      student,
      group,
      score,
      total,
      percentage,
      test,
      timestamp
    } = req.body;

    // Get Telegram credentials from environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Format message
    const message = `
📊 *New Test Result*

👤 *Student:* ${student}
🏫 *Group:* ${group}
📝 *Test:* ${test}
🎯 *Score:* ${score}/${total} (${percentage}%)
📅 *Date:* ${new Date(timestamp).toLocaleString()}

✅ *Congratulations!*
    `.trim();

    // Send to Telegram
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();

    if (!data.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ error: 'Failed to send message to Telegram' });
    }

    return res.status(200).json({ success: true, message: 'Results sent to Telegram' });
    
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
