import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import "@/styles/main.scss";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options
  );
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(650).height(510).url()
    : null;

  return (
    <main className="container min-h-screen mx-auto p-8">
      <Link href="/" className="hover:underline">
        ← Back to Home
      </Link>
      <h1 className="project-title text-6xl font-bold mb-8">{post.title}</h1>
      <div className="image-and-tech-stack-container">
        {postImageUrl && (
          <img
            src={postImageUrl}
            alt={post.title}
            className="aspect-video rounded-xl"
            width="650"
            height="510"
          />
        )}
        <div className="tech-stack-container">
          <p className="text-4xl font-semibold">Tech Stack</p>
          {Array.isArray(post.techStack) && (
            <PortableText value={post.techStack} />
          )}
          {post.url && (
            <div className="website-button-container">
              <Link
                href={post.url}
                aria-label={`Link to ${post.title}'s website`}
                target="_blank"
              >
                <button className="website-button rounded-xl">
                  Check out their website
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="challenge-and-solution-container">
        <div className="challenge-container">
          <p className="text-4xl font-semibold">Challenge</p>
          {Array.isArray(post.challenge) && (
            <PortableText value={post.challenge} />
          )}
        </div>

        <div className="solution-container">
          <p className="text-4xl font-semibold">Solution</p>
          {Array.isArray(post.solution) && (
            <PortableText value={post.solution} />
          )}
        </div>
      </div>
    </main>
  );
}
