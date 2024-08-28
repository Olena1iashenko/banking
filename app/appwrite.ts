import { Client, Account } from "appwrite";
import { type Models } from "appwrite";
// for admin session look timecode 2:55 https://www.youtube.com/watch?v=DwbwuYYiBTk

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string); // Replace with your project ID

export const account: Account = new Account(client);
export { ID } from "appwrite";
