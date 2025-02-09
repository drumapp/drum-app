import { CookieOptions } from 'hono/utils/cookie'
export const public_app_url = process.env.NEXT_PUBLIC_APP_URL!
export const appwrite_endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!
export const appwrite_project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT!
export const appwrite_api_key = process.env.NEXT_APPWRITE_KEY!
export const auth_cookie = process.env.AUTH_COOKIE!
export const auth_cookie_option: CookieOptions = { path: '/', httpOnly: true, secure: true,   sameSite: 'strict', maxAge: 60 * 60 * 24 * 30, }
export const appwrite_database = process.env.NEXT_PUBLIC_APPWRITE_DATABASE!
export const appwrite_bucket_images = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES!
export const appwrite_collection_customers = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CUSTOMERS!
export const appwrite_collection_catalogue_items = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATALOGUE_ITEMS!
export const appwrite_collection_catalogue_items_categories = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATALOGUE_ITEMS_CATEGORIES!

