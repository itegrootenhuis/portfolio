import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText, type SanityDocument } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import "@/styles/main.scss";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, image, projectType}`;

const ABOUT_QUERY = `*[_type == "about"][0]{
  title,
  slug,
  publishedAt,
  name,
  headline,
  email,
  phone,
  image,
  bio,
  socialLinks
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const aboutInfo = await client.fetch<SanityDocument>(
    ABOUT_QUERY,
    {},
    options
  );

  const aboutImageUrl = aboutInfo.image
    ? urlFor(aboutInfo.image)?.width(550).height(410).url()
    : null;

  return (
    <main id="home">
      <section id="about" className="container mx-auto p-8">
        <h1 className="about-name text-6xl font-bold mb-8">{aboutInfo.name}</h1>
        <h2 className="about-title text-2xl font-bold mb-8">
          {aboutInfo.headline}
        </h2>
        <div className="about-bio text-xl">
          {Array.isArray(aboutInfo.bio) && (
            <PortableText value={aboutInfo.bio} />
          )}
        </div>
        {aboutImageUrl && (
          <div className="about-image-container">
            <img
              src={aboutImageUrl}
              alt={`Headshot of ${aboutInfo.name}`}
              className="about-image rounded-xl"
              width="550"
              height="410"
            />
          </div>
        )}
      </section>
      <section id="projects">
        <div className="container mx-auto p-8">
          <h3 className="text-4xl font-bold mb-8">Projects</h3>
          <div className="project-list flex gap-y-6">
            {posts.map((post) => (
              <div className="project-card hover:underline" key={post._id}>
                <Link href={`/${post.slug.current}`}>
                  <p className="text-xl font-semibold">
                    {post.title} - {post.projectType}
                  </p>
                  <img
                    src={urlFor(post.image)?.height(410).width(550).url()}
                    alt={`Logo image for ${post.title}`}
                    className="rounded-xl"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
