# LoveForAI Conference 2026 - Backend

Backend API for handling conference registrations and payment processing.

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── index.ts          # Main config
│   │   ├── supabase.ts       # Supabase client
│   │   └── razorpay.ts       # Razorpay client
│   ├── controllers/     # Request handlers
│   │   ├── registrationController.ts
│   │   └── paymentController.ts
│   ├── routes/          # API routes
│   │   ├── registrationRoutes.ts
│   │   └── paymentRoutes.ts
│   ├── services/        # Business logic
│   │   ├── registrationService.ts
│   │   └── paymentService.ts
│   ├── middleware/      # Custom middleware
│   │   └── errorHandler.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   └── server.ts        # Main application entry
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
└── tsconfig.json
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cp .env.example .env
```

Update the `.env` file with your credentials:

- **Supabase**: Get from [Supabase Dashboard](https://app.supabase.com)
  - Project Settings → API → Project URL
  - Project Settings → API → anon/public key

- **Razorpay Test Keys**: Get from [Razorpay Dashboard](https://dashboard.razorpay.com)
  - Settings → API Keys → Generate Test Keys
  - Use Test Mode (no website verification needed)

### 3. Set Up Supabase Database

Run this SQL in your Supabase SQL Editor:

```sql
-- Create registrations table
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  year TEXT NOT NULL,
  plan_title TEXT NOT NULL,
  plan_price TEXT NOT NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster queries
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_payment_status ON registrations(payment_status);
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your needs)
CREATE POLICY "Enable all operations for registrations" 
ON registrations FOR ALL 
USING (true);
```

### 4. Run the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Registrations

**Create Registration**
```
POST /api/registrations
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "college": "MIT",
  "year": "3rd Year",
  "plan_title": "VIP Pass",
  "plan_price": "₹149"
}
```

**Get Registration by ID**
```
GET /api/registrations/:id
```

**Get All Registrations** (Admin)
```
GET /api/registrations
```

### Payment

**Create Razorpay Order**
```
POST /api/payment/create-order
Content-Type: application/json

{
  "amount": 149,
  "currency": "INR",
  "registrationId": "uuid-here"
}
```

**Verify Payment**
```
POST /api/payment/verify
Content-Type: application/json

{
  "razorpay_order_id": "order_xyz",
  "razorpay_payment_id": "pay_abc",
  "razorpay_signature": "signature_here",
  "registration_id": "uuid-here"
}
```

## 🔧 Tech Stack

- **Node.js** + **TypeScript**
- **Express.js** - Web framework
- **Supabase** - PostgreSQL database
- **Razorpay** - Payment gateway
- **CORS** - Cross-origin resource sharing

## 📝 Notes

- Using Razorpay **Test Mode** - no website verification required
- All amounts are in INR (Indian Rupees)
- Payment signature verification ensures security
- CORS configured for frontend at `http://localhost:3000`

## 🔐 Security

- Environment variables for sensitive data
- Payment signature verification
- Input validation on all endpoints
- Error handling middleware
