import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { rateLimit } from '../../lib/rate-limit';

// Rate limiting configuration
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Apply rate limiting
    await limiter.check(res, 3, 'CACHE_TOKEN'); // 3 requests per minute

    const { name, email, message, profileId } = req.body;

    // Basic validation
    if (!name || !email || !message || !profileId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check for spam indicators
    const spamIndicators = [
      /viagra/i,
      /casino/i,
      /lottery/i,
      /winner/i,
      /inheritance/i,
      /million/i,
      /urgent/i,
      /congratulations/i,
    ];

    const isSpam = spamIndicators.some(pattern =>
      pattern.test(name) || pattern.test(email) || pattern.test(message)
    );

    if (isSpam) {
      return res.status(400).json({ message: 'Message appears to be spam' });
    }

    // Create contact submission
    const submission = await prisma.contactSubmission.create({
      data: {
        profileId,
        name,
        email,
        message,
        isRead: false,
      },
    });

    // TODO: Send email notification to portfolio owner
    // This would be implemented using Amazon SES or another email service

    return res.status(200).json({
      message: 'Message sent successfully',
      submissionId: submission.id
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
