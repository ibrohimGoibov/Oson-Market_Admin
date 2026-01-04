import axios from "axios"
import { useEffect, useState } from "react"
import { Modal } from "antd"

type ApiProduct = {
  id: number
  productName: string
  image: string
  color: string
  price: number
  hasDiscount: boolean
  discountPrice: number
  quantity: number
  categoryName: string
  checked?: boolean
}

type ApiResponse = {
  data: {
    products: ApiProduct[]
  }
}

type Color = {
  id: number
  colorName: string
}

export default function ProductsPage() {
  const [items, setItems] = useState<ApiProduct[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [colors, setColors] = useState<Color[]>([])
  const [_, setBrand] = useState([])
  const [form, setForm] = useState({
    brandId: "",
    colorId: "",
    productName: "",
    description: "",
    quantity: "",
    weight: "",
    size: "",
    code: "",
    price: "",
    hasDiscount: false,
    discountPrice: "",
    subCategoryId: ""
  })
  const [images, setImages] = useState<File[]>([])

  async function getProduct() {
    const { data } = await axios.get<ApiResponse>("https://store-api.softclub.tj/Product/get-products")
    setItems(data.data.products)
  }

  async function getColor() {
    const { data } = await axios.get("https://store-api.softclub.tj/Color/get-colors")
    setColors(data.data)
  }

  async function getBrand() {
    const res = await axios.get("https://store-api.softclub.tj/Brand/get-brands")
    setBrand(res.data.data.brand)
  }

  async function deleteProduct(id: number) {
    await axios.delete(`https://store-api.softclub.tj/Product/delete-product?id=${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    getProduct()
  }

  async function addProduct() {
    const formData = new FormData()
    images.forEach(f => formData.append("Images", f))
    Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)))
    await axios.post("https://store-api.softclub.tj/Product/add-product", formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    setIsModalOpen(false)
    getProduct()
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: name === "hasDiscount" ? value === "true" : value }))
  }

  const handleFiles = (e: any) => {
    if (!e.target.files) return
    setImages(Array.from(e.target.files))
  }

  useEffect(() => {
    getProduct()
    getColor()
    getBrand()
  }, [])

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium">Products</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add product
        </button>
      </div>

      <Modal title="Add Product" open={isModalOpen} onOk={addProduct} onCancel={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-3">
          <input type="file" multiple onChange={handleFiles} />
          <input name="brandId" value={form.brandId} onChange={handleChange} placeholder="BrandId" />
          <select name="colorId" value={form.colorId} onChange={handleChange}>
            <option value="">Select color</option>
            {colors.map(c => (
              <option key={c.id} value={c.id}>{c.colorName}</option>
            ))}
          </select>
          <input name="productName" value={form.productName} onChange={handleChange} placeholder="ProductName" />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
          <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
          <select name="hasDiscount" value={String(form.hasDiscount)} onChange={handleChange}>
            <option value="false">No Discount</option>
            <option value="true">Has Discount</option>
          </select>
          {form.hasDiscount && (
            <input name="discountPrice" value={form.discountPrice} onChange={handleChange} placeholder="DiscountPrice" />
          )}
          <input name="subCategoryId" value={form.subCategoryId} onChange={handleChange} placeholder="SubCategoryId" />
        </div>
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
            <img src={`https://store-api.softclub.tj/images/${p.image}`} className="w-full h-40 object-cover rounded" />
            <h2 className="font-medium">{p.productName}</h2>
            <p className="text-sm text-gray-500">{p.categoryName}</p>
            <p className="text-sm">{p.quantity === 0 ? "Out of stock" : `${p.quantity} in stock`}</p>
            <div className="flex items-center gap-2">
              {p.hasDiscount ? (
                <>
                  <span className="line-through text-gray-400">${p.price}</span>
                  <span className="text-red-600 font-medium">${p.discountPrice}</span>
                </>
              ) : (
                <span className="font-medium">${p.price}</span>
              )}
            </div>
            <button onClick={() => deleteProduct(p.id)} className="mt-2 text-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
