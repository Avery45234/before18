// Vietnamese and Chinese for the content, plus Spanish for the how-to steps, kept
// in one file so a translator can work here without touching the rules. These
// are first drafts and need a native speaker's review; the About page says so.
// Anything not translated falls back to English and the app labels it.

export const BENEFIT_TR: Record<string, { name?: { vi: string; zh: string }; summary?: { vi: string; zh: string }; howTo?: string[] }> = {
  "bill-of-rights": {
    name: { vi: "Tuyên ngôn Quyền của Thanh thiếu niên Nuôi dưỡng", zh: "寄养青少年权利法案" },
    summary: {
      vi: "Khi ở trong hệ thống chăm sóc, bạn có các quyền hợp pháp: một mái nhà an toàn, liên lạc với gia đình và anh chị em, gọi điện và nhận thư riêng tư, chăm sóc y tế và sức khỏe tâm thần, đồ đạc của riêng bạn, luật sư của bạn và một phiên tòa.",
      zh: "在寄养期间你享有法定权利：安全的住所、与家人和兄弟姐妹联系、私人电话和信件、医疗和心理健康服务、自己的物品、你的律师和法庭听证。",
    },
    howTo: ["Pide a tu trabajador social o abogado la lista por escrito (están obligados a dártela).", "Si ignoran un derecho, llama al Ombudsperson de Cuidado Adoptivo de California: 1-877-846-1602."],
  },
  "rights-in-writing": {
    name: { vi: "Quyền của bạn bằng văn bản, và tiếng nói trong kế hoạch", zh: "书面权利，以及在你的计划中发言的权利" },
    summary: {
      vi: "Từ 14 tuổi, kế hoạch hồ sơ của bạn phải có danh sách bằng văn bản về quyền của bạn (giáo dục, sức khỏe, thăm nom, tòa án), và bạn được tham gia viết kế hoạch và chọn hai người vào nhóm của mình.",
      zh: "从14岁起，你的个案计划必须包含一份书面权利清单（教育、健康、探视、法庭），你可以参与制定计划，并挑选两个人加入你的团队。",
    },
    howTo: ["En tu próxima reunión del plan de caso, pide ver el documento de derechos y firma que lo recibiste.", "Puedes nombrar a dos adultos (que no sean tu trabajador social ni tu padre de crianza) para tu equipo de planificación."],
  },
  "credit-report": {
    name: { vi: "Báo cáo tín dụng miễn phí mỗi năm (và giúp sửa lỗi)", zh: "每年免费信用报告（并协助纠错）" },
    summary: {
      vi: "Từ 14 tuổi đến khi rời hệ thống, cơ quan phải lấy báo cáo tín dụng của bạn mỗi năm và giúp sửa mọi sai sót. Trộm danh tính nhắm vào thanh thiếu niên nuôi dưỡng rất phổ biến; việc này phát hiện sớm.",
      zh: "从14岁到离开寄养系统，机构必须每年调取你的信用报告并帮你纠正错误。针对寄养青少年的身份盗用很常见；这能及早发现。",
    },
    howTo: ["Pregúntale a tu trabajador social: '¿Ya sacaron mi informe de crédito este año? ¿Puedo verlo?'", "Cualquier cosa que no reconozcas es un problema que hay que arreglar antes de solicitar un departamento."],
  },
  "school-of-origin": {
    name: { vi: "Ở lại trường khi bạn chuyển chỗ ở", zh: "搬家时留在原来的学校" },
    summary: {
      vi: "Nếu việc đổi chỗ ở buộc bạn phải chuyển đi, bạn có quyền ở lại trường hiện tại, được đưa đón, và nhập học ngay tại trường mới mà không cần hồ sơ hay giấy tờ.",
      zh: "如果安置变动会让你搬家，你有权留在现在的学校、获得交通接送，并在新学校立即入学，无需成绩单或文件。",
    },
    howTo: ["Cada distrito escolar tiene un enlace de jóvenes en cuidado adoptivo. Pregunta en la oficina principal quién es.", "Di las palabras 'school of origin' (escuela de origen): es un término legal y el personal sabrá a qué te refieres."],
  },
  ilp: {
    name: { vi: "Chương trình Sống Độc lập (ILP)", zh: "独立生活计划（ILP）" },
    summary: {
      vi: "Từ 16 đến 21 tuổi, ILP của quận cung cấp lớp học, kế hoạch chuyển tiếp, trợ giúp về nhà ở, việc làm, đơn xin đại học, và đôi khi tiền cho những thứ như laptop, tiền đặt cọc hoặc bằng lái xe.",
      zh: "从16岁到21岁，县ILP提供课程、过渡计划、住房、就业和大学申请方面的帮助，有时还提供购买笔记本电脑、押金或驾照的资金。",
    },
    howTo: ["Pide a tu trabajador social el coordinador del ILP de tu condado, o busca la lista en la página del ILP del CDSS.", "Pregunta qué puede pagar el ILP. Cada condado es un poco diferente."],
  },
  "transition-plan": {
    name: { vi: "Buổi họp kế hoạch chuyển tiếp của bạn", zh: "你的过渡计划会议" },
    summary: {
      vi: "Trong 90 ngày trước khi bạn tròn 18 (hoặc trước khi rời chăm sóc mở rộng), cơ quan phải ngồi lại với bạn và viết một kế hoạch thực sự: nhà ở, bảo hiểm y tế, giáo dục, việc làm, người cố vấn, và cách bạn nhận giấy tờ.",
      zh: "在你满18岁前的90天内（或离开延长寄养之前），机构必须与你坐下来制定一份真正的计划：住房、医保、教育、工作、导师，以及如何拿到你的证件。",
    },
    howTo: ["Si tienes 17 y nadie ha programado esto, pide a tu trabajador social y a tu abogado que lo organicen.", "Lleva la lista de Documentos de esta app a la reunión."],
  },
  "exit-documents": {
    name: { vi: "Rời hệ thống với giấy tờ trong tay", zh: "带着你的证件离开寄养系统" },
    summary: {
      vi: "Khi bạn rời hệ thống ở tuổi 18 trở lên sau ít nhất 6 tháng, cơ quan phải giao cho bạn: bản sao chính thức giấy khai sinh, thẻ An sinh Xã hội, thông tin bảo hiểm y tế, bản sao hồ sơ y tế, và thẻ căn cước tiểu bang hoặc bằng lái xe.",
      zh: "当你在18岁或之后、在寄养系统至少6个月后离开时，机构必须交给你：出生证明的正式副本、社会安全卡、医保信息、病历副本，以及州身份证或驾照。",
    },
    howTo: ["Usa la lista de Documentos de esta app. No firmes tu salida hasta tenerlos en la mano.", "¿Te falta algo? Pregunta a tu coordinador del ILP: el condado muchas veces puede pagar las cuotas."],
  },
  efc: {
    name: { vi: "Chăm sóc Nuôi dưỡng Mở rộng đến 21 tuổi (AB 12)", zh: "延长寄养至21岁（AB 12）" },
    summary: {
      vi: "Bạn có thể ở lại hệ thống đến 21 tuổi với chỗ ở và hỗ trợ hàng tháng - kể cả sống tự lập theo diện Giám sát Sống Độc lập (SILP) với khoảng $1,301 mỗi tháng trả cho bạn. Bạn chỉ cần làm một trong năm việc: học trung học, học đại học hoặc học nghề, làm việc 80+ giờ mỗi tháng, tham gia chương trình giúp tìm việc, hoặc không thể làm vì lý do sức khỏe.",
      zh: "你可以在寄养系统中待到21岁，享有安置和每月补助——包括以\"受监督独立生活安置\"（SILP）自己居住，每月约1,301美元直接付给你。你只需满足五项之一：在读高中、在读大学或职业培训、每月工作80小时以上、参加就业帮助计划，或因健康状况无法做到。",
    },
    howTo: ["Antes de tu cumpleaños 18, dile a tu trabajador social y a tu abogado: 'Quiero quedarme en el cuidado extendido.'", "Pregunta por un SILP si quieres tu propio lugar. El pago mensual te llega a ti.", "Si te vas y cambias de opinión, puedes volver en cualquier momento antes de los 21 (ver Reingreso)."],
  },
  "efc-reentry": {
    name: { vi: "Quay lại chăm sóc mở rộng bất kỳ lúc nào trước 21 tuổi", zh: "21岁前随时可重新进入延长寄养" },
    summary: {
      vi: "Rời đi ở tuổi 18 và mọi thứ không ổn? Bạn có thể quay lại. Ký Thỏa thuận Tái nhập Tự nguyện (SOC 163) với quận, đáp ứng một trong năm điều kiện, và chỗ ở cùng hỗ trợ hàng tháng của bạn được khôi phục.",
      zh: "18岁离开后不顺利？你可以回来。与县签署自愿重新进入协议（SOC 163），满足五项条件之一，你的安置和每月补助就会恢复。",
    },
    howTo: ["Llama a la oficina de bienestar infantil de tu antiguo condado (o al Ombudsperson si no localizas a nadie) y di que quieres reingresar bajo AB 12.", "No necesitas dar una razón ni explicar por qué te fuiste."],
  },
  "medi-cal-26": {
    name: { vi: "Medi-Cal miễn phí đến 26 tuổi", zh: "免费Medi-Cal至26岁" },
    summary: {
      vi: "Nếu bạn ở trong hệ thống chăm sóc nuôi dưỡng vào ngày sinh nhật 18 tuổi - ở bất kỳ tiểu bang nào - và sống ở California, bạn được Medi-Cal đầy đủ, miễn phí đến 26 tuổi. Không giới hạn thu nhập. Không cần chứng minh; bạn tự khai.",
      zh: "如果你在18岁生日当天在寄养系统中（任何州），并且住在加州，你可以获得完整、免费的Medi-Cal直到26岁。没有收入限制。无需证明曾在寄养系统，可自行声明。",
    },
    howTo: ["Si vas a salir del sistema, pide que tu Medi-Cal pase al programa de ex jóvenes en cuidado adoptivo antes de irte.", "Si se venció: llena el formulario MC 250A (Medi-Cal para ex jóvenes en cuidado adoptivo) en cualquier oficina del condado, o solicita en benefitscal.com y marca la casilla de ex joven en cuidado adoptivo."],
  },
  "fafsa-independent": {
    name: { vi: "FAFSA: bạn được tính là độc lập", zh: "FAFSA：你算作独立学生" },
    summary: {
      vi: "Nếu bạn từng ở trong hệ thống chăm sóc nuôi dưỡng bất kỳ lúc nào từ 13 tuổi, FAFSA không hỏi thu nhập hay chữ ký của phụ huynh. Điều đó thường có nghĩa là Trợ cấp Pell tối đa (đến $7,395 mỗi năm) cộng thêm hỗ trợ của tiểu bang. Hãy nộp - nó mở khóa gần như mọi thứ khác trong danh sách này.",
      zh: "如果你自13岁起任何时候在寄养系统中，FAFSA不会要求父母的收入或签名。这通常意味着最高额的Pell助学金（每年最多7,395美元）加上州补助。一定要填——它解锁本清单上几乎所有其他项目。",
    },
    howTo: ["Ve a studentaid.gov, crea un FSA ID y responde 'sí' a la pregunta sobre haber estado en cuidado adoptivo desde los 13.", "¿Sin número de Seguro Social? Usa la California Dream Act Application (CADAA) en csac.ca.gov.", "Pide a tu coordinador del ILP o al programa de jóvenes en cuidado adoptivo de un colegio que te acompañe mientras la llenas."],
  },
  "chafee-grant": {
    name: { vi: "Trợ cấp Chafee: đến $5,000 mỗi năm cho việc học", zh: "Chafee助学金：每年最多5,000美元" },
    summary: {
      vi: "Tiền miễn phí cho đại học hoặc đào tạo nghề, ngoài các hỗ trợ khác, tối đa năm năm - miễn là bạn dưới 26 tuổi vào ngày 1 tháng 7 của năm học. Năm 2025-26 mức trợ cấp là $4,500. Bạn đủ điều kiện nếu từng ở trong hệ thống nuôi dưỡng bất kỳ lúc nào từ 16 đến 18 tuổi.",
      zh: "用于大学或职业培训的免费资金，可叠加其他补助，最多五年——只要你在学年7月1日时未满26岁。2025-26学年金额为4,500美元。如果你在16到18岁之间任何时候在寄养系统中，即符合条件。",
    },
    howTo: ["Solicita una sola vez en chafee.csac.ca.gov. No solicites dos veces: retrasa el proceso.", "Solicita temprano en el año. El dinero se acaba porque es por orden de llegada."],
  },
  nextup: {
    name: { vi: "NextUp tại bất kỳ trường cao đẳng cộng đồng California nào", zh: "加州任何社区大学的NextUp项目" },
    summary: {
      vi: "Một chương trình dành riêng cho sinh viên từng trong hệ thống nuôi dưỡng: cố vấn hiểu hệ thống, ưu tiên đăng ký, hỗ trợ sách vở, thực phẩm, đi lại và tiền khẩn cấp. Bạn đủ điều kiện nếu từng ở trong hệ thống bất kỳ lúc nào sau 13 tuổi và từ 26 tuổi trở xuống khi tham gia lần đầu.",
      zh: "专为有寄养经历的学生设立的项目：了解系统的辅导员、优先选课、书本、食物、交通和紧急资金的帮助。如果你13岁后任何时候在寄养系统中，且首次加入时不超过26岁，即符合条件。",
    },
    howTo: ["Busca '[nombre del colegio] NextUp' o pregunta en la oficina de ayuda financiera por el programa de jóvenes en cuidado adoptivo.", "Inscríbete antes de tu primer semestre para que la inscripción prioritaria aplique."],
  },
  "priority-reg": {
    name: { vi: "Ưu tiên đăng ký lớp học (AB 194)", zh: "优先选课（AB 194）" },
    summary: {
      vi: "Tại các trường cao đẳng cộng đồng California và các trường CSU, thanh thiếu niên đang và từng trong hệ thống nuôi dưỡng đến 24 tuổi được đăng ký lớp trước mọi người, để bạn thực sự lấy được các lớp cần thiết để tốt nghiệp.",
      zh: "在加州社区大学和CSU校园，现在和曾经在寄养系统中的青少年（至24岁）可以先于其他人选课，这样你才能真正选到毕业所需的课程。",
    },
    howTo: ["Dile a la oficina de admisiones o de jóvenes en cuidado adoptivo que eres ex joven en cuidado adoptivo. Puede que necesites una carta de tu trabajador social o del ILP."],
  },
  "thp-plus": {
    name: { vi: "Nhà ở THP-Plus, từ 18 đến 25 tuổi", zh: "THP-Plus住房，18至25岁" },
    summary: {
      vi: "Nhà ở chuyển tiếp kèm dịch vụ hỗ trợ cho thanh niên từng trong hệ thống nuôi dưỡng từ 18 đến 25 tuổi, tối đa 36 tháng. Nếu chăm sóc mở rộng kết thúc hoặc không phải là lựa chọn, đây là cánh cửa tiếp theo để gõ.",
      zh: "为18至25岁曾在寄养系统的青年提供的过渡住房和支持服务，最长36个月。如果延长寄养结束或不可选，这是下一扇可以敲的门。",
    },
    howTo: ["Pregunta a tu coordinador del ILP qué proveedores de THP-Plus atienden tu condado y si hay lista de espera.", "Solicita antes de que termine el cuidado extendido, no después."],
  },
  calfresh: {
    name: { vi: "CalFresh (tiền thực phẩm)", zh: "CalFresh（食品补助）" },
    summary: {
      vi: "Tiền hàng tháng mua thực phẩm. Thanh niên trong chăm sóc mở rộng hoặc các chương trình đại học dành cho thanh thiếu niên nuôi dưỡng thường được miễn các quy định sinh viên chặn người khác. Lưu ý: một luật liên bang tháng 7/2025 đã bỏ miễn trừ quy định làm việc tự động mà thanh niên từng nuôi dưỡng dưới 25 tuổi từng có, nên hãy hỏi quận điều gì áp dụng với bạn bây giờ.",
      zh: "每月的食品补助金。处于延长寄养或寄养青少年大学项目中的年轻人通常可豁免阻碍其他学生的学生规则。注意：2025年7月的一项联邦法律取消了25岁以下前寄养青年原有的自动工作规则豁免，请向你所在的县询问现在适用的规定。",
    },
    howTo: ["Solicita en getcalfresh.org (toma unos 10 minutos).", "Si eres estudiante, diles que estás en cuidado extendido / NextUp / Guardian Scholars: eso puede eximirte de la regla de estudiante."],
  },
};

