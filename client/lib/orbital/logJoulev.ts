import { ProjectLog } from "~/types/client/utils.type";

export default async function getProjectLogJoulev(): Promise<ProjectLog> {
    try {
        const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
        const sheetId = process.env.JOULEV_PROJECT_LOG_SHEET_ID;
        if (!apiKey || !sheetId) throw new Error("Necessary env not set");

        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Dung?key=${apiKey}`
        );
        if (!response.ok) throw new Error("Failed to fetch sheet");
        const data = await response.json();
        if (!data.values) throw new Error("Failed to parse sheet");

        const [, ...rows] = data.values as string[][];
        const total = parseInt(rows.pop()![2]);
        const logs = rows.map(([time, content, hours, remarks]) => ({
            time,
            content,
            hours,
            remarks,
        }));
        return { total, logs };
    } catch (err: any) {
        console.log(err.message);
        return { total: 0, logs: [] };
    }
}
