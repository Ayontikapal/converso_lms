import {createClient} from "@supabase/supabase-js";
import {auth} from "@clerk/nextjs/server";

export const createSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

    return createClient(
        supabaseUrl,
        supabaseKey, {
            async accessToken() {
                try {
                    const { getToken } = await auth();
                    return (await getToken({ template: "supabase" })) || (await getToken()) || null;
                } catch {
                    return null;
                }
            }
        }
    )
}