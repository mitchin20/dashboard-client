import { onCLS, onFCP, onLCP, Metric } from "web-vitals";

type WebVitalsHandler = (metric: Metric) => void;

const reportWebVitals = (onPerfEntry?: WebVitalsHandler) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        onCLS(onPerfEntry);
        onFCP(onPerfEntry);
        onLCP(onPerfEntry);
    }
};

export default reportWebVitals;
