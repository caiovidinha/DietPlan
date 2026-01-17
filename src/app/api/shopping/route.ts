import { NextRequest, NextResponse } from 'next/server';
import { 
  getShoppingList, 
  updateShoppingItemHasAtHome, 
  deleteShoppingItem,
  clearShoppingList,
  generateShoppingListFromMeals
} from '@/lib/database';

export async function GET() {
  try {
    const items = getShoppingList();
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching shopping list:', error);
    return NextResponse.json({ error: 'Failed to fetch shopping list' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Se for uma requisição para gerar a lista automaticamente
    if (body.action === 'generate') {
      generateShoppingListFromMeals();
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, hasAtHome } = await request.json();
    updateShoppingItemHasAtHome(id, hasAtHome);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating shopping item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Se não tiver ID, limpar toda a lista
    if (!id) {
      clearShoppingList();
      return NextResponse.json({ success: true });
    }
    
    deleteShoppingItem(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting shopping item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
