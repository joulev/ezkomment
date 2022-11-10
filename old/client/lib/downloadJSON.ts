export default function downloadJSON(obj: any, fileName: string) {
    const link = document.createElement("a");
    link.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj))}`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
