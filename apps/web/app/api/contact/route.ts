import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically send the contact form data to your backend
    // For now, we'll just return a success response
    
    return NextResponse.json({ 
      success: true, 
      message: 'Mesajınız alındı. En kısa sürede dönüş yapacağız.' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
