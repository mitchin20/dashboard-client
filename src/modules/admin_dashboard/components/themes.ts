export const themes: any = {
    light: {
        sidebar: {
            backgroundColor: "#f9fafb",
            color: "#607489",
            borderRightColor: "#d1d5db",
        },
        menu: {
            menuContent: "#fbfcfd",
            icon: "#0098e5",
            hover: {
                backgroundColor: "#e5e7eb",
                color: "#083344",
            },
            disabled: {
                color: "#9fb6cf",
            },
        },
        logo: {
            color: "#0c4a6e",
        },
    },
    dark: {
        sidebar: {
            backgroundColor: "#030712",
            color: "#8ba1b7",
            borderRightColor: "transparent",
        },
        menu: {
            menuContent: "#082440",
            icon: "#59d0ff",
            hover: {
                backgroundColor: "#0c4a6e",
                color: "#f0f9ff",
            },
            disabled: {
                color: "#3e5e7e",
            },
        },
        logo: {
            color: "#bae6fd",
        },
    },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const menuItemStyles = (theme: string, collapsed: boolean) => {
    return {
        root: {
            fontSize: "13px",
            fontWeight: 400,
        },
        button: {
            [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
            },
            "&:hover": {
                backgroundColor: themes[theme].menu.hover.backgroundColor,
                color: themes[theme].menu.hover.color,
            },
        },
        SubMenuExpandIcon: {
            color: "#b6b7b9",
        },
        subMenuContent: ({ level }: any) => ({
            backgroundColor:
                level === 0
                    ? hexToRgba(
                          themes[theme].menu.menuContent,
                          !collapsed ? 0.4 : 1
                      )
                    : "transparent",
        }),
    };
};
