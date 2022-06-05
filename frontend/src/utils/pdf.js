import { jsPDF } from "jspdf"

const generateQWithAnsPdf = async (question, answers) => {
  const doc = new jsPDF("p", "pt", "a4");
  await doc.html(document.querySelector("#q-with-ans-pdf"));
  // window.open(doc.output('bloburl'))     // For testing the pdf output
  doc.save(`question_${question.title}.pdf`);

}

export default generateQWithAnsPdf;