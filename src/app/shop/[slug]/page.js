export default async function Page({ params }) { 
  const { slug } = await params;
  return <h1>Product Detail (Dynamic from WooCommerce API) - {slug}</h1>; 
}
