import { z } from 'zod';

export const UserSchema = z.object({
  user_id: z.number(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.string().email(),
  password: z.string(),
  profile_picture: z.string().nullable(),
  preferred_cuisine: z.array(z.string()).nullable(),
  dietary_preferences: z.array(z.string()),
  favorite_recipes: z.array(z.number()),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;
