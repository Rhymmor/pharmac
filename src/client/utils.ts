interface ISaveFileProps {
    data: Buffer | string;
    type: string;
    fileName: string;
}

export function saveFile({data, type, fileName}: ISaveFileProps) {
    const blob = new Blob([data], { type });
    const csvURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', fileName);
    tempLink.click();
}