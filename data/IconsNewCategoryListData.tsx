import {
  Favorite,
  AccountBalance,
  HelpOutline,
  School,
  LocalMall,
  SportsSoccer,
  LocalBar,
  Movie,
  Mic,
  FitnessCenter,
  EmojiEvents,
  Devices,
} from "@mui/icons-material";

import { IconNewCategory } from "@/app/board/domain/models";

const IconsNewCategoryListData: IconNewCategory[] = [
  { id: 0, name: "Bienestar", icon: <Favorite />, category: "Miscelánea" },

  {
    id: 1,
    name: "Coste bancario",
    icon: <AccountBalance />,
    category: "Miscelánea",
  },

  { id: 2, name: "Desconocido", icon: <HelpOutline />, category: "Miscelánea" },

  { id: 3, name: "Miscelánea", icon: <HelpOutline />, category: "Miscelánea" },

  { id: 4, name: "Ropa", icon: <LocalMall />, category: "Miscelánea" },

  {
    id: 5,
    name: "Préstamo estudiantil",
    icon: <School />,
    category: "Miscelánea",
  },

  { id: 6, name: "Bolos", icon: <EmojiEvents />, category: "Entretenimiento" },

  { id: 7, name: "Cine", icon: <Movie />, category: "Entretenimiento" },

  { id: 8, name: "Concierto", icon: <Mic />, category: "Entretenimiento" },

  {
    id: 9,
    name: "Deportes",
    icon: <SportsSoccer />,
    category: "Entretenimiento",
  },

  {
    id: 10,
    name: "Discoteca",
    icon: <LocalBar />,
    category: "Entretenimiento",
  },

  {
    id: 11,
    name: "Electrónica",
    icon: <Devices />,
    category: "Entretenimiento",
  },
  {
    id: 12,
    name: "Entretenimiento",
    icon: <EmojiEvents />,
    category: "Entretenimiento",
  },

  { id: 13, name: "Gimnasio", icon: <FitnessCenter />, category: "Salud" },

  { id: 14, name: "Hobby", icon: <EmojiEvents />, category: "Entretenimiento" },

  {
    id: 15,
    name: "Hobby",
    icon: <EmojiEvents />,
    category: "Entretenimiento",
  },
  { id: 16, name: "Gimnasio", icon: <FitnessCenter />, category: "Salud" },

  { id: 17, name: "Hobby", icon: <EmojiEvents />, category: "Entretenimiento" },

  {
    id: 18,
    name: "Entretenimiento",
    icon: <EmojiEvents />,
    category: "Entretenimiento",
  },

  { id: 19, name: "Gimnasio", icon: <FitnessCenter />, category: "Salud" },

  { id: 20, name: "Hobby", icon: <EmojiEvents />, category: "Entretenimiento" },
];

export default IconsNewCategoryListData;
