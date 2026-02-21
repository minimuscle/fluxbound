import { useState } from "react";
import "./App.scss";
import { GamePage } from "./pages/SoloGame";
import { MainPage } from "./pages/main";
import { GlobalContext } from "./utils/context";
import type { Page } from "./utils/types/game";

export const App = () => {
  /***** HOOKS *****/
  const [activePage, setActivePage] = useState<Page>("MAIN");
  const [playMusic, setPlay] = useState(true);

  /***** RENDER HELPERS *****/
  const RenderPage: Record<Page, React.ReactNode> = {
    MAIN: <MainPage />,
    GAME: <GamePage />,
    SOLO_GAME: <GamePage />,
  };

  /***** RENDER *****/
  return (
    <GlobalContext value={{ playMusic, activePage, setActivePage }}>
      <div className="MainContainer">
        {/* <button
          className="MainContainer__audio"
          onClick={() => setPlay(!playMusic)}
        >
          {playMusic ? (
            <SpeakerHighIcon size={32} />
          ) : (
            <SpeakerSlashIcon size={32} />
          )}
        </button> */}
        {RenderPage[activePage]}
      </div>
    </GlobalContext>
  );
};
