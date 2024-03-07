import * as ExcelJS from 'exceljs';
import {saveAs} from 'file-saver';
import imageToBase64 from 'image-to-base64/browser';
import {message} from 'antd';
import {obtenerExtensionImagen} from "./obtenerExtencionImagen";
import moment from 'moment';
import {GetMesTexto} from "./index";

export const inventarioConcentracion = async (cols, data, nombre = 'archivo-excel', titulo = '', subtitulo = '', path = null, tipo = "") => {
  try {
    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet(titulo);

    if (path !== null && typeof path === 'string') {
      const img64 = await imageToBase64(path);
      const idImagen = workbook.addImage({
        base64: img64,
        extension: obtenerExtensionImagen(path),  // * jpg, gif, png
      });
      worksheet.addImage(idImagen, {  // * Aquí se acomoda la imagen
        tl: {col: 0.2, row: 0.2}, // * midpoints
        ext: {width: 258, height: 98},
      });
    }

    const header = cols?.map(c => (c.title));

    worksheet.columns = cols

    const styleTitle = { // * estilo para el título
      font: {
        bold: true,
        size: 18,
      },
      alignment: {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true
      },
    };
    const styleSub = { // * estilo para el título
      font: {
        bold: true,
        size: 12,
      },
      alignment: {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true
      },
    };
    const rowHeaderStyle = { // * estilo para el título
      font: {
        bold: true,
        size: 8,
        color: {argb: 'FFFFFFFF'}
      },
      alignment: {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true
      },
      fill: {
        type: "pattern",
        pattern: "solid",
        bgColor: {argb: 'FFFFFFFF'},
        fgColor: {argb: '00736C'}
      }
    };
    const border = { //estilo de borde
      top: {style: 'thin'},
      left: {style: 'thin'},
      bottom: {style: 'thin'},
      right: {style: 'thin'}
    }


    worksheet.mergeCells('A1:D5');  // * combinar celdas  (lugar imagen)

    const row1 = worksheet.getRow("2");
    row1.height = 18;
    const row2 = worksheet.getRow("3");
    row2.height = 23.25;
    const row3 = worksheet.getRow("4");
    row3.height = 16.5;

    // * Despues de mergeCells se debe aplicar estilos y valores
    worksheet.mergeCells('E3:K3')
    worksheet.getCell('E3').value = titulo; // * valor de la celda que se combinará
    worksheet.getCell('E3').style = styleTitle; // * estilo de la celda que se combinará

    // * Despues de mergeCells se debe aplicar estilos y valores
    worksheet.mergeCells('E4:K4')
    worksheet.getCell('E4').value = subtitulo; // * valor de la celda que se combinará
    worksheet.getCell('E4').style = styleSub; // * estilo de la celda que se combinará

    worksheet.addRow([]);
    worksheet.addRow(header);

    worksheet.mergeCells('A6:A7');
    worksheet.getCell('A6').value = 'Consecutivo';
    worksheet.getCell('A6').style = rowHeaderStyle;
    worksheet.getCell('A6').border = border;
    worksheet.getCell('A7').border = border;

    worksheet.mergeCells('B6:B7');
    worksheet.getCell('B6').value = 'Clasificación Archivística';
    worksheet.getCell('B6').style = rowHeaderStyle;
    worksheet.getCell('B6').border = border;
    worksheet.getCell('B7').border = border;

    worksheet.mergeCells('C6:C7');
    worksheet.getCell('C6').value = 'Núm. de Expediente por Serie';
    worksheet.getCell('C6').style = rowHeaderStyle;
    worksheet.getCell('C6').border = border;
    worksheet.getCell('C7').border = border;

    worksheet.mergeCells('D6:D7');
    worksheet.getCell('D6').value = 'Legajos';
    worksheet.getCell('D6').style = rowHeaderStyle;
    worksheet.getCell('D6').border = border;
    worksheet.getCell('D7').border = border;

    worksheet.mergeCells('E6:E7');
    worksheet.getCell('E6').value = 'Fojas';
    worksheet.getCell('E6').style = rowHeaderStyle;
    worksheet.getCell('E6').border = border;
    worksheet.getCell('E7').border = border;

    worksheet.mergeCells('F6:F7');
    worksheet.getCell('F6').value = 'Título y Descripción del Expediente/Asunto';
    worksheet.getCell('F6').style = rowHeaderStyle;
    worksheet.getCell('F6').border = border;
    worksheet.getCell('F7').border = border;

    worksheet.mergeCells('G6:H6');
    worksheet.getCell('G6').value = 'Período';
    worksheet.getCell('G6').style = rowHeaderStyle;
    worksheet.getCell('G6').border = border;
    worksheet.getCell('H6').border = border;

    worksheet.getCell('G7').value = 'Apertura';
    worksheet.getCell('G7').style = rowHeaderStyle;
    worksheet.getCell('G7').border = border;

    worksheet.getCell('H7').value = 'Cierre';
    worksheet.getCell('H7').style = rowHeaderStyle;
    worksheet.getCell('H7').border = border;

   worksheet.mergeCells('I6:I7');
    worksheet.getCell('I6').value = 'Valoración Primaria';
    worksheet.getCell('I6').style = rowHeaderStyle;
    worksheet.getCell('I6').border = border;
    worksheet.getCell('I7').border = border;

    worksheet.mergeCells('J6:J7');
    worksheet.getCell('J6').value = 'Valoración Secundaria';
    worksheet.getCell('J6').style = rowHeaderStyle;
    worksheet.getCell('J6').border = border;
    worksheet.getCell('J7').border = border;

    worksheet.mergeCells('K6:L6');
    worksheet.getCell('K6').value = 'Vigencia Documental';
    worksheet.getCell('K6').style = rowHeaderStyle;
    worksheet.getCell('K6').border = border;
    worksheet.getCell('L6').border = border;

    worksheet.getCell('K7').value = 'AT';
    worksheet.getCell('K7').style = rowHeaderStyle;
    worksheet.getCell('K7').border = border;

    worksheet.getCell('L7').value = 'AC';
    worksheet.getCell('L7').style = rowHeaderStyle;
    worksheet.getCell('L7').border = border;

    worksheet.mergeCells('M6:M7');
    worksheet.getCell('M6').value = 'Destino Final';
    worksheet.getCell('M6').style = rowHeaderStyle;
    worksheet.getCell('M6').border = border;
    worksheet.getCell('M7').border = border;


    worksheet.mergeCells('N6:N7');
    worksheet.getCell('N6').value = 'Clasificación de la Información';
    worksheet.getCell('N6').style = rowHeaderStyle;
    worksheet.getCell('N6').border = border;
    worksheet.getCell('N7').border = border;

    worksheet.mergeCells('O6:O7');
    worksheet.getCell('O6').value = 'Archivos';
    worksheet.getCell('O6').style = rowHeaderStyle;
    worksheet.getCell('O6').border = border;
    worksheet.getCell('O7').border = border;

    worksheet.mergeCells('P6:P7');
    worksheet.getCell('P6').value = 'Signatura Topografica';
    worksheet.getCell('P6').style = rowHeaderStyle;
    worksheet.getCell('P6').border = border;
    worksheet.getCell('P7').border = border;

    worksheet.mergeCells('Q6:Q7');
    worksheet.getCell('Q6').value = 'Soporte';
    worksheet.getCell('Q6').style = rowHeaderStyle;
    worksheet.getCell('Q6').border = border;
    worksheet.getCell('Q7').border = border;

    if(tipo === 'concentracion') {

      worksheet.mergeCells('R6:R7');
      worksheet.getCell('R6').value = 'Cotejo';
      worksheet.getCell('R6').style = rowHeaderStyle;
      worksheet.getCell('R6').border = border;
      worksheet.getCell('R7').border = border;

      worksheet.mergeCells('S6:S7');
      worksheet.getCell('S6').value = 'Caja';
      worksheet.getCell('S6').style = rowHeaderStyle;
      worksheet.getCell('S6').border = border;
      worksheet.getCell('S7').border = border;

      worksheet.mergeCells('T6:T7');
      worksheet.getCell('T6').value = 'Observaciones';
      worksheet.getCell('T6').style = rowHeaderStyle;
      worksheet.getCell('T6').border = border;
      worksheet.getCell('T7').border = border;

    }
    worksheet.mergeCells('M5:V5');
    worksheet.getCell('M5').value = `Hermosillo, Sonora, a ${moment().format("DD")} de ${GetMesTexto(moment().format("MM"))} del año ${moment().format("YYYY")}`;


    for (let i = 0; i < data?.length; i++) { // * agregar datos (contenido)
      const row = data[i];
      worksheet.addRow(row);
    }

    worksheet.columns.forEach((column) =>{
      var dataMax = 2;
      column.eachCell({ includeEmpty: true }, (cell) =>{
        var columnLength = cell.value?.length;
        if (columnLength > dataMax) {
          dataMax = columnLength;
        }
      })
      column.width = dataMax;
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      saveAs(blob, `${nombre}.xlsx`);
    });

  } catch (error) {
    console.log(error);
    message.error('Ocurrió un Error al Importar a Excel');
  }
}
