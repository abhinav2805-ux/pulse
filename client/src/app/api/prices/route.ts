import { NextResponse } from 'next/server';

export async function GET() {
  const mockData = [
    {state: 'Delhi', value: 100 },
    {state: 'Maharashtra', value: 120 },
  ];

  return NextResponse.json(mockData);
}