import { IconType } from "react-icons";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function MainNavBarLink({
  path,
  innerText,
  icon: Icon,
  pathToMatch,
}: {
  path: string;
  innerText: string;
  icon?: IconType;
  pathToMatch?: string;
}) {
  const { pathname } = useLocation();
  const pathMatches =
    pathToMatch && pathname.slice(0, pathToMatch.length) === pathToMatch;

  const linkStyles = "flex gap-1 justify-center items-center text-base";
  const IconElement = Icon ? <Icon /> : false;

  return pathToMatch ? (
    <Link
      to={path}
      className={`${pathMatches ? "font-bold" : ""} ${linkStyles}`}
    >
      {IconElement}
      <p className="hidden lg:block">{innerText}</p>
    </Link>
  ) : (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? "font-bold " : "") + linkStyles}
    >
      {IconElement}
      <p className="hidden lg:block">{innerText}</p>
    </NavLink>
  );
}
