import type { Opponents } from "routes/_app/game/lobby/-components/singlePlayer/selection";

import Adept from "assets/images/ui/menu/singlePlayerOpponent/opponents/base/adept.svg";
import Apprentice from "assets/images/ui/menu/singlePlayerOpponent/opponents/base/apprentice.svg";
import Grandmaster from "assets/images/ui/menu/singlePlayerOpponent/opponents/base/grandmaster.svg";
import Master from "assets/images/ui/menu/singlePlayerOpponent/opponents/base/master.svg";
import Novice from "assets/images/ui/menu/singlePlayerOpponent/opponents/base/novice.svg";
import TheOldOnes from "assets/images/ui/menu/singlePlayerOpponent/opponents/base/theOldOnes.svg";

import AdeptHover from "assets/images/ui/menu/singlePlayerOpponent/opponents/hovered/adept.svg";
import ApprenticeHover from "assets/images/ui/menu/singlePlayerOpponent/opponents/hovered/apprentice.svg";
import GrandmasterHover from "assets/images/ui/menu/singlePlayerOpponent/opponents/hovered/grandmaster.svg";
import MasterHover from "assets/images/ui/menu/singlePlayerOpponent/opponents/hovered/master.svg";
import NoviceHover from "assets/images/ui/menu/singlePlayerOpponent/opponents/hovered/novice.svg";
import TheOldOnesHover from "assets/images/ui/menu/singlePlayerOpponent/opponents/hovered/theOldOnes.svg";

export const getOptionImage = (option: Opponents, state: "base" | "hover") => {
  switch (state) {
    case "base":
      switch (option) {
        case "novice":
          return Novice;
        case "apprentice":
          return Apprentice;
        case "adept":
          return Adept;
        case "master":
          return Master;
        case "grandmaster":
          return Grandmaster;
        case "theOldOnes":
          return TheOldOnes;
        default:
          return Novice;
      }
    case "hover":
      switch (option) {
        case "novice":
          return NoviceHover;
        case "apprentice":
          return ApprenticeHover;
        case "adept":
          return AdeptHover;
        case "master":
          return MasterHover;
        case "grandmaster":
          return GrandmasterHover;
        case "theOldOnes":
          return TheOldOnesHover;
        default:
          return NoviceHover;
      }
  }
};