export const RIGHTS_TR: { vi: string; zh: string }[] = [
  { vi: "Sống trong một mái nhà an toàn, lành mạnh, thoải mái, nơi bạn được tôn trọng.", zh: "生活在安全、健康、舒适、受到尊重的家中。" },
  { vi: "Không bị lạm dụng thể chất, tình dục hoặc tinh thần, không bị trừng phạt thân thể và bóc lột.", zh: "免受身体、性或情感虐待、体罚和剥削。" },
  { vi: "Có đủ thức ăn lành mạnh và quần áo, và tiền tiêu vặt nếu bạn sống trong cơ sở tập thể.", zh: "获得足够的健康食物和衣物；如果住在集体环境中，还有零用钱。" },
  { vi: "Được chăm sóc y tế, nha khoa, mắt và sức khỏe tâm thần - và không bị cho dùng thuốc trừ khi bác sĩ cho phép.", zh: "获得医疗、牙科、视力和心理健康服务——未经医生许可不得被给药。" },
  { vi: "Liên lạc với gia đình, anh chị em, nhân viên xã hội, luật sư, CASA và người bênh vực thanh thiếu niên nuôi dưỡng - và thăm anh chị em riêng tư trừ khi tòa quyết định khác.", zh: "与家人、兄弟姐妹、社工、律师、CASA和寄养青少年倡导者联系——除非法院另有规定，可与兄弟姐妹私下探视。" },
  { vi: "Thực hiện và nhận cuộc gọi, tin nhắn riêng tư, và gửi, nhận thư chưa bị mở.", zh: "拨打和接听私人电话及电子信息，收发未拆封的邮件。" },
  { vi: "Có bạn bè, huấn luyện viên, giáo viên, người cố vấn và cuộc sống bên ngoài hệ thống chăm sóc nuôi dưỡng.", zh: "拥有朋友、教练、老师、导师，以及寄养系统之外的生活。" },
  { vi: "Ở lại trường khi chỗ ở thay đổi, có đưa đón, và nhập học ngay tại trường mới mà không cần hồ sơ.", zh: "安置变动时留在原学校并获得交通接送，并可在无需档案的情况下立即在新学校入学。" },
  { vi: "Từ 14 tuổi: danh sách quyền bằng văn bản và tiếng nói thực sự trong kế hoạch hồ sơ, kể cả hai người lớn bạn chọn cho nhóm của mình.", zh: "从14岁起：书面权利清单，以及在个案计划中真正的发言权，包括你为团队挑选的两名成年人。" },
  { vi: "Một buổi họp kế hoạch chuyển tiếp trong 90 ngày trước khi bạn tròn 18 hoặc rời chăm sóc mở rộng - nhà ở, bảo hiểm y tế, trường học, việc làm, người cố vấn.", zh: "在你满18岁或离开延长寄养前90天内的过渡计划会议——住房、医保、学校、工作、导师。" },
  { vi: "Khi rời hệ thống ở tuổi 18+, được nhận giấy khai sinh, thẻ An sinh Xã hội, thông tin bảo hiểm y tế, hồ sơ y tế, và thẻ căn cước hoặc bằng lái tiểu bang.", zh: "在18岁或之后离开时，领取你的出生证明、社会安全卡、医保信息、病历，以及州身份证或驾照。" },
  { vi: "Ở lại chăm sóc mở rộng đến 21 tuổi, và quay lại bất kỳ lúc nào trước 21 tuổi nếu bạn rời đi.", zh: "留在延长寄养直到21岁，离开后可在21岁前随时返回。" },
];

