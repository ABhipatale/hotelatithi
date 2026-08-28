import Button from "./Button";
import { WhatsappIcon } from "./BrandIcons";
import { orderLink } from "../../lib/whatsapp";

/**
 * "ऑर्डर करा" — opens WhatsApp with the dish and its price already typed.
 * Shared by the menu grid and the signature specials so both always point at
 * the same number and say the same thing.
 */
export default function OrderButton({
  item,
  variant = "quiet",
  size = "sm",
  className = "",
}) {
  return (
    <Button
      as="a"
      href={orderLink(item)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
    >
      <WhatsappIcon className="size-4" />
      ऑर्डर करा
      <span className="sr-only">— {item.nameMr}, WhatsApp वर</span>
    </Button>
  );
}
