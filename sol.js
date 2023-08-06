
function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    const positions = plainTextPositions.map(({ start, end }) => [start, end]);
  
    for (let i = positions.length - 1; i >= 0; i--) {
      const [start, end] = positions[i];
      const prefix = htmlContent.substring(0, start);
      const highlightedText = `<mark>${htmlContent.substring(start, end)}</mark>`;
      const suffix = htmlContent.substring(end);
      htmlContent = prefix + highlightedText + suffix;
    }
  
    return htmlContent;
  }
  
  describe("highlightHTMLContent", () => {
    it("should highlight the specified positions in the HTML content", () => {
      const htmlContent = '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million...</span></p>';
      const plainText = "Closes $520 Million";
      const plainTextPositions = [{ start: 29, end: 47 }];
      const expectedOutput =
        '<p><span>Hi David<br><br>Headline: Energix <mark>Closes $520 Million</mark>...</span></p>';
      expect(highlightHTMLContent(htmlContent, plainText, plainTextPositions)).toBe(expectedOutput);
    });
  
    it("should handle multiple positions to highlight in the HTML content", () => {
      const htmlContent = '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million...</span></p>';
      const plainText = "Energix Closes $520 Million";
      const plainTextPositions = [{ start: 13, end: 37 }, { start: 42, end: 47 }];
      const expectedOutput =
        '<p><span>Hi David<br><br>Headline: <mark>Energix Closes $520 Million</mark>...</span></p>';
      expect(highlightHTMLContent(htmlContent, plainText, plainTextPositions)).toBe(expectedOutput);
    });
  
    it("should handle overlapping positions in the HTML content", () => {
      const htmlContent = '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million...</span></p>';
      const plainText = "Energix Closes $520 Million";
      const plainTextPositions = [{ start: 13, end: 37 }, { start: 32, end: 47 }];
      const expectedOutput =
        '<p><span>Hi David<br><br>Headline: <mark>Energix Closes $520 Million</mark>...</span></p>';
      expect(highlightHTMLContent(htmlContent, plainText, plainTextPositions)).toBe(expectedOutput);
    });
  });
  