export const DOC_TR: Record<string, { name: { vi: string; zh: string }; why: { vi: string; zh: string } }> = {
  "birth-certificate": { name: { vi: "Giấy khai sinh có chứng nhận", zh: "经认证的出生证明" }, why: { vi: "Cần cho thẻ căn cước tiểu bang, hộ chiếu, thẻ An sinh Xã hội và hầu hết công việc.", zh: "办理州身份证、护照、社会安全卡以及大多数工作都需要。" } },
  "ssn-card": { name: { vi: "Thẻ An sinh Xã hội", zh: "社会安全卡" }, why: { vi: "Cần cho mọi công việc, hỗ trợ tài chính và phúc lợi.", zh: "每份工作、助学金和福利都需要。" } },
  "state-id": { name: { vi: "Thẻ căn cước California hoặc bằng lái xe", zh: "加州身份证或驾照" }, why: { vi: "Cần để mở tài khoản ngân hàng, ký hợp đồng thuê, bắt đầu công việc hoặc lên máy bay.", zh: "开银行账户、签租约、入职或登机都需要。" } },
  "health-insurance": { name: { vi: "Thông tin bảo hiểm y tế (thẻ Medi-Cal)", zh: "医保信息（Medi-Cal卡）" }, why: { vi: "Medi-Cal của bạn nên tiếp tục đến 26 tuổi. Giữ thẻ và số hồ sơ quận.", zh: "你的Medi-Cal应持续到26岁。保存好卡和县个案号。" } },
  "medical-records": { name: { vi: "Bản sao hồ sơ y tế và tiêm chủng", zh: "病历和免疫记录副本" }, why: { vi: "Trường đại học, nơi làm việc và bác sĩ mới sẽ hỏi. Hồ sơ tiêm chủng rất khó dựng lại sau này.", zh: "大学、雇主和新医生都会要。免疫记录以后很难重建。" } },
  "school-records": { name: { vi: "Bảng điểm và IEP (nếu có)", zh: "成绩单和IEP（如有）" }, why: { vi: "Cần cho đại học, hỗ trợ tài chính và chương trình đào tạo nghề.", zh: "大学、助学金和职业培训项目都需要。" } },
  "court-orders": { name: { vi: "Giấy tờ tòa án chứng minh bạn từng trong hệ thống nuôi dưỡng", zh: "证明你曾在寄养系统的法庭文件" }, why: { vi: "Chứng minh tình trạng nuôi dưỡng mở khóa Chafee, NextUp, ưu tiên đăng ký và câu hỏi FAFSA. Lệnh tòa dependency hoặc thư 'ward of the court' đều được.", zh: "寄养身份证明可解锁Chafee、NextUp、优先选课和FAFSA问题。抚养法庭令或\"法院监护\"信函均可。" } },
  "credit-report": { name: { vi: "Báo cáo tín dụng mới nhất của bạn", zh: "你最新的信用报告" }, why: { vi: "Chủ nhà sẽ kiểm tra. Trộm danh tính nhắm vào thanh thiếu niên nuôi dưỡng rất phổ biến và bạn nên phát hiện trước họ.", zh: "房东会查。针对寄养青少年的身份盗用很常见，最好你先发现。" } },
};

