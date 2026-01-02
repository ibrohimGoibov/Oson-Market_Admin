import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "antd";

type ApiProduct = {
  id: number;
  productName: string;
  image: string;
  color: string;
  price: number;
  hasDiscount: boolean;
  discountPrice: number;
  quantity: number;
  categoryName: string;
  checked?: boolean;
};

type ApiResponse = {
  data: {
    products: ApiProduct[];
  };
};

type Color = {
  id: number;
  colorName: string;
};

export default function ProductsPage() {
  const [items, setItems] = useState<ApiProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colors, setColors] = useState<Color[]>([]);
  const [brand, setBrand] = useState([]);

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
    subCategoryId: "",
  });

  const [images, setImages] = useState<File[]>([]);


  async function getProduct() {
    try {
      const { data } = await axios.get<ApiResponse>(
        "https://store-api.softclub.tj/Product/get-products"
      );
      setItems(data.data.products);
    } catch (e) {
      console.error(e);
    }
  }

  async function getColor() {
    try {
      const { data } = await axios.get(
        "https://store-api.softclub.tj/Color/get-colors"
      );
      setColors(data.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function getBrand() {
    try {
      let res = await axios.get(`https://store-api.softclub.tj/Brand/get-brands`)
      setBrand(res.data.data.brand)
      console.log(res.data.data.brand);
      
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteProduct(id: number) {
    try {
      await axios.delete(
        `https://store-api.softclub.tj/Product/delete-product?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getProduct();
    } catch (e) {
      console.error(e);
    }
  }

  async function addProduct() {
    try {
      const formData = new FormData();
      images.forEach((file) => {
        formData.append("Images", file);
      });
      formData.append("BrandId", form.brandId);
      formData.append("ColorId", form.colorId);
      formData.append("ProductName", form.productName);
      formData.append("Description", form.description);
      formData.append("Quantity", form.quantity);
      formData.append("Code", form.code);
      formData.append("Price", form.price);
      formData.append("HasDiscount", String(form.hasDiscount));
      formData.append("SubCategoryId", form.subCategoryId);

      if (form.weight) formData.append("Weight", form.weight);
      if (form.size) formData.append("Size", form.size);
      if (form.hasDiscount && form.discountPrice) {
        formData.append("DiscountPrice", form.discountPrice);
      }

      await axios.post(
        "https://store-api.softclub.tj/Product/add-product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsModalOpen(false);
      getProduct();
    } catch (e) {
      console.error(e);
    }
  }


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "hasDiscount" ? value === "true" : value,
    }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  };

  const toggle = (id: number) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, checked: !p.checked } : p
      )
    );
  };

  useEffect(() => {
    getProduct();
    getColor();
    getBrand();
  }, []);


  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium">Products</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <span className="text-lg">＋</span> Add order
        </button>

        <Modal
          title="Add Product"
          open={isModalOpen}
          onOk={addProduct}
          onCancel={() => setIsModalOpen(false)}
        >
          <div className="flex flex-col gap-3">
            <input type="file" multiple onChange={handleFiles} />

            <input name="brandId" value={form.brandId} onChange={handleChange} type="number" placeholder="BrandId" />
            
            <select
              name="colorId"
              value={form.colorId}
              onChange={handleChange}
            >
              <option value="">Select color</option>
              {colors.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.colorName}
                </option>
              ))}
            </select>

            <input name="productName" value={form.productName} onChange={handleChange} placeholder="ProductName" />
            <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
            <input name="quantity" value={form.quantity} onChange={handleChange} type="number" placeholder="Quantity" />
            <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight" />
            <input name="size" value={form.size} onChange={handleChange} placeholder="Size" />
            <input name="code" value={form.code} onChange={handleChange} placeholder="Code" />
            <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Price" />

            <select
              name="hasDiscount"
              value={String(form.hasDiscount)}
              onChange={handleChange}
            >
              <option value="false">No Discount</option>
              <option value="true">Has Discount</option>
            </select>

            {form.hasDiscount && (
              <input
                name="discountPrice"
                value={form.discountPrice}
                onChange={handleChange}
                type="number"
                placeholder="DiscountPrice"
              />
            )}

            <input
              name="subCategoryId"
              value={form.subCategoryId}
              onChange={handleChange}
              type="number"
              placeholder="SubCategoryId"
            />
          </div>
        </Modal>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Product</th>
            <th>Inventory</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>
                <input
                  type="checkbox"
                  checked={p.checked}
                  onChange={() => toggle(p.id)}
                />
              </td>
              <td className="flex gap-2 items-center">
                <img
                  src={`https://store-api.softclub.tj/images/${p.image}`}
                  className="w-10 h-10 rounded"
                />
                {p.productName}
              </td>
              <td>{p.quantity === 0 ? "Out of Stock" : `${p.quantity} in stock`}</td>
              <td>{p.categoryName}</td>
              <td>
                {p.hasDiscount ? (
                  <>
                    <span className="line-through mr-2">${p.price}</span>
                    <span className="text-red-600">${p.discountPrice}</span>
                  </>
                ) : (
                  `$${p.price}`
                )}
              </td>
              <td>
                ✎ <span onClick={() => deleteProduct(p.id)}>🗑</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
