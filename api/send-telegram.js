// api/send-telegram.js

module.exports = async (req, res) => {
  // Allow only POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    res.status(500).json({
      error:
        'Telegram configuration missing. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Vercel environment variables.'
    });
    return;
  }

  try {
    // Vercel parses JSON body automatically when sent as application/json
    const {
      student,
      group,
      score,
      total,
      percentage,
      test,
      timestamp
    } = req.body || {};

    if (!student || !group || score === undefined || !total) {
      res.status(400).json({
        error: 'Missing required fields in request body.'
      });
      return;
    }

    const submittedAt = new Date(
      timestamp || Date.now()
    ).toLocaleString('en-GB', {
      timeZone: 'Asia/Tashkent'
    });

    const text = `
<b>English Test Result</b>

👤 <b>Student:</b> ${student}
👥 <b>Group:</b> ${group}
📚 <b>Test:</b> ${test || 'Perfect Tenses'}

✅ <b>Score:</b> ${score}/${total} (${percentage}%)
🕒 <b>Submitted:</b> ${submittedAt}
`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML'
        })
      }
    );

    const data = await telegramResponse.json();

    if (!telegramResponse.ok || !data.ok) {
      console.error('Telegram API error:', data);
      res.status(500).json({
        error: 'Failed to send message to Telegram',
        details: data
      });
      return;
    }

    res.status(200).json({ ok: true, telegram: data });
  } catch (error) {
    console.error('send-telegram error:', error);
    res.status(500).json({
      error: 'Internal server error while sending Telegram message.'
    });
  }
};
