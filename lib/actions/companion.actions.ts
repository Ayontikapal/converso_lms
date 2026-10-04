"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const createCompanion=async(formData:CreateCompanion)=>{
    const {userId: author} = await auth();
    const supabase=createSupabaseClient();
    const {data, error} =await supabase
        .from('companions')
        .insert({...formData, author})
        .select();

    if(error || !data) throw new Error(error?.message || 'Failed to create a companion');
    return data[0];
}

export const getAllCompanions=async({limit=10, page=1, subject, topic}:
    GetAllCompanions
)=>{
    const {userId} =await auth();
    if (!userId) return [];
    const supabase=createSupabaseClient();
    let query = supabase.from('companions').select().eq("author", userId);
    if(subject && topic){
        query=query.ilike('subject', `%${subject}%`)
        .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }
    else if(subject){
        query=query.ilike('subject', `%${subject}%`)
    }
    else if (topic){
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;

    if(error) {
        console.error("Error fetching companions:", error.message);
        return [];
    }
    return companions || [];
}

export const getCompanion=async(id:string)=>{
    const supabase=createSupabaseClient();
    const { data, error } = await supabase.from('companions')
    .select()
    .eq('id', id);

    if(error || !data || data.length === 0) {
        console.error("Error fetching companion:", error?.message);
        return null;
    }
    return data[0];
}

export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    if (!userId) return null;
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('session_history')
        .insert({
            companion_id: companionId,
            user_id: userId,
        })
        .select();

    if(error) {
        console.error("Error adding to session history:", error.message);
        return null;
    }

    revalidatePath('/home');
    revalidatePath('/my-journey');
    return data;
}

export const getRecentSessions = async (limit = 10) => {
    const { userId } = await auth();
    if (!userId) return [];
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq("user_id", userId)
        .order('created_at', { ascending: false })
        .limit(limit);
    if (error) {
        console.error("Error fetching recent sessions:", error.message);
        return [];
    }

    return (data || [])
        .map((item: any) => (Array.isArray(item.companions) ? item.companions[0] : item.companions))
        .filter(Boolean);
}

export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
    if (error) {
        console.error("Error fetching user sessions:", error.message);
        return [];
    }

    return (data || [])
        .map((item: any) => (Array.isArray(item.companions) ? item.companions[0] : item.companions))
        .filter(Boolean);
}

export const getUserCompanions = async (userId: string) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('author', userId);

    if (error) {
        console.error("Error fetching user companions:", error.message);
        return [];
    }

    return data || [];
}

export const newCompanionPermissions = async () => {
    const { userId, has } = await auth();
    const supabase = createSupabaseClient();
    let limit = 3;

    if (has({ plan: 'pro' })) {
        return true;
    } else if (has({ feature: "10_companion_limit" })) {
        limit = 10;
    } else if (has({ feature: "3_companion_limit" })) {
        limit = 3;
    }

    const { data, error } = await supabase
        .from('companions')
        .select('id', { count: 'exact' })
        .eq('author', userId);

    if (error) {
        console.error("Error checking companion permissions:", error.message);
        return true;
    }

    const companionCount = data?.length || 0;
    if (companionCount >= limit) {
        return false;
    } else {
        return true;
    }
}