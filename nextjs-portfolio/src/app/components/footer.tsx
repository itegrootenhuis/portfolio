import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const ABOUT_QUERY = `*[_type == "about"][0]{
  title,
  slug,
  publishedAt,
  name,
  headline,
  email,
  github,
  linkedin,
  phone,
  image,
  bio,
}`;

const options = { next: { revalidate: 30 } };

const Footer = async () => {
  const aboutInfo = await client.fetch<SanityDocument>(
    ABOUT_QUERY,
    {},
    options
  );

  return (
    <div className="footer-container">
      <footer id="contact" className="container mx-auto p-8">
        <p>
          <Link
            href={`mailto:${aboutInfo.email}`}
            aria-label="Email link"
            target="_blank"
          >
            Email
          </Link>
        </p>
        <p>
          <Link
            href={aboutInfo.github}
            aria-label="Github link"
            target="_blank"
          >
            Github
          </Link>
        </p>
        <p>
          <Link
            href={aboutInfo.linkedin}
            aria-label="LinkedIn link"
            target="_blank"
          >
            LinkedIn
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
