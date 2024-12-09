import * as pdfjs from 'pdfjs-dist';

// needs to edit so it can parse through multiple pages
export const extractText = async (url: string, pages: number) => {
  const pdf = await pdfjs.getDocument(url).promise;

  const contentText = await (await pdf.getPage(pages)).getTextContent();

  let text: String = '';

  const pageText = contentText.items
    .map((text) => {
      if ('str' in text) {
        return text.str;
      }
    })
    .join('');

  text += pageText + '\n';

  console.log(text);

  return text.trim();
};
