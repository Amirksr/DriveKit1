import type { StaticImageData } from "next/image";

import amirnia from "@/assets/images/brands/amirnia.png";
import vernet from "@/assets/images/brands/vernet.png";
import emco from "@/assets/images/brands/emco.png";
import eps from "@/assets/images/brands/eps.png";
import gates from "@/assets/images/brands/gates.png";
import bridgestone from "@/assets/images/brands/bridgestone.jpg";
import isaco from "@/assets/images/brands/isaco.png";
import lznf from "@/assets/images/brands/lznf.jpg";
import modern from "@/assets/images/brands/modern.jpg";
import ngk from "@/assets/images/brands/ngk.png";
import gisp from "@/assets/images/brands/gisp.png";
import valeo from "@/assets/images/brands/valeo.png";

export interface Brand {
  name: string;
  image: StaticImageData;
}

/** Featured supplier brands shown in the homepage's "Top Brands" grid. */
export const BRANDS: Brand[] = [
  { name: "amirnia", image: amirnia },
  { name: "emco", image: emco },
  { name: "eps", image: eps },
  { name: "bridgestone", image: bridgestone },
  { name: "gates", image: gates },
  { name: "isaco", image: isaco },
  { name: "lznf", image: lznf },
  { name: "modern", image: modern },
  { name: "gisp", image: gisp },
  { name: "vernet", image: vernet },
  { name: "ngk", image: ngk },
  { name: "valeo", image: valeo },
];
