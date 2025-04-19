# Easy Portfolio Builder

A modern, user-friendly portfolio platform that enables job seekers to create and share professional portfolios to showcase their projects and creations.

## 🚀 Features

- **User Authentication & Profile Management**
  - Secure signup and login
  - Profile customization
  - Project management
  - Shareable portfolio URLs

- **Portfolio Creation**
  - Multi-media support (images, videos, PDFs)
  - File preview and rendering
  - Thumbnail generation
  - Customizable themes

- **Social Integration**
  - Social media profile linking
  - Contact form integration
  - Shareable portfolio links

## 🛠️ Technology Stack

### Frontend
- Next.js 14 with TypeScript
- TailwindCSS for styling
- Shadcn UI components
- Custom React components

### Backend
- Next.js API routes
- Node.js 18.x LTS
- TypeScript
- NextAuth.js for authentication
- Prisma ORM

### Database & Storage
- PostgreSQL
- Amazon RDS (production)
- Amazon S3 for media storage

### AWS Services
- AWS Amplify for hosting
- Amazon CloudFront for CDN
- AWS Lambda + API Gateway
- Amazon SES for email
- Amazon Route 53 for DNS
- Amazon CloudWatch for monitoring

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/easy-portfolio-builder.git
   cd easy-portfolio-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration values.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Required Environment Variables
```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### AWS Configuration
Refer to the AWS implementation plan for detailed setup instructions of AWS services.

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Database Schema](./docs/database.md)
- [AWS Implementation Plan](./docs/aws-plan.md)
- [Project Architecture](./docs/architecture.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

