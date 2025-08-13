// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // List of protected admin paths
  const protectedPaths = ['/CS/addAdmin', '/CS/addstaff', '/CS/editGallery', '/CS/register','/CS'] // Add your paths
  
  // Check if current path is protected
  const isProtected = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Get admin token from cookies
  const adminToken = request.cookies.get('adminToken')?.value

  if (isProtected && !adminToken) {
    // Absolute URL for login
    const loginUrl = new URL('/adminLogin', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}