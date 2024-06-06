import Button from "@mui/material/Button";
import {Theme, SxProps} from "@mui/material/styles";

import {RouterLink} from "../../routes/components";
import { PATH_AFTER_SHOP} from "../../config-global";

type Props = {
  sx?: SxProps<Theme>;
};
export default function ShopButton({ sx }: Props) {

  return(
    <Button component={RouterLink} href={PATH_AFTER_SHOP} variant="outlined" sx={{ mr: 1, ...sx }}>
      Магазин
    </Button>
  );

}
