"use server"
export default async function countries() {
    const response = await fetch(`https://staging.afs-foiling.com/fr/wp-json/wp/v2/nationalite`, {
        next: { revalidate: 3600 }
    });
    const data = await response.json();
    return data;
}