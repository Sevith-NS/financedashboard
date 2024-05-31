import { Box } from "@mui/material";
import { styled } from "@mui/material";

//eslint-disable-next-line
const DashboardBox = styled(Box)(({}) =>({
        backgroundColor: "#000",
        borderRadius: "1rem",
        boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(88, 88, 88, .8)"
}));

export default DashboardBox;