import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const response = await fetch(`${apiUrl}/properties?${searchParams.toString()}`);
    
    if (!response.ok) {
      console.error('API response not ok:', response.status, response.statusText);
      // Return empty results for non-200 responses as requested
      return NextResponse.json({ items: [], total: 0 });
    }

    const data = await response.json();
    
    // Normalize response to always return { items, total } shape
    // Handle both { items, total } and { data, totalCount } formats from backend
    let normalizedData;
    
    if (data.items !== undefined && data.total !== undefined) {
      // Backend already returns correct format
      normalizedData = { items: data.items, total: data.total };
    } else if (data.data !== undefined && data.totalCount !== undefined) {
      // Backend returns { data, totalCount } - normalize to { items, total }
      normalizedData = { items: data.data, total: data.totalCount };
    } else if (data.properties !== undefined) {
      // Backend returns { properties } - normalize to { items, total }
      normalizedData = { items: data.properties, total: data.properties.length };
    } else {
      // Fallback - assume data is the items array
      normalizedData = { items: Array.isArray(data) ? data : [], total: Array.isArray(data) ? data.length : 0 };
    }
    
    return NextResponse.json(normalizedData);
  } catch (error) {
    console.error('Error fetching properties:', error);
    
    // Return empty results for errors as requested
    return NextResponse.json({ items: [], total: 0 });
  }
}
