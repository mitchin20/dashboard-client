import React from "react";
import { Drawer, Box } from "@mui/material";
import { MuiDrawerProps } from "../../types";

const MuiDrawer: React.FC<MuiDrawerProps> = ({
    anchor,
    open,
    onClose,
    PaperProps,
    children,
    props,
}) => {
    return (
        <Drawer
            anchor={anchor}
            open={open}
            onClose={onClose}
            PaperProps={PaperProps}
        >
            <Box
                sx={{
                    marginTop: "80px",
                    padding: "20px",
                    ...props,
                }}
            >
                {children}
            </Box>
        </Drawer>
    );
};

export default MuiDrawer;
