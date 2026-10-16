import type { StaticImageData } from "next/image";
import jajak from "../../../public/project/jajak/hover.webp";
import chamverse from "../../../public/project/chamverse/hover.webp";
import node from "../../../public/project/node/hover.webp";
import onve from "../../../public/project/onve/hover.webp";
import guestbook from "../../../public/project/guestbook/hover.webp";
import dashboard from "../../../public/project/dashboard/hover.webp";

export const desktopCaptures: Partial<Record<string, StaticImageData>> = {
  "01": jajak, "02": chamverse, "03": onve, "04": dashboard, "05": node, "06": guestbook,
};

// Add the owner's mobile screenshots here when supplied.
export const mobileCaptures: Partial<Record<string, StaticImageData>> = {};
