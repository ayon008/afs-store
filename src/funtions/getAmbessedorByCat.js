"use server"
export default async function getAmbessedorByCat(activeTab) {
    try {
        const response = await fetch(`https://staging.afs-foiling.com/fr/wp-json/wp/v2/ambassador?discipline=${activeTab}&per_page=100`, { next: { revalidate: 3600 } });
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }

}