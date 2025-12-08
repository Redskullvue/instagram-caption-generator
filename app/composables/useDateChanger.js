export function useDateChanger(date) {
  const formatDate = (date, options = {}) => {
    const defaultOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      calendar: "persian",
    };

    const mergedOptions = { ...defaultOptions, ...options };
    const newDate = new Date(date);
    const faDate = newDate.toLocaleDateString("fa-IR", mergedOptions);

    return faDate;
  };

  const timeAgo = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "امروز";
    if (diffDays === 1) return "دیروز";
    if (diffDays < 7) return `${diffDays} روز پیش`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} هفته پیش`;

    return formatDate(date);
  };

  return {
    formatDate,
    timeAgo,
  };
}
