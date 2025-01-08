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
    ModalProps?: any;
    props?: any;
}

export interface StatePopulationDetailsProps {
    data: any;
    showDrawer?: boolean;
    handleCloseDrawer?: () => void;
    winSize?: number;
    children?: React.ReactNode;
}

export interface CovidTrendsProps {
    covidTrendsData: any[];
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
    className?: string;
    props?: any;
}

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    slideEffect?: boolean;
    [key: string]: any;
}

export interface CardChildrenProps {
    children: React.ReactNode;
    className?: string;
}

export interface ButtonProps {
    text?: string;
    type?: "button" | "submit" | "reset";
    className?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    download?: string;
}

export interface LinkProps {
    children?: React.ReactNode;
    href?: string;
    rel?: string;
    target?: string;
    ariaLabel?: string;
    id?: string;
    role?: string;
    download?: string;
    tabIndex?: number;
    onClick?: () => void;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    className?: string;
}

export interface TooltipProps {
    content: string; // The text or content displayed in the tooltip
    children: React.ReactNode; // The element over which the tooltip will be shown
    position?: "top" | "right" | "bottom" | "left"; // Tooltip position relative to the children
    delay?: number; // Optional delay for showing the tooltip (in milliseconds)
    className?: string; // Optional additional classes for custom styles
    arrowClassName?: string; // Optional additional array class for custom styles
}

export interface DashboardSummaryProps {
    theme?: string;
}

export interface DownloadResponse {
    success: boolean;
    url?: string;
    error?: string;
    message: string;
}

export interface CountyMetricsProps {
    data: any;
}

export interface TextInputProps {
    label?: string;
    value?: string;
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    type?: string;
    placeholder?: string;
    name?: string;
    id?: string;
    disabled?: boolean;
    error?: string | boolean;
    required?: boolean;
    className?: string;
    multiline?: boolean;
    rows?: number;
    maxChars?: number;
    ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
}

export type EmployeeInput = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    color: string;
    employeeType: string;
};

export enum FormMode {
    CREATE = "create",
    EDIT = "edit",
    READONLY = "readonly",
}

export interface EmployeeFieldDirty {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    phone: boolean;
    color: boolean;
    employeeType: boolean;
}

export interface EmployeeFormProps {
    selectedEmployee?: any | null;
    handleCloseDrawer: () => void;
    refetchEmployees: () => void;
    isSuccess: boolean;
    setMessage: (message: string) => void;
    errorMessage: string | null;
    setErrorMessage: (message: string) => void;
    formMode: FormMode;
    setFormMode: (mode: FormMode) => void;
}

export type EmployeeType = {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    color: string;
    phone: string;
    email: string;
    employeeType: string;
};

export interface DeleteEmployeeQueryProps {
    employeeId: number;
    setErrorMessage: (message: string) => void;
    setMessage: (message: string) => void;
    setLoading: (loading: boolean) => void;
    setDeletedEmployee: (employee: EmployeeType) => void;
    refetchEmployees: () => void;
}

export interface ServiceQueryProps {
    serviceId: number;
    data: Service;
    setErrorMessage: (message: string) => void;
    setMessage: (message: string) => void;
    setLoading: (loading: boolean) => void;
    refetchServices: () => void;
}

export interface ServiceFieldDirty {
    categoryId: boolean;
    name: boolean;
    price: boolean;
}

export type Service = {
    category: string;
    name: string;
    price: number;
};

export interface DeleteServiceQueryProps {
    serviceId: number;
    setErrorMessage: (message: string) => void;
    setMessage: (message: string) => void;
    setLoading: (loading: boolean) => void;
    setDeletedService: (service: any) => void;
    refetchServices: () => void;
}

export type ServiceInput = {
    category: string;
    name: string;
    price: number;
    categoryId: number;
};

export type ServiceDetail = {
    id: number;
    category: string;
    name: string;
    price: number;
    categoryId: number;
};

export interface ServiceFormProps {
    selectedService: any | null;
    handleCloseDrawer: () => void;
    refetchServices: () => void;
    isSuccess: boolean;
    setMessage: (message: string) => void;
    errorMessage: string | null;
    setErrorMessage: (message: string) => void;
    formMode: FormMode;
    setFormMode: (mode: FormMode) => void;
}

export type CategoryType = {
    id: number;
    name: string;
};

type CategoryInput = {
    name: string;
};

export interface CategoryQueryProps {
    categoryId?: number;
    data?: CategoryInput;
    setErrorMessage: (message: string) => void;
    setMessage: (message: string) => void;
    setLoading: (loading: boolean) => void;
    setDeletedCategory?: (category: CategoryType) => void;
    refetchCategories: () => void;
}

export interface CategoryFormProps {
    selectedCategory: any | null;
    handleCloseDrawer: () => void;
    refetchCategories: () => void;
    isSuccess: boolean;
    setMessage: (message: string) => void;
    errorMessage: string | null;
    setErrorMessage: (message: string) => void;
    formMode: FormMode;
    setFormMode: (mode: FormMode) => void;
}

export type CategoryFieldDirty = {
    name: boolean;
};
