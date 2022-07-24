const Items = () => {
  const items = [
    {
      id: 12345,
      name: 'Thú Cưỡi Chó Địa Ngục',
      rank: 'Siêu Quý',
      price: 100,
      image: '/images/items/chodianguc.jpg',
    },
    {
      id: 12346,
      name: 'Thú Cưỡi Kim Mao Sư Vương',
      rank: 'Cực Hiếm',
      price: 50,
      image: '/images/items/kiemmaosuvuong.jpg',
    },
    {
      id: 12347,
      name: 'Hồng Mã Não Lv15',
      rank: 'Cực Hiếm',
      price: 50,
      image: '/images/items/chodianguc.jpg',
    },
    {
      id: 12347,
      name: 'Hoàng Bích Tỳ Lv15',
      rank: 'Cực Hiếm',
      price: 50,
      image: '/images/items/chodianguc.jpg',
    },
    {
      id: 12348,
      name: 'Thú Cưỡi Tuyết Ngân',
      rank: 'Cực Hiếm',
      price: 200,
      image: '/images/items/ngua.jpg',
    },
  ]

  const itemsRank = [
    { title: 'Phổ Thông' },
    { title: 'Cao Cấp' },
    { title: 'Siêu Quý' },
    { title: 'Cực Hiếm' },
  ]

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6 justify-between">
      <div className="flex flex-wrap gap-6">
        {items.map((item) => (
          <div className="rounded-2xl border-t-4 border-yellow-400 hover:border-yellow-100 bg-neutral p-3 w-60 h-fit">
            <div className="mb-1 rounded-t-lg font-semibold text-white">
              <p>{item.name}</p>
            </div>
            <div className="badge badge-primary badge-sm">#{item.id}</div>
            <div className="mt-4 flex flex-col w-full items-center justify-center">
              <div className="w-16">
                <img width={100} src={item.image} alt="image" />
              </div>
              <div className="mt-4 text-center font-bold text-yellow-500">
                <p>{item.price}$</p>
              </div>
              <button className="btn btn-primary w-full btn-sm mt-4">Buy</button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-xs rounded-lg bg-slate-800 p-4 lg:p-6 h-fit">
        <h4 className="mb-0 lg:mb-2 text-lg lg:text-xl font-semibold">Sắp xếp</h4>
        <label className="label">
          <span className="label-text">Giá</span>
        </label>
        <select
          name="payCurrency"
          defaultValue="highest"
          className="select select-primary w-full select-sm lg:select-md"
        >
          <option value="highest">Cao đến thấp</option>
          <option value="lowest">Thấp đến cao</option>
        </select>
        <h4 className="mb-1 lg:mb-4 mt-4 lg:mt-8 text-lg lg:text-xl font-semibold">Xếp loại</h4>
        <div className="form-control items-start">
          {itemsRank.map((rank) => (
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-accent checkbox-xs lg:checkbox-sm mr-2 lg:mr-3"
              />
              <span className="label-text">{rank.title}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Items
