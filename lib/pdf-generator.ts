import PDFDocument from "pdfkit"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

export async function generatePDFReport(reportType: string, data: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // إنشاء وثيقة PDF جديدة مع دعم اللغة العربية
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        info: {
          Title: `${reportType} Report`,
          Author: "Blood Bank Management System",
        },
      })

      // إضافة دعم اللغة العربية
      doc.font("data/fonts/Cairo-Regular.ttf")

      // الحاويات لتخزين بيانات PDF
      const buffers: Buffer[] = []
      doc.on("data", buffers.push.bind(buffers))
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers)
        resolve(pdfData)
      })

      // إضافة الشعار والعنوان
      doc.fontSize(25).text("نظام إدارة بنك الدم", { align: "center" })
      doc.moveDown()
      doc.fontSize(18).text(`تقرير ${getReportTitle(reportType)}`, { align: "center" })
      doc.moveDown()

      // إضافة التاريخ
      const currentDate = format(new Date(), "dd MMMM yyyy, HH:mm", { locale: ar })
      doc.fontSize(12).text(`تاريخ التقرير: ${currentDate}`, { align: "right" })
      doc.moveDown(2)

      // إضافة محتوى التقرير حسب النوع
      switch (reportType) {
        case "donor":
          generateDonorReport(doc, data)
          break
        case "donations":
          generateDonationsReport(doc, data)
          break
        case "inventory":
          generateInventoryReport(doc, data)
          break
        case "patients":
          generatePatientsReport(doc, data)
          break
      }

      // إنهاء الوثيقة
      doc.end()
    } catch (error) {
      console.error("Error generating PDF:", error)
      reject(error)
    }
  })
}

function getReportTitle(reportType: string): string {
  switch (reportType) {
    case "donor":
      return "بيانات المتبرع"
    case "donations":
      return "التبرعات"
    case "inventory":
      return "المخزون"
    case "patients":
      return "المرضى"
    default:
      return reportType
  }
}

function generateDonorReport(doc: any, donor: any) {
  // إضافة معلومات المتبرع
  doc.fontSize(16).text("معلومات المتبرع", { align: "right" })
  doc.moveDown()

  const donorInfo = [
    { label: "الاسم", value: donor.name },
    { label: "البريد الإلكتروني", value: donor.email },
    { label: "رقم الهاتف", value: donor.phone },
    { label: "فصيلة الدم", value: donor.bloodType },
    { label: "تاريخ الميلاد", value: format(new Date(donor.dateOfBirth), "dd/MM/yyyy") },
    { label: "الجنس", value: donor.gender === "male" ? "ذكر" : "أنثى" },
    { label: "الوزن", value: `${donor.weight} كجم` },
    { label: "العنوان", value: donor.address },
  ]

  donorInfo.forEach((info) => {
    doc.fontSize(12).text(`${info.label}: ${info.value}`, { align: "right" })
    doc.moveDown(0.5)
  })

  // إضافة رمز QR إذا كان متاحًا
  if (donor.qrCode) {
    doc.moveDown()
    doc.fontSize(14).text("رمز QR", { align: "center" })
    doc.moveDown()

    // تحويل base64 إلى صورة
    const qrImage = donor.qrCode.replace(/^data:image\/png;base64,/, "")
    doc.image(Buffer.from(qrImage, "base64"), {
      fit: [200, 200],
      align: "center",
    })
  }
}

function generateDonationsReport(doc: any, data: any) {
  const { donations, startDate, endDate } = data

  // إضافة معلومات الفترة الزمنية
  doc
    .fontSize(14)
    .text(`الفترة من ${format(new Date(startDate), "dd/MM/yyyy")} إلى ${format(new Date(endDate), "dd/MM/yyyy")}`, {
      align: "right",
    })
  doc.moveDown(2)

  // إضافة جدول التبرعات
  doc.fontSize(14).text(`عدد التبرعات: ${donations.length}`, { align: "right" })
  doc.moveDown()

  // إنشاء جدول للتبرعات
  const tableTop = doc.y
  const tableLeft = 50
  const tableWidth = 500
  const rowHeight = 30
  const colWidths = [150, 100, 100, 150]

  // رسم رأس الجدول
  doc.fontSize(12)
  doc.rect(tableLeft, tableTop, tableWidth, rowHeight).stroke()
  let currentX = tableLeft
  ;["المتبرع", "فصيلة الدم", "الكمية", "التاريخ"].forEach((header, i) => {
    doc.text(header, currentX + 5, tableTop + 10, { width: colWidths[i], align: "right" })
    currentX += colWidths[i]
  })

  // رسم صفوف الجدول
  let currentY = tableTop + rowHeight
  donations.forEach((donation: any) => {
    doc.rect(tableLeft, currentY, tableWidth, rowHeight).stroke()

    currentX = tableLeft
    ;[
      donation.donorId.name || "-",
      donation.bloodType,
      `${donation.quantity} مل`,
      format(new Date(donation.date), "dd/MM/yyyy"),
    ].forEach((cell, i) => {
      doc.text(cell, currentX + 5, currentY + 10, { width: colWidths[i], align: "right" })
      currentX += colWidths[i]
    })

    currentY += rowHeight

    // إذا كانت الصفحة ستنتهي، نقوم بإضافة صفحة جديدة
    if (currentY > doc.page.height - 100) {
      doc.addPage()
      currentY = 50 // بداية الصفحة الجديدة
    }
  })
}

