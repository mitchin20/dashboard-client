import { AnchorX, AnchorY } from "@mui/x-charts/ChartsLegend/legend.types";
import { GridColDef } from "@mui/x-data-grid";

// Define the Metrics interface
interface Metrics {
    testPositivityRatio: number | null;
    testPositivityRatioDetails: { source: string };
    caseDensity: number | null;
    weeklyNewCasesPer100k: number | null;
    contactTracerCapacityRatio: number | null;
    infectionRate: number | null;
    infectionRateCI90: number | null;
    icuCapacityRatio: number | null;
    bedsWithCovidPatientsRatio: number | null;
    weeklyCovidAdmissionsPer100k: number | null;
    vaccinationsInitiatedRatio: number | null;
    vaccinationsCompletedRatio: number | null;
    vaccinationsAdditionalDoseRatio: number | null;
    vaccinationsFall2022BivalentBoosterRatio: number | null;
}

// Define the RiskLevels interface
interface RiskLevels {
    overall: number;
    testPositivityRatio: number;
    caseDensity: number;
    contactTracerCapacityRatio: number;
    infectionRate: number;
    icuCapacityRatio: number;
}

// Define the CommunityLevels interface
interface CommunityLevels {
    cdcCommunityLevel: number | null;
    canCommunityLevel: number | null;
}

// Define the ICU Beds interface
interface IcuBeds {
    capacity: number | null;
    currentUsageTotal: number | null;
    currentUsageCovid: number | null;
}

// Define the Actuals interface
interface Actuals {
    cases: number;
    deaths: number;
    positiveTests: number;
    negativeTests: number;
    contactTracers: number;
    icuBeds: IcuBeds;
    hsaIcuBeds: IcuBeds;
    newCases: number;
    newDeaths: number;
    vaccinesDistributed: number;
    vaccinationsInitiated: number;
    vaccinationsCompleted: number;
    vaccinationsAdditionalDose: number;
    vaccinationsFall2022BivalentBooster: number;
    vaccinesAdministered: number;
    vaccinesAdministeredDemographics: any;
    vaccinationsInitiatedDemographics: any;
}

// Define the main CovidData interface
export interface CovidData {
    fips: string;
    country: string;
    state: string;
    level: string;
    locationId: string;
    population: number;
    hsaPopulation: number | null;
    metrics: Metrics;
    riskLevels: RiskLevels;
    cdcTransmissionLevel: number;
    communityLevels: CommunityLevels;
    actuals: Actuals;
    lastUpdatedDate: string;
    url: string;
}

export interface DashboardProps {
    window?: () => Window;
}

export interface DataTableProps {
    columns: GridColDef[];
    rows: any[];
    pageSize?: number;
    loading?: boolean;
    height?: number;
    width?: string;
    disablePageSizeOption?: boolean;
    props?: any;
    onRowClick?: (params: any) => void;
}

export interface BarChartProps {
    dataset: any[];
    series: {
        dataKey: string;
        label?: string;
    }[];
    height?: number;
    chartSetting?: any;
    loading?: boolean;
    layout?: string;
    width?: string;
}

export interface StatesDashboardComponentsProps {
    data: any[];
    loading: boolean;
}

export interface MuiDrawerProps {
    children: React.ReactNode;
    anchor?: "left" | "top" | "right" | "bottom";
    open?: boolean;
    onClose?: () => void;
    PaperProps?: any;
    props?: any;
}

export interface StatePopulationDetailsProps {
    data: any;
    showDrawer: boolean;
    handleCloseDrawer: () => void;
}

interface PieChartLegendPadding {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}

export interface MuiPieChartProps {
    series: any;
    width?: number;
    height?: number;
    legendPositionV?: AnchorY;
    legendPositionH?: AnchorX;
    fontSize?: number;
    padding?: PieChartLegendPadding;
    legendDirection?: "row" | "column";
}

interface NavItems {
    label: string;
    href: string;
}

export interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
    navItems: NavItems[];
}

export interface DesktopNavProps {
    isView: boolean;
    navItems: NavItems[];
}

export interface HeaderTextProps {
    children: React.ReactNode;
    disableDivide?: boolean;
    styles?: string;
    props?: any;
}

export interface CardProps {
    children: React.ReactNode;
    cardContainerStyles?: string;
    disableSpinAnimation?: boolean;
    cardContentStyles?: string;
}
