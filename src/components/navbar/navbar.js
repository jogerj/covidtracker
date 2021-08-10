import NavbarDesktop from "./navbarDesktop";
import NavbarMobile from "./navbarMobile";
export default function Navbar() {
  return (
    <>
      <NavbarDesktop display={["none", "none", "none", "flex"]} />
      <NavbarMobile display={["flex", "flex", "flex", "none"]} />
    </>
  );
}
