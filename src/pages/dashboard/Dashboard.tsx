import React, { useMemo, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import { createTheme } from "@mui/material/styles";
import type { Router } from "@toolpad/core";
import { DashboardLayout, AppProvider, NavigationItem } from "@toolpad/core";
import PageContent from "./components/PageContent";
import { DashboardProps } from "../../types";

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

const Dashboard: React.FC<DashboardProps> = (props) => {
    const { window } = props;
    const [pathname, setPathname] = useState("/covid-19;");

    const router = useMemo<Router>(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    const branding = {
        logo: false,
        title: "Dashboard",
    };

    const navItems: NavigationItem[] = [
        {
            segment: "/covid-19",
            title: "Covid-19",
        },
    ];

    return (
        <AppProvider
            navigation={navItems}
            theme={demoTheme}
            router={router}
            branding={branding}
        >
            <DashboardLayout
                window={window}
                title="Dashboard"
                icon={<DescriptionIcon />}
            >
                <PageContent />
            </DashboardLayout>
        </AppProvider>
    );
};

export default Dashboard;
