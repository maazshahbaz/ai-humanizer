# AI Humanizer

An advanced web application that humanizes AI-generated text to make it undetectable by AI content detection tools. Built with React, Supabase, and the Undetectable.ai API.

## 🚀 Live Demo

The application is deployed on Netlify at [ai-humanizer-app.netlify.app](https://ai-humanizer-app.netlify.app) (link will be updated after deployment).

## 📋 Features

### User Authentication
- **Sign Up**: Create an account with email and password
- **Login**: Secure authentication with Supabase
- **Guest Mode**: Try the application up to 3 times without signing up
- **Email Confirmation**: Automatic email confirmation for a smooth onboarding experience

### AI Text Humanization
- **Text Humanization**: Converts AI-generated text to appear more human-like
- **Credit System**: 100 free credits for new users
- **Guest Usage**: Limited to 3 free uses to encourage sign-up

### User Dashboard
- **Humanization History**: View all previous text humanizations
- **Credit Balance**: Track remaining credits
- **Account Management**: View account details

### Database Structure
- **Supabase Integration**: Secure data storage
- **Tables**:
  - `rewrites`: Stores humanization history
  - `user_credits`: Tracks user credit balances
- **Row-Level Security**: Ensures data protection

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Authentication & Database**: Supabase
- **API Integration**: Undetectable.ai
- **State Management**: Context API
- **Deployment**: Netlify

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Supabase account
- Undetectable.ai API credentials

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/maazshahbaz/ai-humanizer.git
   cd ai-humanizer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_UNDETECTABLE_USER_ID=your_undetectable_user_id
   VITE_UNDETECTABLE_API_KEY=your_undetectable_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Supabase Setup

Run the migration SQL files in the Supabase SQL Editor:
1. `supabase/migrations/20250523_create_user_credits_table.sql`
2. `supabase/migrations/20250523_create_rewrites_table.sql`
3. `supabase/migrations/20250524001137_pale_king.sql`

### Demo Account

A demo account has been created for testing:
- **Email**: demo@aihumanizer.com
- **Password**: DemoPass123!

To create your own demo account, run the SQL commands in `supabase/migrations/create_demo_account.sql`.

## 📊 Project Structure

```
project/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── context/       # React context providers
│   ├── lib/           # Utility functions and API integrations
│   ├── pages/         # Page components
│   ├── App.tsx        # Application entry point
│   └── main.tsx       # Root component
├── supabase/
│   └── migrations/    # SQL migration files
├── .env               # Environment variables (gitignored)
├── tailwind.config.js # Tailwind CSS configuration
└── vite.config.ts     # Vite configuration
```

## 🚀 Deployment

The application is configured for easy deployment to Netlify. A `netlify.toml` file is included with the necessary build configurations.

### Deploying to Netlify

1. Connect your GitHub repository to Netlify
2. Configure the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Add the environment variables (same as in the `.env` file)
4. Deploy the site

## 🔒 Security

- API keys are stored as environment variables
- Supabase Row-Level Security (RLS) is enabled for all tables
- User authentication is handled securely by Supabase

## 🧩 Future Enhancements

- Add support for more AI humanization options
- Implement a subscription plan system
- Add OAuth login options (Google, GitHub, etc.)
- Enhance the dashboard with analytics

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contact

For any questions or issues, please open an issue on GitHub.
