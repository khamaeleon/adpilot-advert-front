import React, { cloneElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server'
export async function exportToCsv(
  gridElement,  fileName
) {
  const { head, body, foot } = await getGridContent(gridElement);
  const content = [...head, ...body, ...foot]
    .map((cells) => cells.map(serialiseCellValue).join(','))
    .join('\n');

  downloadFile(fileName, new Blob([content], { type: 'text/csv;charset=utf-8;' }));
}

export async function exportToXlsx(
  gridElement,
  fileName
) {
  const [{ utils, writeFile }, { head, body }] = await Promise.all([
    import('xlsx'),
    getGridContent(gridElement)
  ]);
  // const wb = utils.book_new();
  // const ws = utils.aoa_to_sheet([...head, ...body]);
  // utils.book_append_sheet(wb, ws, 'Sheet 1');
  // writeFile(wb, fileName);
}

export async function exportToPdf(
  gridElement,
  fileName
) {
  const [{ jsPDF }, autoTable, { head, body, foot }] = await Promise.all([
    import('jspdf'),
    (await import('jspdf-autotable')).default,
    await getGridContent(gridElement)
  ]);
  const doc = new jsPDF({
    orientation: 'l',
    unit: 'px'
  });

  autoTable(doc, {
    head,
    body,
    foot,
    horizontalPageBreak: true,
    styles: { cellPadding: 1.5, fontSize: 8, cellWidth: 'wrap' },
    tableWidth: 'wrap'
  });
  doc.save(fileName);
}

async function getGridContent(gridElement) {
  const grid = document.createElement('div');
  grid.innerHTML = renderToStaticMarkup(
    cloneElement(gridElement, {
      enableVirtualization: true
    })
  );

  return {
    head: getHeaders('.InovuaReactDataGrid__header'),
    body: getRows('.InovuaReactDataGrid__row')
  };

  function getHeaders(selector) {
    return Array.from(grid.querySelectorAll(selector)).map((gridRow) => {
      return Array.from(gridRow.querySelectorAll('.InovuaReactDataGrid__column-header__content')).map(
        (gridCell) => gridCell.innerText
      );
    });
  }

  function getRows(selector) {
    return Array.from(grid.querySelectorAll(selector)).map((gridRow) => {
      return Array.from(gridRow.querySelectorAll('.InovuaReactDataGrid__cell__content')).map(
        (gridCell) => gridCell.innerText
      );
    });
  }
}

function serialiseCellValue(value) {
  if (typeof value === 'string') {
    const formattedValue = value.replace(/"/g, '""');
    return formattedValue.includes(',') ? `"${formattedValue}"` : formattedValue;
  }
  return value;
}

function downloadFile(fileName, data) {
  const downloadLink = document.createElement('a');
  downloadLink.download = fileName;
  const url = URL.createObjectURL(data);
  downloadLink.href = url;
  downloadLink.click();
  URL.revokeObjectURL(url);
}