export const HELP_TR: Record<string, { vi: string; zh: string }> = {
  "988": { vi: "Nếu bạn nghĩ đến việc làm hại bản thân, hoặc tối nay bạn không chịu nổi nữa. Gọi hoặc nhắn tin.", zh: "如果你想伤害自己，或者今晚撑不下去了。打电话或发短信。" },
  runaway: { vi: "Tối nay không có chỗ ngủ, hoặc đang nghĩ đến việc bỏ đi. Họ có thể tìm giường ở nơi trú ẩn và vé xe buýt về nhà.", zh: "今晚没地方睡，或者在考虑离开。他们能找到庇护所床位和回家的车票。" },
  ombudsperson: { vi: "Một quyền bị phớt lờ, không ai gọi lại cho bạn, hoặc bạn muốn quay lại hệ thống mà không liên lạc được với quận. Họ sẽ điều tra.", zh: "权利被忽视、没人回你电话，或者你想重新进入寄养却联系不上县。他们会调查。" },
  "211": { vi: "Thực phẩm, nơi trú ẩn, tiện ích, đi lại, mọi thứ ở địa phương. Nói với họ bạn từng trong hệ thống nuôi dưỡng.", zh: "食物、庇护所、水电、交通，任何本地事务。告诉他们你曾在寄养系统。" },
  ilp: { vi: "Người có nhiệm vụ giúp bạn chuyển tiếp: nhà ở, tiền đặt cọc, đơn xin đại học, giấy tờ. Quận nào cũng có một người.", zh: "专门帮你过渡的人：住房、押金、大学申请、证件。每个县都有一位。" },
  jbay: { vi: "Hướng dẫn về THP-Plus, chăm sóc mở rộng, CalFresh và đại học cho thanh thiếu niên nuôi dưỡng.", zh: "关于THP-Plus、延长寄养、CalFresh和寄养青少年上大学的指南。" },
  cyc: { vi: "Do thanh thiếu niên đang và từng trong hệ thống nuôi dưỡng điều hành. Chi hội khắp tiểu bang; những người đã trải qua.", zh: "由现在和曾经的寄养青少年运营。全州设有分会；都是过来人。" },
  ifoster: { vi: "Điện thoại, laptop miễn phí và chương trình việc làm cho thanh thiếu niên nuôi dưỡng tuổi chuyển tiếp.", zh: "为过渡年龄寄养青少年提供免费手机、笔记本电脑和就业项目。" },
};
