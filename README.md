# SchoolSaaS - Multi-Tenant School Management System

A comprehensive School Management SaaS platform built with Next.js, TypeScript, Prisma, and Tailwind CSS. This system supports multiple schools (tenants) with complete data isolation and role-based access control.

## 🚀 Features

### Core Modules
- **Admin Module**: School profile, user management, academic year setup
- **Student Management**: Admission, enrollment, attendance, grades
- **Teacher Management**: Profiles, subject assignment, timetables, leave management
- **Finance Module**: Fee structure, invoicing, payments via Stripe
- **Transport Module**: Bus routes, stops, student assignments
- **Academic Module**: Subjects, exams, report cards, analytics
- **Communication Module**: Announcements, parent-teacher messaging
- **Library Module**: Book catalog, issue/return system, fines
- **Inventory Module**: Asset management, stock tracking

### Multi-Tenancy
- Workspace-based tenant isolation
- Custom domain support
- Role-based permissions (Super Admin, Principal, Teacher, Student, Parent)
- Separate billing per school

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Email**: Nodemailer
- **Forms**: React Hook Form with Zod validation

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)
- Email service (Gmail, SendGrid, etc.)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SchoolSaaS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update the environment variables in `.env.local`

4. **Set up the database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

- [System Architecture](./docs/README.md)
- [UI Mockups](./docs/ui-mockups.md)
- [Onboarding Flows](./docs/onboarding-flows.md)

## 🗄️ Database Schema

The system uses a comprehensive Prisma schema supporting:

- Multi-tenant architecture with workspaces
- Complete school management entities
- Role-based access control
- Audit trails and soft deletes
- Optimized relationships for performance

### Key Entities
- `Workspace` - Multi-tenant isolation
- `School` - Individual school instances
- `User` - System users across all tenants
- `WorkspaceUser` - Role assignments per workspace
- `Student`, `Teacher`, `Parent` - User profiles
- `Class`, `Section`, `Subject` - Academic structure
- `Attendance`, `Grade`, `Exam` - Academic records
- `Invoice`, `Payment` - Financial management
- `Bus`, `Route`, `Stop` - Transport system
- `LibraryItem`, `InventoryItem` - Resource management

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset database

## 🎯 User Roles & Permissions

### Super Admin
- Platform-wide access
- Workspace management
- Subscription oversight

### Admin/Principal
- School-wide access
- User management
- System configuration
- Reports and analytics

### Teacher
- Class management
- Student grading
- Attendance tracking
- Parent communication

### Student
- Academic records access
- Timetable viewing
- Assignment submission
- Fee status

### Parent
- Child's progress tracking
- Teacher communication
- Fee payments
- Transport information

## 🔐 Security Features

- Multi-tenant data isolation
- Role-based access control
- JWT authentication
- Input validation with Zod
- SQL injection prevention
- XSS protection

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Manual Deployment
1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Run migrations: `npm run db:migrate`
4. Start the server: `npm run start`

## 📝 Environment Variables

Create a `.env.local` file with the following variables:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
STRIPE_PUBLIC_KEY="pk_..."
STRIPE_SECRET_KEY="sk_..."
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@schoolsaas.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] Mobile application (React Native)
- [ ] Advanced analytics dashboard
- [ ] AI-powered insights
- [ ] Integration with external LMS
- [ ] Multi-language support
- [ ] Advanced reporting tools
- [ ] API documentation
- [ ] Webhooks for integrations

---

Built with ❤️ using Next.js, Prisma, and modern web technologies.
