import jsPDF from "jspdf";

export function exportDia(htmlRootId: string, exportFileName: string) {
    const paperContainer = document.querySelector<HTMLElement>(
        `#${htmlRootId} .dia-paper-root`
    );
    const htmlContainer = document.querySelector<HTMLElement>(
        `#${htmlRootId} .dia-html-container`
    )
    const svg = paperContainer?.querySelector<SVGGraphicsElement>(`svg`);

    // console.log(`#${htmlRootId} .joint-paper`, svg, paperContainer)

    if (svg == null || paperContainer == null || htmlContainer == null) return;

    const width = paperContainer.offsetWidth;
    const height = paperContainer.offsetHeight;

    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svg);
    svgString = svgString.replace('width="100%"', `width="${width}px"`);
    svgString = svgString.replace('height="100%"', `height="${height}px"`);
    // console.log(svgString);

    // create blob from svg string
    let blob = new Blob([svgString], {type: "image/svg+xml"});
    let url = URL.createObjectURL(blob);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (ctx == null) return;

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [width, height],
    });

    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);

        const png = canvas.toDataURL("image/png");
        // console.log(png);
        doc.addImage(png, "PNG", 0, 0, width, height);
        // console.log(htmlContainer)
        doc.html(
            htmlContainer,
            {
                x: 0,
                y: 0,
                callback(doc) {
                    doc.save(exportFileName);
                },
            }
        );
    };
    img.src = url;

    // await doc.addSvgAsImage(svgString, 0, 0, width, height);
    // doc.save("class-diagram.pdf");
}
