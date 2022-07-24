import toast from 'react-hot-toast'

const KYC = () => {
  const handleUpload = () => {
    document.getElementById('id-front')?.click()
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    toast.success('Gửi thành công')
  }

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4">
      <div className="flex w-full flex-col gap-4">
        <div className="bg-neutral rounded-lg p-4">
          - Tải lên CMND/CCCD/Passport để chúng tôi xác minh danh tính của bạn
          <br />- Tải lên hình ảnh rõ ràng cho mỗi mục
          <br />- Loại tệp chấp nhận: JPG, JPEG, PNG. Kích thước tối đa 10Mb
        </div>
        <div
          className="fill flex-col lg:flex-row flex gap-4"
          style={{ height: '-webkit-fill-available' }}
        >
          <div className="bg-neutral flex w-full flex-col justify-around rounded-lg p-4">
            <div className="flex flex-col items-center justify-center">
              <p className="mb-3 text-xl font-bold">Mặt trước</p>
              <div className="cursor-pointer" onClick={handleUpload}>
                <img src="/images/id-front.svg" alt="id-front" />
              </div>
              <input id="id-front" type="file" hidden />
            </div>
            <ul className="list-disc pl-4 text-sm">
              <li>Ảnh gốc không chỉnh sửa</li>
              <li>Hình ảnh đầy đủ của mặt trước CMND/CCCD</li>
            </ul>
          </div>
          <div className="bg-neutral flex w-full flex-col justify-around rounded-lg p-4">
            <div className="flex flex-col items-center justify-center">
              <p className="mb-4 text-xl font-bold">Mặt sau</p>
              <div className="cursor-pointer" onClick={handleUpload}>
                <img src="/images/id-back.svg" alt="id-front" />
              </div>
            </div>
            <ul className="list-disc pl-4 text-sm">
              <li>Ảnh gốc không chỉnh sửa</li>
              <li>Hình ảnh đầy đủ của mặt trước CMND/CCCD</li>
            </ul>
          </div>
          <div className="bg-neutral flex w-full flex-col justify-around rounded-lg p-4">
            <div className="flex flex-col items-center justify-center">
              <p className="mb-4 text-xl font-bold">Ảnh selfie</p>
              <div className="cursor-pointer" onClick={handleUpload}>
                <img src="/images/id-selfie.svg" alt="id-front" />
              </div>
            </div>
            <ul className="list-disc pl-4 text-sm">
              <li>Ảnh gốc không chỉnh sửa</li>
              <li>Ảnh selfie với CMND/CCCD rõ ràng, không bị mờ</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-neutral rounded-lg p-4">
        <form className="form-control min-w-[15rem]" onSubmit={handleSubmit}>
          <label className="label">
            <span className="label-text">Họ và tên</span>
          </label>
          <input
            name="fullname"
            required
            className="input input-bordered input-primary"
          />

          <label className="label mt-2">
            <span className="label-text">Số điện thoại</span>
          </label>
          <input
            name="phoneNumber"
            required
            type="number"
            className="input input-bordered input-primary"
          />

          <label className="label mt-2">
            <span className="label-text">Số CMND/CCCD</span>
          </label>
          <input
            name="idNumber"
            required
            type="number"
            className="input input-bordered input-primary"
          />

          <label className="label mt-2">
            <span className="label-text">Giới tính</span>
          </label>
          <select name="gender" className="select select-primary w-full">
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>

          <button className="btn btn-accent btn-sm mt-8">Gửi</button>
        </form>
      </div>
    </div>
  )
}
export default KYC
