import { faBars, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ButtonIcon } from "../shared/ButtonIcon";
import Controller from "../shared/Controller";
import { Progress } from "../shared/Progress";
import { useCurrentPage } from "../../utils";
import { useNavBarStore, usePlayerStore } from "./hooks";
import { TitleAndSinger } from "../shared/TitleAndSinger";

export function Footer() {
  const currentPage = useCurrentPage();
  const isPlayerPage = currentPage == "player";

  return (
    <Footer.Container>
      {!isPlayerPage && <Progress />}
      {!isPlayerPage && <Player />}
      <NavBar />
    </Footer.Container>
  );
}

function Player() {
  const {
    state: {
      musicInfo: { title, singer },
    },
  } = usePlayerStore();

  return (
    <Player.Container>
      {title ? (
        <Link to="/player">
          <TitleAndSinger
            title={title}
            singer={singer}
            size="small"
            width="200px"
          />
        </Link>
      ) : (
        <TitleAndSinger
          title={title}
          singer={singer}
          size="small"
          width="200px"
        />
      )}
      <Controller width={130} />
    </Player.Container>
  );
}

function NavBar() {
  const {
    state: { activeMenu },
    action: { setActiveMenu },
  } = useNavBarStore();

  const currentPage = useCurrentPage();

  useEffect(() => {
    setActiveMenu(currentPage);
  }, [currentPage]);

  return (
    <NavBar.Container>
      <ButtonIcon icon={faHome} href="/" active={activeMenu.home} />
      <ButtonIcon icon={faSearch} href="/search" active={activeMenu.search} />
      <ButtonIcon icon={faBars} href="/storage" active={activeMenu.storage} />
    </NavBar.Container>
  );
}

Footer.Container = styled.footer`
  background-color: black;
  position: absolute;
  width: 87%;
  left: 6.375%;
  bottom: 4%;
  border-radius: 0px 0px 36px 36px;
  svg {
    cursor: pointer;
    font-size: 22px;
  }
  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    bottom: 0;
    width: 100%;
    left: 0;
    border-radius: 0;
  }
`;

Player.Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 49%;
  padding: 10px 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

NavBar.Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 49%;
  padding: 12px 35px;
`;
