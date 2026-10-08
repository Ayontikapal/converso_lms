import Vapi from "@vapi-ai/web";

const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN || process.env.NEXT_PUBLIC_VAPI_API_KEY || "vapi_dummy_token";

export const vapi = new Vapi(token);


