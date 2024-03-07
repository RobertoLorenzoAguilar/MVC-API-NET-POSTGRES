import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import imageToBase64 from 'image-to-base64/browser';
import { message } from 'antd';
import {obtenerExtensionImagen} from "./obtenerExtencionImagen";

export const reporteExpediente = async (cols, data, nombre = 'archivo-excel', titulo = '', subtitulo = '', path = null) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(titulo);

    if(path !== null && typeof path === 'string') {
      const img64 = await imageToBase64(path);
      const idImagen = workbook.addImage({
        base64: img64,
        extension: obtenerExtensionImagen(path),  // * jpg, gif, png
      })

      worksheet.addImage(idImagen, {  // * Aquí se acomoda la imagen
        tl: { col: 0.2, row: 0.2 }, // * midpoints
        ext: { width: 208, height: 111 },
      })

    }

    const header = cols?.map(c => (c.title));
    worksheet.columns = cols;

    const styleTitle = {
      font: {
        bold: true,
        size: 18,
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center',
        wrapText: true
      },
    };

    const styleSubTitle = {
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

    const stylesTotales = {
      font: {
        bold: false,
        size: 12,
        color: {argb: '693b7c'}
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
        size: 12,
        color: {argb:'FFFFFFFF'}
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

    worksheet.mergeCells('A1:B6') // Logo
    worksheet.mergeCells('D1:E1') // Titulo
    worksheet.mergeCells('D2:E2')
    worksheet.mergeCells('D3:E3') // Subtitulo
    worksheet.mergeCells('D4:E4')
    worksheet.mergeCells('D5:E5') // Totales

    worksheet.addRow(header)
    for( let i = 0; i < data?.length; i++ ) {
      let row = data[i]
      worksheet.addRow(row)
    }

    worksheet.columns.forEach(( column, index ) => {

      let dataMax = 0;
      column.eachCell({ includeEmpty: true }, (cell, index) => {

        if((index % 2) === 0  && index > 7){
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "E7E7E7" },
          };
        }


        if(index === 7){
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "009688" },
          };
        }

        let columnLength = cell.value?.length;
        if( columnLength > dataMax ) {
          dataMax = columnLength;
        }
      })
      column.width = dataMax < 10 ? 10 : dataMax;
    })


    const colA = worksheet.getColumn("A")
    colA.width = 15
    const colB = worksheet.getColumn("B")
    colB.width = 15
    const colC = worksheet.getColumn("C")
    colC.width = 15

    worksheet.getCell('D1').value = titulo
    worksheet.getCell('D1').style = styleTitle
    worksheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' }

    worksheet.getCell('D3').value = subtitulo
    worksheet.getCell('D3').style = styleSubTitle
    worksheet.getCell('D3').alignment = { vertical: 'middle', horizontal: 'center' }

    worksheet.getCell('D5').value = `Totales: ${data?.length}`
    worksheet.getCell('D5').style = stylesTotales
    worksheet.getCell('D5').alignment = { vertical: 'middle', horizontal: 'center' }


    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${nombre}.xlsx`);
    });

  } catch(error) {
    console.log(error);
    message.error('Ocurrió un Error al Importar a Excel');
  }
}