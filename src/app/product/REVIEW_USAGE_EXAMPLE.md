# ReviewsSection Component - Usage Guide

## Overview
The `ReviewsSection` component has been converted from hardcoded data to a fully dynamic component that reads product review data from JSON.

## Key Features
- ✅ Dynamically loads reviews from product data
- ✅ Supports up to 4 reviews per product
- ✅ Interactive thumbnail slider
- ✅ Auto-extracts YouTube thumbnails as fallback
- ✅ Responsive design
- ✅ Only renders if reviews exist

## Usage Example

```javascript
import ReviewsSection from './review';
import reviewsData from '@/prodcutdata/review.json';

// Example 1: Using in a product page
export default function ProductPage({ params }) {
  // Find product by slug
  const product = reviewsData.find(p => p.slug === params.slug);
  
  return (
    <div>
      <h1>{product?.title_rendered}</h1>
      {/* Other product content */}
      
      <ReviewsSection productData={product} />
    </div>
  );
}

// Example 2: Direct product data
function DirectExample() {
  const productData = {
    id: 293683,
    slug: "enduro-foil-full-set",
    title_rendered: "Enduro foil full set",
    thumbnail_one: "https://staging.afs-foiling.com/wp-content/uploads/2024/10/maxresdefault-27.jpg",
    review_title: "HADOU ENDURO",
    video_url: "https://www.youtube.com/watch?v=Xh9mmDExedk",
    thumbnail_tow: "https://staging.afs-foiling.com/wp-content/uploads/2024/10/maxresdefault-26.jpg",
    review_heading_tow: "ENDURO GWEN LE TUTOUR",
    video_url_if_has_tow: "https://www.youtube.com/watch?v=3GEN4JsQmWA",
    thumbnail_three: "https://staging.afs-foiling.com/wp-content/uploads/2023/04/hqdefault.jpg",
    review_heading_three: "Andy Bigg Watersports",
    video_url_if_has_three: "https://www.youtube.com/watch?v=8Mf-D-pKrZ8"
  };
  
  return <ReviewsSection productData={productData} />;
}
```

## Data Structure

### Required Fields for Each Review

**Primary Review:**
- `thumbnail_one` - Image URL
- `review_title` - Review heading
- `video_url` - YouTube video URL
- `title_rendered` - Product title

**Additional Reviews (2-4):**
- `thumbnail_tow` + `review_heading_tow` + `video_url_if_has_tow`
- `thumbnail_three` + `review_heading_three` + `video_url_if_has_three`
- `thumbnail_four` + `review_heading_four` + `video_url_if_has_four`

## Component Features

### 1. Smart Review Extraction
The component automatically extracts all available reviews (1-4) from the product data.

### 2. YouTube Thumbnail Fallback
If a thumbnail image is missing, the component automatically generates a YouTube thumbnail from the video URL.

### 3. Interactive Slider
- Click thumbnails to switch reviews
- Use arrow buttons to navigate
- Active review is highlighted
- Grayscale filter on inactive thumbnails

### 4. Conditional Rendering
- Returns `null` if no reviews exist
- Only shows thumbnail slider if multiple reviews exist

### 5. Dynamic Title Overlay
The first 3 words of the product title are displayed as overlays on the video preview.

## Styling
The component uses Tailwind CSS classes and is fully responsive with breakpoints for small and large screens.

## Notes
- Thumbnails without valid data (false) are automatically skipped
- External links open in new tabs with security attributes
- Component is client-side rendered (`'use client'`)
