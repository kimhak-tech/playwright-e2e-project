// ─────────────────────────────────────────────
// Date helper utilities
// Format: DD/MM/YYYY — matches the booking input format
// ─────────────────────────────────────────────

export function formatDate(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}

export function getToday(): string {
    return formatDate(new Date());
}

export function getTomorrow(): string {
    return getFutureDate(1);
}

export function getFutureDate(daysFromToday: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    return formatDate(date);
}