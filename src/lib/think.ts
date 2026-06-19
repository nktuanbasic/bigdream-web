export type ThinkArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Essay" | "Practice" | "AI Workflow" | "Materials" | "Light";
  date: string;
  readTime: string;
  views: string;
  cover: string;
  tags: string[];
  dek: string;
  body: string[];
  checklist: string[];
};

export const THINK_CATEGORIES = [
  "All",
  "Essay",
  "Practice",
  "AI Workflow",
  "Materials",
  "Light",
] as const;

export const thinkArticles: ThinkArticle[] = [
  {
    slug: "anh-sang-khong-phai-den",
    title: "Ánh sáng không phải đèn",
    excerpt:
      "Một không gian luxury thường bắt đầu từ cách ánh sáng chạm vào vật liệu, không phải từ số lượng đèn trên trần.",
    category: "Light",
    date: "19.06.2026",
    readTime: "8 phút đọc",
    views: "1.8K",
    cover: "/projects/C%C4%83n%20H%E1%BB%99%20Landmark/Ph%C3%B2ng%20%C4%82n/C_DR_04.jpg",
    tags: ["lighting", "luxury", "interior", "mood"],
    dek:
      "Nếu ánh sáng được đặt sau cùng, căn phòng thường chỉ sáng hơn. Nếu ánh sáng được nghĩ từ đầu, căn phòng bắt đầu có nhịp.",
    body: [
      "Trong một căn phòng ăn, chiếc bàn không tự nhiên trở nên đắt giá vì nó dùng đá tốt hơn. Nó thay đổi khi mặt đá nhận một vệt sáng nghiêng, đủ mỏng để nhìn thấy vân, đủ mềm để không biến bề mặt thành một tấm gương lạnh. Phần còn lại của phòng có thể tối hơn một chút. Chính khoảng tối đó làm vệt sáng có trọng lượng.",
      "Hiểu sai phổ biến là xem ánh sáng như một lớp kỹ thuật thêm vào sau khi nội thất đã xong. Khi đó bản vẽ đèn chỉ còn nhiệm vụ xóa bóng, lấp góc tối, làm mọi thứ nhìn rõ. Nhưng một không gian tốt không cần mọi thứ rõ như nhau. Nó cần có điểm nhìn, có thứ lùi lại, có thứ được giữ trong im lặng.",
      "Ánh sáng luxury hiếm khi ồn. Nó không khoe bằng số lượng spotlight, cũng không cố làm vật liệu lấp lánh ở mọi góc. Nó thường đi qua những quyết định nhỏ: mép trần hắt nhẹ vào rèm, một khe sáng rửa tường đá, ánh vàng thấp ở chân tủ, hoặc một vùng tối được giữ lại phía sau sofa để tiền cảnh có chiều sâu.",
      "Câu hỏi đúng không phải là phòng này cần bao nhiêu lumen. Câu hỏi đúng hơn là người bước vào sẽ nhìn thấy gì đầu tiên, mắt họ được dẫn sang đâu, và vật liệu nào xứng đáng nhận ánh sáng trực tiếp. Một mảng gỗ óc chó, một mặt đá travertine, một lớp vải thô đều phản ứng khác nhau. Đặt cùng một nguồn sáng lên chúng là bỏ qua tính cách của từng vật liệu.",
      "Khi ánh sáng được thiết kế như một phần của bố cục, căn phòng có thể ít đồ hơn mà vẫn đầy. Một bức tường trống không còn trống nếu có gradient sáng đi qua nó. Một hành lang hẹp không còn nghèo nếu cuối hành lang có một điểm sáng kéo người đi tới. Luxury đôi khi nằm ở việc không bật thêm đèn.",
    ],
    checklist: [
      "Chọn 1-2 vật liệu chính xứng đáng được nhận sáng trực tiếp.",
      "Giữ lại vùng tối có chủ ý để tạo chiều sâu.",
      "Tránh rải spotlight đều như lưới kỹ thuật.",
      "Kiểm tra màu ánh sáng trên từng vật liệu thật, không chỉ trên render.",
    ],
  },
  {
    slug: "khoang-trong-co-trong-luong",
    title: "Khoảng trống có trọng lượng",
    excerpt:
      "Không gian âm không phải phần còn dư. Nó là thứ quyết định món đồ nào được phép lên tiếng.",
    category: "Essay",
    date: "16.06.2026",
    readTime: "6 phút đọc",
    views: "964",
    cover: "/projects/C%C4%83n%20H%E1%BB%99%20Nassim%20Th%E1%BA%A3o%20%C4%90i%E1%BB%81n/Ph%C3%B2ng%20Kh%C3%A1ch%20B%E1%BA%BFp/16%20NO%20LOGO.jpg",
    tags: ["negative-space", "composition", "luxury"],
    dek:
      "Một căn phòng có thể đắt tiền nhưng vẫn mệt mắt nếu mọi bề mặt đều muốn chứng minh mình quan trọng.",
    body: [
      "Có những căn phòng bước vào là thấy ngay chủ nhà đã mua nhiều thứ tốt. Ghế tốt, đá tốt, đèn tốt, tranh tốt. Nhưng mắt không có chỗ nghỉ. Mỗi bề mặt đều được xử lý, mỗi góc đều có một món đồ, mỗi khoảng tường đều bị lấp bằng một ý tưởng.",
      "Khoảng trống thường bị hiểu là phần chưa làm. Trong thực tế, nó là một quyết định thiết kế khó hơn việc thêm đồ. Bỏ một bức tranh khỏi tường, để một mặt đá chạy dài không chia ô, hoặc giữ một mảng sàn sạch quanh bàn trà đều là những cách làm cho vật thể còn lại có trọng lượng hơn.",
      "Trong modern luxury, khoảng trống không đồng nghĩa với tối giản lạnh. Nó là nhịp thở. Một chiếc sofa lớn cần không gian quanh nó để hình khối được đọc rõ. Một mảng gỗ tối cần bề mặt sáng kế bên để không trở thành khối nặng. Một món decor nhỏ chỉ đáng nhìn khi nó không bị đặt cạnh mười món khác cùng đòi chú ý.",
      "Điều khó là khoảng trống dễ bị nghi ngờ. Khách hàng có thể nhìn vào một góc sạch và hỏi: ở đây thiếu gì? Người thiết kế cần đủ bình tĩnh để trả lời rằng không thiếu. Nó đang giữ nhịp cho phần còn lại.",
      "Một không gian có nghề thường không cố lấp đầy mọi ô trong ảnh. Nó biết ảnh render đẹp không chỉ nhờ vật liệu, mà nhờ khoảng cách giữa các vật liệu. Chính những đoạn im lặng đó làm căn phòng có giọng.",
    ],
    checklist: [
      "Xóa bớt một lớp decor trước khi thêm lớp mới.",
      "Giữ ít nhất một mảng tường hoặc sàn không bị chia nhỏ.",
      "Đặt câu hỏi: món này làm rõ ý chính hay chỉ làm ảnh đầy hơn?",
      "Chụp thử góc nhìn chính ở trạng thái ít đồ hơn.",
    ],
  },
  {
    slug: "prompt-tot-bat-dau-tu-rang-buoc",
    title: "Prompt tốt bắt đầu từ ràng buộc",
    excerpt:
      "Trong AI architecture, prompt mạnh không phải prompt nhiều tính từ. Nó là prompt biết giữ lại điều không được phá.",
    category: "AI Workflow",
    date: "12.06.2026",
    readTime: "7 phút đọc",
    views: "1.2K",
    cover: "/projects/C%C4%83n%20H%E1%BB%99%20Landmark/Ph%C3%B2ng%20Kh%C3%A1ch/C_LR_08.jpg",
    tags: ["prompt", "ai", "workflow", "architecture"],
    dek:
      "Một mô hình AI có thể tạo ra nhiều thứ đẹp. Nhưng trong công việc thật, cái khó là làm nó không phá những thứ cần giữ.",
    body: [
      "Một prompt yếu thường bắt đầu bằng chuỗi tính từ: luxurious, elegant, cinematic, high-end, photorealistic. Nó nghe có vẻ đúng, nhưng quá rộng. AI có thể trả về một căn phòng đẹp theo cách hoàn toàn khác với mặt bằng, vật liệu, tỷ lệ hoặc tinh thần ban đầu.",
      "Trong thiết kế nội thất, yêu cầu quan trọng nhất nhiều khi là ràng buộc. Giữ nguyên vị trí cửa. Không thay đổi chiều cao trần. Chỉ thay vật liệu tường sau sofa. Giữ ánh sáng tự nhiên từ bên trái. Không thêm đồ decor che mất lối đi. Những câu này ít hào nhoáng hơn, nhưng chúng làm prompt có kỷ luật.",
      "Prompt tốt nên mô tả ba lớp: thứ phải giữ, thứ được phép thay đổi, và tiêu chuẩn đánh giá kết quả. Nếu thiếu lớp đầu tiên, AI sẽ sáng tạo quá tay. Nếu thiếu lớp thứ hai, nó bị khóa cứng. Nếu thiếu lớp thứ ba, kết quả có thể đẹp nhưng không dùng được.",
      "Một workflow nghiêm túc không xem prompt là câu thần chú. Nó xem prompt là bản brief. Brief đó cần có vật liệu, ánh sáng, camera, công năng, vùng cấm, và cả negative prompt. Đặc biệt với các tác vụ như FILL hoặc STAGE, câu 'do not alter architecture geometry' đôi khi quan trọng hơn mọi mô tả phong cách.",
      "Khi prompt được viết bằng ràng buộc rõ, AI không còn là người trang trí ngẫu hứng. Nó trở thành một cộng sự biết phạm vi. Và trong nghề thiết kế, biết phạm vi là điều làm một ý tưởng sống được ngoài màn hình.",
    ],
    checklist: [
      "Viết trước phần Must keep trước khi mô tả style.",
      "Tách rõ Allowed changes và Forbidden changes.",
      "Thêm camera, ánh sáng và vật liệu bằng quan sát cụ thể.",
      "Đọc lại prompt như một brief gửi cho người thật.",
    ],
  },
  {
    slug: "vat-lieu-moc-can-anh-sang-mem",
    title: "Vật liệu mộc cần ánh sáng mềm",
    excerpt:
      "Gỗ, đá thô và vải dệt không cần được làm bóng hơn. Chúng cần ánh sáng đủ mềm để giữ lại cảm giác chạm.",
    category: "Materials",
    date: "08.06.2026",
    readTime: "5 phút đọc",
    views: "711",
    cover: "/projects/Nh%C3%A0%20L%C3%B4%20Ph%E1%BB%91%20B%C3%ACnh%20D%C6%B0%C6%A1ng%20-%20T%C3%A2n%20Uy%C3%AAn/Ph%C3%B2ng%20Ng%E1%BB%A7%20Master/MS_09.jpg",
    tags: ["materials", "wood", "stone", "wabi-sabi"],
    dek:
      "Một bề mặt mộc bị chiếu sai sẽ mất đi thứ khiến nó đáng chọn ngay từ đầu.",
    body: [
      "Gỗ mộc đẹp vì nó không hoàn hảo tuyệt đối. Đá tự nhiên đẹp vì vân của nó có đoạn gắt, đoạn đứt, đoạn mờ. Vải dệt đẹp vì bề mặt không phẳng như nhựa. Những thứ này cần ánh sáng cho phép mắt đọc được texture.",
      "Khi ánh sáng quá gắt, vật liệu mộc dễ bị biến thành một mảng tương phản cứng. Vân gỗ bị cháy, mặt đá mất chiều sâu, vải nhìn khô và rẻ. Khi ánh sáng quá đều, mọi thứ lại phẳng. Cả hai đều làm vật liệu mất cảm giác chạm.",
      "Ánh sáng mềm không có nghĩa là yếu. Nó là ánh sáng có chuyển tiếp. Một vệt sáng đi từ mạnh sang nhẹ trên mặt đá cho phép người xem cảm nhận độ nhám. Một nguồn sáng hắt qua rèm làm gỗ ấm lên mà không cần tăng saturation. Một bóng đổ nhẹ dưới mép tủ làm khối tủ đứng trong không gian thật hơn.",
      "Vì vậy, chọn vật liệu mộc mà không nghĩ về ánh sáng là mới làm nửa việc. Bảng vật liệu nên được xem dưới nguồn sáng gần với thực tế thi công. Render cũng nên kiểm tra ở những vùng chuyển sắc, không chỉ ở góc hero đẹp nhất.",
    ],
    checklist: [
      "Test mẫu vật liệu dưới ánh sáng ấm và trung tính.",
      "Tránh spotlight trực tiếp lên bề mặt đá quá bóng.",
      "Ưu tiên ánh sáng hắt hoặc khuếch tán cho vải và gỗ.",
      "Giữ bóng đổ nhẹ để vật liệu có chiều sâu.",
    ],
  },
];

export function getThinkArticle(slug: string) {
  return thinkArticles.find((article) => article.slug === slug);
}

export function getFeaturedArticle() {
  return thinkArticles[0];
}
