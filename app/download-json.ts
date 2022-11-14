import "client-only";

export default function downloadJSON(obj: any, baseFileName: string) {
    const now = new Date();
    now.setMilliseconds(0);
    const date = now.toISOString().replace(".000Z", "Z").replace(/:/g, ".");
    const actualFileName = `${baseFileName}-${date}.json`;
    const link = document.createElement("a");
    link.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj))}`;
    link.setAttribute("download", actualFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
