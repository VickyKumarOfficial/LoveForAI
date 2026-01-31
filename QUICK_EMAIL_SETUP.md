# Quick Start: Email Setup

## 1️⃣ Get Gmail App Password (2 minutes)

1. Go to: https://myaccount.google.com/apppasswords
2. Generate password for "Mail" → "Other (LoveForAi)"
3. Copy the 16-character password

## 2️⃣ Update backend/.env

```env
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx  # Remove spaces!
```

## 3️⃣ Update Event Details

Edit `backend/src/services/emailService.ts`:

**Line 74-79** - Google Calendar:
```typescript
dates: '20260315T090000/20260315T180000', // YYYYMMDDTHHmmss format
location: 'Your Venue Name, Full Address',
```

**Line 235-245** - Email body:
```html
<td>March 15, 2026</td>  <!-- Your date -->
<td>9:00 AM - 6:00 PM</td>  <!-- Your time -->
<td>Your Venue, City</td>  <!-- Your location -->
```

## 4️⃣ Start & Test

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (already running)
# Just test registration with your email
```

## ✅ Done!
Check your inbox for the confirmation email!

---

## 🎨 Customize Colors (Optional)

In `emailService.ts`, change:
- `#dc143c` → Your brand color
- `#0a0a0a` → Background color
- `#252525` → Card background

---

**That's it! The system is fully implemented and ready to use!** 🚀
