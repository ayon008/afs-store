// app/api/products/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://staging.afs-foiling.com/wp-json/wp/v2/product?per_page=100&acf_format=standard&_fields=id,slug,title.rendered,acf.caracteristiques,acf.compatibilite',
      {
        cache: 'no-store', // Disable caching to always get fresh data
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from WordPress API');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
