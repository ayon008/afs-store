import axios from "axios";
import { NextResponse } from 'next/server';

// Base URL of the AFS Foiling API
const baseUrl = "https://staging.afs-foiling.com/wp-json/wp/v2";

// GET handler for fetching a single team member by ID
export async function GET(request, { params }) {
  const { id } = params; // Get the ID from the URL

  try {
    const response = await axios.get(`${baseUrl}/afs-team/${id}`, {
      headers: {
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      withCredentials: false
    });
    
    // Use guid.rendered for the URL in the response
    const member = {
      ...response.data,
      url: response.data.guid.rendered
    };

    return NextResponse.json(member, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error(`Error fetching team member ${id}:`, error.message);
    return NextResponse.json(
      { error: `Failed to fetch team member ${id}` },
      { 
        status: error.response?.status || 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

// PUT handler for updating an existing team member
export async function PUT(request, { params }) {
  const { id } = params; // Get the ID from the URL
  
  try {
    const memberData = await request.json();
    const authHeader = request.headers.get('Authorization');

    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    };
    
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await axios.put(`${baseUrl}/afs-team/${id}`, memberData, {
      headers,
      withCredentials: false
    });
    
    // Use guid.rendered for the URL in the response
    const updatedMember = {
      ...response.data,
      url: response.data.guid.rendered
    };

    return NextResponse.json(updatedMember, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error(`Error updating team member ${id}:`, error.message);
    return NextResponse.json(
      { error: `Failed to update team member ${id}` },
      { 
        status: error.response?.status || 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

// DELETE handler for deleting a team member
export async function DELETE(request, { params }) {
  const { id } = params; // Get the ID from the URL

  try {
    const authHeader = request.headers.get('Authorization');

    const headers = {
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    };
    
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await axios.delete(`${baseUrl}/afs-team/${id}`, {
      headers,
      withCredentials: false
    });
    
    return NextResponse.json(response.data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error(`Error deleting team member ${id}:`, error.message);
    return NextResponse.json(
      { error: `Failed to delete team member ${id}` },
      { 
        status: error.response?.status || 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

// OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}