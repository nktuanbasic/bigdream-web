import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(req: Request) {
  try {
    // 1. Get user token from header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 2. Fetch Transactions (DEPOSIT, PURCHASE)
    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: false });

    // 3. Fetch User Activities (VIEW, DOWNLOAD)
    const { data: activities, error: actError } = await supabase
      .from('user_activities')
      .select('*')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: false });

    return NextResponse.json({
      transactions: txError ? [] : transactions,
      activities: actError ? [] : activities
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
