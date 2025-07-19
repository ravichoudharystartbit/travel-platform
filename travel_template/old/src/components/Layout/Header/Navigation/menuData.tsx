import { HeaderItem } from "../../../../types/menu";

export const headerData: HeaderItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Properties",
      href: "#",
      submenu: [
        { label: "Property List", href: "#" },
        { label: "Property Details", href: "#" },
      ],
    },
    {
      label: "Blog",
      href: "#",
      submenu: [
        { label: "Blog Grid", href: "/services/service1" },
        { label: "Blog Details", href: "/services/service2" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ];