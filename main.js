const formulario =
    document.getElementById("miFormulario");

formulario.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

        const departamento =
            document.getElementById("departamento").value;

        const estadoCivil =
            document.getElementById("estadoCivil").value;

        await generarPDF(
            departamento,
            estadoCivil
        );

        descargarExcel();
    }
);

async function generarPDF(
    departamento,
    estadoCivil
) {

    const existente =
        await fetch(
            "plantillas/FormatosBCP.pdf"
        );

    const arrayBuffer =
        await existente.arrayBuffer();

    const pdfDoc =
        await PDFLib.PDFDocument.load(
            arrayBuffer
        );

    const pagina =
        pdfDoc.getPages()[0];



    pagina.drawText(
        departamento,
        {
            x: 52,
            y: 684,
            size: 11
        }
    );

    pagina.drawText(
        estadoCivil,
        {
            x: 485,
            y: 628,
            size: 11
        }
    );

    const bytes =
        await pdfDoc.save();

    const blob =
        new Blob(
            [bytes],
            {
                type:"application/pdf"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;
    a.download = "FormatosBCP.pdf";

    a.click();

    URL.revokeObjectURL(url);
}

function descargarExcel(){

    const a =
        document.createElement("a");

    a.href =
        "plantillas/FormatoSIGA.xlsx";

    a.download =
        "FormatoSIGA.xlsx";

    a.click();
}