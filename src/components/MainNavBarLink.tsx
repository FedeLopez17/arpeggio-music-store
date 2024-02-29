import { Link, NavLink, useLocation } from "react-router-dom";

export default function MainNavBarLink({
  path,
  innerText,
  pathToMatch,
}: {
  path: string;
  innerText: string;
  pathToMatch?: string;
}) {
  const { pathname } = useLocation();
  const pathMatches =
    pathToMatch && pathname.slice(0, pathToMatch.length) === pathToMatch;

  return pathToMatch ? (
    <Link to={path} className={`${pathMatches ? "font-bold" : ""}`}>
      {innerText}
    </Link>
  ) : (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? "font-bold" : "")}
    >
      {innerText}
    </NavLink>
  );
}
