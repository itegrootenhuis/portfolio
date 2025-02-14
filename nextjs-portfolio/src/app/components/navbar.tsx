"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="nav-container">
      <nav className="container mx-auto p-8">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {pathname === "/" && (
            <li>
              <Link href="#about">About</Link>
            </li>
          )}
          {pathname === "/" && (
            <li>
              <Link href="#projects">Projects</Link>
            </li>
          )}
          <li>
            <Link href="#contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
