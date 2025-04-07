import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
const isProtectedRoutes = createRouteMatcher(['/user(.*)', '/release(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { redirectToSignIn, userId } = await auth();


  if (isProtectedRoutes(req)) {
    // if (userId === null) {
    //   return redirectToSignIn()
    // }
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}