import React from "react";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
const MemberPage = () => {
    return (
        <div style={{ margin: '89px 120px' }}>
            <h1 style={{ textAlign: 'center', fontSize: '30px' }}>Thông tin thành viên</h1>
            <p style={{ fontSize: '15px' }}>Trong quá trình học tập, nổ lực và cố gắng hoàn thành đúng tiến độ, thì nay đề tài Niên luận đã dần được hoàn thiện với những chức năng và yêu cầu cần thiết. Cảm ơn sự giúp đỡ từ cô Võ Huỳnh Trâm đã góp phần vào sự thành công chung của nhóm chúng em. Cảm ơn các bạn học chung, các cộng tác đã giúp đỡ nhóm chúng em hoàn thành tốt đề tài này.</p>
            <p style={{ fontSize: '15px' }}>Dưới đây là tổng quan về trang web của chúng tôi:</p>
            <h3 style={{ fontSize: '20px' }}>1. Mục tiêu dự án</h3>

            <p style={{ fontSize: '15px' }}>- Xây dựng một trang web thương mại điện tử chuyên về bán các thiết bị văn phòng từ nhiều thương hiệu uy tín trên thị trường. Mục tiêu của dự án là tạo ra một trải nghiệm mua sắm trực tuyến thuận tiện và đáng tin cậy cho người dùng, cung cấp đa dạng các lựa chọn sản phẩm, với chất lượng và giá cả tốt.</p>
            <h3 style={{ fontSize: '20px' }}>2. Công nghệ sử dụng </h3>
            <ul>
                <li>Frontend: sử dụng ReactJs để tạo giao diện, sử dụng các thư viện như ant design </li>
                <li>Backend: Sử dụng Node.js và Express.js để xử lý logic backend, xây dựng API và quản lý tương tác với cơ sở dữ liệu.</li>
                <li>Database: sử dụng MongoDB để quản lý sản phẩm, lưu trữ giao dịch</li>
                <li>Palpal cho developers: để thực hiện chức năng thanh toán cho trang web</li>
            </ul>
            <h3 style={{ fontSize: '20px' }}>Thành viên nhóm</h3>
            <ul>
                <li>Âu Minh Thông - B2012264 - Trưởng nhóm</li>
                <li>Trần Ngọc Thơ -B2012266 - Thành viên</li>
                <li>Trần Hữu Lộc - B2012226 - Thành viên</li>
            </ul>
            <FooterComponent />
        </div>

    )
}
export default MemberPage