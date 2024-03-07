import { IconType } from "react-icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import PingNotification from "./PingNotification";

export default function MainNavBarLink({
  path,
  innerText,
  icon: Icon,
  pathToMatch,
  addNotification,
}: {
  path: string;
  innerText: string;
  icon?: IconType;
  pathToMatch?: string;
  addNotification?: boolean;
}) {
  const { pathname } = useLocation();
  const pathMatches =
    pathToMatch && pathname.slice(0, pathToMatch.length) === pathToMatch;

  const linkStyles = "flex gap-1 justify-center items-center text-base";

  const IconElement = !Icon ? (
    false
  ) : addNotification ? (
    <div className="relative">
      <Icon />
      <PingNotification />
    </div>
  ) : (
    <Icon />
  );

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
