export default function weatherIcon(iconCode, zone) {
    if (iconCode >= 200 && iconCode < 300) {
        return "🌩️";
    }
    else if (iconCode >= 300 && iconCode < 400) {
        if (zone.includes("d")) {
            return "🌦️";
        }
        else {
            return "☔";
        }
    }
    else if (iconCode >= 500 && iconCode < 600) {
        return "🌧️";
    }
    else if (iconCode >= 600 && iconCode < 700) {
        return "❄️";
    }
    else if (iconCode >= 700 && iconCode < 800) {
        return "🌫️";
    }
    else if (iconCode === 800) {
        if (zone.includes("d")) {
            return "☀️";
        }
        else {
            return "🌕";
        }
    }
    else if (iconCode > 800 && iconCode < 900) {
        return "☁️"
    }
    else {
        return "❓";
    }
}