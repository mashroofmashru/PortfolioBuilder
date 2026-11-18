const compact = new Intl.NumberFormat('en-US', { notation: 'compact' });

// 12345 -> "12K"
export const formatCount = (n) => compact.format(n ?? 0);

// ISO string -> "Nov 17, 2026"
export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
