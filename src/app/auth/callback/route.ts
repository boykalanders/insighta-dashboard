import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * Handles the OAuth/magic-link callback from Supabase Auth.
 * Supabase redirects here after the user authenticates externally.
 * We exchange the code for a session, then redirect into the app.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect to the intended destination (or dashboard)
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If something went wrong, return to login with an error flag
  return NextResponse.redirect(`${origin}/auth/login?error=callback_failed`);
}
