import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json()

    // Hashnode sends post slug in the webhook payload
    const slug: string | undefined =
      body?.data?.post?.slug ??
      body?.post?.slug ??
      body?.slug

    if (slug) {
      revalidatePath(`/blog/${slug}`)
    }

    // Always revalidate the homepage and blog listing too
    revalidatePath('/')
    revalidatePath('/blog')

    return NextResponse.json({ revalidated: true, slug: slug ?? null })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
