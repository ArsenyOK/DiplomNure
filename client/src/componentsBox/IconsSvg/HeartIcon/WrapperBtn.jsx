import styled from "styled-components";
import IconButton from "@mui/material/IconButton";

export const WrapperBtn = styled(IconButton)`
    svg[data-testid="FavoriteBorderIcon"] {
        path {
            transition: all 0.2s ease;
            // color: ${(props) => props.btncolor};
            background: ${(props) => props.btncolor};
        }
    }

    svg[data-testid="FavoriteIcon"] {
        path {
            transition: all 0.2s ease;
            color: ${(props) => props.btncolor};
            // background: ${(props) => props.btncolor};
        }
    }
`;