function generateInventoryReport(doc: any, data: any) {
  const { inventory } = data

  // إضافة جدول المخزون
  doc.fontSize(14).text(`إجمالي فصائل الدم: ${inventory.length}`, { align: "right" })
  doc.moveDown()

  // إنشاء جدول للمخزون
  const tableTop = doc.y
  const tableLeft = 50
  const tableWidth = 500
  const rowHeight = 30
  const colWidths = [150, 150, 200]

  // رسم رأس الجدول
  doc.fontSize(12)
  doc.rect(tableLeft, tableTop, tableWidth, rowHeight).stroke()
  let currentX = tableLeft
  ;["فصيلة الدم", "الكمية (وحدة)", "الحالة"].forEach((header, i) => {
    doc.text(header, currentX + 5, tableTop + 10, { width: colWidths[i], align: "right" })
    currentX += colWidths[i]
  })

  // رسم صفوف الجدول
  let currentY = tableTop + rowHeight
  inventory.forEach((item: any) => {
    doc.rect(tableLeft, currentY, tableWidth, rowHeight).stroke()

    const statusMap: Record<string, string> = {
      available: "متوفر",
      low: "منخفض",
      critical: "حرج",
    }

    currentX = tableLeft
    ;[item.bloodType, item.units.toString(), statusMap[item.status] || item.status].forEach((cell, i) => {
      doc.text(cell, currentX + 5, currentY + 10, { width: colWidths[i], align: "right" })
      currentX += colWidths[i]
    })

    currentY += rowHeight
  })

  // إضافة رسم بياني للمخزون
  doc.moveDown(3)
  doc.fontSize(14).text("الرسم البياني للمخزون", { align: "center" })
  doc.moveDown()

  // سنقوم برسم رسم بياني بسيط
  const chartLeft = 100
  const chartBottom = doc.y + 200
  const chartWidth = 400
  const chartHeight = 150

  // رسم محاور الرسم البياني
  doc
    .moveTo(chartLeft, chartBottom)
    .lineTo(chartLeft + chartWidth, chartBottom)
    .stroke() // المحور الأفقي
  doc
    .moveTo(chartLeft, chartBottom)
    .lineTo(chartLeft, chartBottom - chartHeight)
    .stroke() // المحور الرأسي

  // تحديد الحد الأقصى للقيم
  const maxUnits = Math.max(...inventory.map((item: any) => item.units))
  const barWidth = chartWidth / inventory.length

  // رسم الأعمدة
  inventory.forEach((item: any, i: number) => {
    const barHeight = (item.units / maxUnits) * chartHeight
    const x = chartLeft + i * barWidth

    let barColor
    switch (item.status) {
      case "critical":
        barColor = [231, 76, 60] // أحمر
        break
      case "low":
        barColor = [241, 196, 15] // أصفر
        break
      default:
        barColor = [46, 204, 113] // أخضر
    }

    doc.rect(x, chartBottom - barHeight, barWidth - 10, barHeight).fill(barColor)
    doc.fontSize(8).text(item.bloodType, x, chartBottom + 5, { width: barWidth - 10, align: "center" })
    doc
      .fontSize(8)
      .text(item.units.toString(), x, chartBottom - barHeight - 15, { width: barWidth - 10, align: "center" })
  })
}

function generatePatientsReport(doc: any, data: any) {
  const { patients, startDate, endDate } = data

  // إضافة معلومات الفترة الزمنية
  doc
    .fontSize(14)
    .text(`الفترة من ${format(new Date(startDate), "dd/MM/yyyy")} إلى ${format(new Date(endDate), "dd/MM/yyyy")}`, {
      align: "right",
    })
  doc.moveDown(2)

  // إضافة جدول المرضى
  doc.fontSize(14).text(`عدد المرضى: ${patients.length}`, { align: "right" })
  doc.moveDown()

  // إنشاء جدول للمرضى
  const tableTop = doc.y
  const tableLeft = 50
  const tableWidth = 500
  const rowHeight = 30
  const colWidths = [120, 80, 100, 100, 100]

  // رسم رأس الجدول
  doc.fontSize(12)
  doc.rect(tableLeft, tableTop, tableWidth, rowHeight).stroke()
  let currentX = tableLeft
  ;["اسم المريض", "فصيلة الدم", "المستشفى", "الحالة", "تاريخ التسجيل"].forEach((header, i) => {
    doc.text(header, currentX + 5, tableTop + 10, { width: colWidths[i], align: "right" })
    currentX += colWidths[i]
  })

  // رسم صفوف الجدول
  let currentY = tableTop + rowHeight
  patients.forEach((patient: any) => {
    doc.rect(tableLeft, currentY, tableWidth, rowHeight).stroke()

    const statusMap: Record<string, string> = {
      active: "نشط",
      stable: "مستقر",
      critical: "حرج",
    }

    currentX = tableLeft
    ;[
      patient.name,
      patient.bloodType,
      patient.hospital,
      statusMap[patient.status] || patient.status,
      format(new Date(patient.createdAt), "dd/MM/yyyy"),
    ].forEach((cell, i) => {
      doc.text(cell, currentX + 5, currentY + 10, { width: colWidths[i], align: "right" })
      currentX += colWidths[i]
    })

    currentY += rowHeight

    // إذا كانت الصفحة ستنتهي، نقوم بإضافة صفحة جديدة
    if (currentY > doc.page.height - 100) {
      doc.addPage()
      currentY = 50 // بداية الصفحة الجديدة
    }
  })
}
