# Supabase Database Migrations

This folder contains SQL migrations that need to be applied to your Supabase database to fix the errors you're experiencing.

## How to Apply These Migrations

### Option 1: Using the Supabase Studio (Web UI)

1. Go to your Supabase project dashboard: https://app.supabase.com/
2. Click on your project
3. Navigate to the "SQL Editor" tab in the left sidebar
4. Create a new query
5. Copy and paste the contents of each SQL file in this folder into the SQL editor
6. Run the SQL scripts one by one

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Navigate to your project directory
cd your-project-directory

# Apply migrations
supabase db push
```

## Migrations to Apply

1. `20250523_create_rewrites_table.sql` - Creates the table to store humanization history
2. `20250523_create_user_credits_table.sql` - Creates the table to store user credits

## After Applying Migrations

After applying these migrations, restart your application. The errors about missing tables should be resolved.
