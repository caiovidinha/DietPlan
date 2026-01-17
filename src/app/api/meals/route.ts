import { NextRequest, NextResponse } from 'next/server';
import { 
  getMeals, 
  addMeal, 
  deleteMeal,
} from '@/lib/database';

export async function GET() {
  try {
    const meals = getMeals();
    return NextResponse.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json({ error: 'Failed to fetch meals' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { dayOfWeek, mealType, ingredients } = await request.json();
    
    const result = addMeal(dayOfWeek, mealType, ingredients);
    
    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error('Error adding meal:', error);
    return NextResponse.json({ error: 'Failed to add meal' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }
    deleteMeal(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting meal:', error);
    return NextResponse.json({ error: 'Failed to delete meal' }, { status: 500 });
  }
}
