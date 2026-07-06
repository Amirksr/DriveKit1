import type { StaticImageData } from "next/image";

import suspension from "@/assets/images/icons/suspension.png";
import brake from "@/assets/images/icons/brake.png";
import radiator from "@/assets/images/icons/radiator.png";
import piston from "@/assets/images/icons/piston.png";
import accessories from "@/assets/images/icons/accessories.png";
import battery from "@/assets/images/icons/battery.png";
import carLights from "@/assets/images/icons/carLights.png";
import oilFilter from "@/assets/images/icons/oilFilter.png";

export interface HomeCategory {
  title: string;
  icon: StaticImageData;
}

/** Icon shortcuts shown in the homepage category carousel/grid. */
export const HOME_CATEGORIES: HomeCategory[] = [
  { title: "موتور", icon: piston },
  { title: "باتری", icon: battery },
  { title: "ترمز", icon: brake },
  { title: "روشنائی", icon: carLights },
  { title: "تعلیق", icon: suspension },
  { title: "لوازم جانبی", icon: accessories },
  { title: "سیستم خنک کننده", icon: radiator },
  { title: "روغن", icon: oilFilter },
];
