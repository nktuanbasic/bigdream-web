import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(req: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Xác thực người dùng
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get('chatId');

    // NẾU CÓ CHAT ID -> TRẢ VỀ CHI TIẾT TIN NHẮN (MESSAGES)
    if (chatId) {
      // 1. Kiểm tra chat này có thuộc về user không
      const { data: chatDoc, error: chatError } = await supabase
        .from('chats')
        .select('*')
        .eq('id', chatId)
        .eq('user_id', user.id)
        .single();
      
      if (chatError || !chatDoc) {
        return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
      }

      // 2. Lấy danh sách tin nhắn
      const { data: messages, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (msgError) {
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
      }

      // 3. Lấy ảnh render của các tin nhắn này (nếu có)
      const messageIds = messages.map(m => m.id);
      let generatedImages: any[] = [];
      if (messageIds.length > 0) {
        const { data: images } = await supabase
          .from('generated_images')
          .select('*')
          .in('message_id', messageIds);
        if (images) generatedImages = images;
      }

      return NextResponse.json({ 
        chat: chatDoc,
        messages: messages.map(msg => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          attachments: msg.attachments || [],
          createdAt: msg.created_at
        })),
        generatedImages: generatedImages.reduce((acc, img) => {
          acc[img.message_id] = { url: img.image_url, model: img.model };
          return acc;
        }, {} as Record<string, any>)
      });
    } 
    
    // NẾU KHÔNG CÓ CHAT ID -> TRẢ VỀ DANH SÁCH CHATS CHO SIDEBAR
    else {
      const { data: chats, error: chatsError } = await supabase
        .from('chats')
        .select('id, title, branch_id, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (chatsError) {
        return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 });
      }

      return NextResponse.json({ chats });
    }

  } catch (error) {
    console.error('History API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
