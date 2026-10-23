import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound">
      <span className="eyebrow">404 / A QUIET CORNER</span>
      <h1>You found an unbuilt corner of my space.</h1>
      <p>Every space has a few pieces yet to be discovered.</p>
      <Link className="button button-primary" href="/en">Back to LarySpace <span aria-hidden>↗</span></Link>
    </div>
  );
}
