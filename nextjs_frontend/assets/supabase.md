# Supabase Integration for QuickPost

## Supabase Project
- SUPABASE_URL: https://eykouaboizzpenftsatf.supabase.co
- SUPABASE_KEY: [REDACTED: use the environment variable in .env.local]

## Usage

- All Supabase API calls should use the client singleton in `src/supabase/supabaseClient.ts`.
- Authentication is via Supabase Auth (email/password) using the `@supabase/supabase-js` library.
- Store session in app context.

## Schema Needed

You should create these tables in Supabase (SQL editor):

### `posts`
| Column      | Type       | Description                |
| ----------- | ---------- | ------------------------- |
| id          | uuid, PK   | Primary key                |
| user_id     | uuid       | Author (FK users)          |
| title       | text       | Post title                 |
| content     | text       | Markdown content           |
| created_at  | timestamp  | Created time (default now) |
| updated_at  | timestamp  | Last updated time          |

### `comments`
| Column      | Type       | Description                |
| ----------- | ---------- | ------------------------- |
| id          | uuid, PK   | Primary key                |
| post_id     | uuid       | FK to posts                |
| user_id     | uuid       | Comment author (FK users)  |
| content     | text       | Comment text               |
| created_at  | timestamp  | Created time (default now) |

*Enable Row Level Security (RLS) and use authenticated roles for insert/update/delete.*

## Real-time

- Use the Supabase Realtime API for real-time updates on posts and comments.
- Subscribe to `posts` and `comments` for changes.

## Environment Variables

Set the following in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=your_supabase_key
```
