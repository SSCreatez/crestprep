/**
 * glossary.js: words that trip up students who are still learning English.
 * Each row: [word, plain-English meaning, Español, हिन्दी, 中文, Tiếng Việt]
 *
 * The language helper scans the current question for these words and shows
 * their meaning + translation. Ask a native speaker to review translations
 * before launch, and add a row whenever a new question uses a hard word.
 */
const ROWS = [
  ['coefficient', 'the number in front of a variable (in 5x, it is 5)', 'coeficiente', 'गुणांक', '系数', 'hệ số'],
  ['constant', 'a number that does not change', 'constante', 'अचर', '常数', 'hằng số'],
  ['expression', 'numbers and variables combined, with no equals sign', 'expresión', 'व्यंजक', '表达式', 'biểu thức'],
  ['equation', 'a math sentence with an equals sign', 'ecuación', 'समीकरण', '方程', 'phương trình'],
  ['function', 'a rule that gives exactly one output for each input', 'función', 'फलन', '函数', 'hàm số'],
  ['xy-plane', 'the grid made by the x-axis and the y-axis', 'plano xy', 'xy-तल', 'xy 坐标平面', 'mặt phẳng tọa độ xy'],
  ['y-intercept', 'the point where a line crosses the y-axis', 'intersección con el eje y', 'y-अंतःखंड', 'y 轴截距', 'tung độ gốc'],
  ['slope', 'how steep a line is: rise divided by run', 'pendiente', 'ढलान', '斜率', 'hệ số góc'],
  ['vertex', 'the turning point of a parabola', 'vértice', 'शीर्ष', '顶点', 'đỉnh'],
  ['minimum', 'the smallest value', 'mínimo', 'न्यूनतम मान', '最小值', 'giá trị nhỏ nhất'],
  ['data set', 'a group of numbers or facts', 'conjunto de datos', 'आँकड़ों का समूह', '数据集', 'tập dữ liệu'],
  ['mean', 'the average: add the values, then divide by how many there are', 'media', 'माध्य', '平均数', 'trung bình cộng'],
  ['median', 'the middle value when the data is in order', 'mediana', 'माध्यिका', '中位数', 'trung vị'],
  ['right triangle', 'a triangle with one 90° angle', 'triángulo rectángulo', 'समकोण त्रिभुज', '直角三角形', 'tam giác vuông'],
  ['radius', "the distance from a circle's center to its edge", 'radio', 'त्रिज्या', '半径', 'bán kính'],
  ['real solution', 'a real number that makes the equation true', 'solución real', 'वास्तविक हल', '实数解', 'nghiệm thực'],
  ['positive', 'greater than zero', 'positivo', 'धनात्मक', '正的', 'dương'],
  ['closest to', 'the answer is an estimate; pick the nearest choice', 'más cercano a', 'के सबसे निकट', '最接近', 'gần nhất với'],
  ['colony', 'a group of living things that live together', 'colonia', 'कॉलोनी (समूह)', '群落', 'quần thể'],
  ['conventions', 'the rules of grammar and punctuation', 'normas', 'नियम', '规范', 'quy tắc'],
  ['donated', 'given for free to help others', 'donado', 'दान किया गया', '捐赠的', 'được quyên góp'],
  ['firm', 'a business or company', 'empresa', 'फ़र्म (कंपनी)', '公司', 'công ty'],
  ['transition', 'a word that links two ideas, like "however"', 'conector', 'संयोजक शब्द', '过渡词', 'từ nối'],
  ['mass production', 'making huge numbers of the same product in factories', 'producción en masa', 'बड़े पैमाने पर उत्पादन', '大规模生产', 'sản xuất hàng loạt'],
  ['marine biologist', 'a scientist who studies ocean life', 'biólogo marino', 'समुद्री जीवविज्ञानी', '海洋生物学家', 'nhà sinh vật học biển'],
  ['conservation', 'protecting nature from harm or waste', 'conservación', 'संरक्षण', '保护', 'bảo tồn'],
  ['receptor', 'a part of a cell that senses something, like light', 'receptor', 'ग्राही', '感受器', 'thụ thể'],
  ['colorblind', 'unable to see some or all colors', 'daltónico', 'वर्णांध', '色盲的', 'mù màu'],
  ['precise', 'exact and correct', 'preciso', 'सटीक', '精确的', 'chính xác'],
  ['evenhanded', 'fair to all sides', 'imparcial', 'निष्पक्ष', '公正的', 'công bằng'],
  ['partisan', 'strongly favoring one side', 'partidista', 'पक्षपाती', '偏袒一方的', 'thiên vị'],
  ['exaggerated', 'made to seem bigger or more important than it is', 'exagerado', 'बढ़ा-चढ़ाकर कहा गया', '夸大的', 'phóng đại'],
  ['stagnation', 'a time with no growth or progress', 'estancamiento', 'ठहराव', '停滞', 'sự trì trệ'],
  ['manuscript', 'a book or document written by hand', 'manuscrito', 'पांडुलिपि', '手稿', 'bản thảo viết tay'],
  ['monastic', 'related to monks and monasteries', 'monástico', 'मठ-संबंधी', '修道院的', 'thuộc về tu viện'],
  ['inquiry', 'asking questions and investigating', 'investigación', 'जाँच-पड़ताल', '探究', 'sự tìm tòi'],
  ['debut', 'a first work or first appearance', 'debut (primera obra)', 'पहली कृति', '处女作', 'tác phẩm đầu tay'],
  ['dismissed', 'rejected as not important', 'descartado', 'ख़ारिज किया गया', '被否定', 'bị gạt bỏ'],
  ['derivative', 'copied from other work; not original', 'poco original', 'नकल पर आधारित', '缺乏原创性的', 'thiếu tính nguyên bản'],
  ['inadvertent', 'not done on purpose; accidental', 'involuntario', 'अनजाने में हुआ', '无意的', 'vô tình'],
  ['arbitrary', 'chosen at random, without a reason', 'arbitrario', 'मनमाना', '随意的', 'tùy tiện'],
  ['calculated', 'done on purpose, after careful thought', 'deliberado', 'सोच-समझकर किया गया', '精心策划的', 'có tính toán'],
  ['superficial', 'only on the surface; not deep', 'superficial', 'सतही', '肤浅的', 'hời hợt'],
  ['native', 'growing or living naturally in a place', 'nativo', 'देशी', '本地的', 'bản địa'],
  ['diversity', 'variety; many different kinds', 'diversidad', 'विविधता', '多样性', 'sự đa dạng'],
  ['abundance', 'a large amount or number', 'abundancia', 'प्रचुरता', '大量', 'sự dồi dào'],
  ['conclusion', 'an idea that the evidence supports', 'conclusión', 'निष्कर्ष', '结论', 'kết luận'],
  ['borrower', 'a person who takes something and will give it back', 'persona que pide prestado', 'उधार लेने वाला', '借用者', 'người mượn'],
  ['evidence', 'facts that show something is true', 'evidencia', 'प्रमाण', '证据', 'bằng chứng'],
  ['independent clause', 'words with a subject and a verb that can stand alone as a sentence', 'oración independiente', 'स्वतंत्र उपवाक्य', '独立分句', 'mệnh đề độc lập'],
];

export const GLOSSARY = ROWS.map(([word, def, es, hi, zh, vi]) => ({ word, def, es, hi, zh, vi }));

/** Find every glossary word that appears in a piece of text (plurals count too). */
export function findTerms(text) {
  const plain = String(text).replace(/<[^>]+>/g, ' ');
  return GLOSSARY.filter(({ word }) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}s?\\b`, 'i').test(plain);
  });
}
