import axios from "axios";
import React, { useEffect, useState } from "react";

const API = "https://store-api.softclub.tj";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIxYjVhYzRlZi00MWExLTQxYTYtOWRmYy1jY2FhNmM1NDJjODgiLCJuYW1lIjoiU3VwZXJBZG1pbiIsImVtYWlsIjoic2hpbm95YXR6b2RhQGdtYWlsLmNvbSIsInN1YiI6Ijg5ZTY5NzIzLTQ1MDYtNDBiNS1iM2FhLTVmNTAxOTJkOTE5OC5qcGciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzY3MzkzMzkyLCJpc3MiOiJvbmxpbmUtc3RvcmUudGoiLCJhdWQiOiJvbmxpbmUtc3RvcmUudGoifQ.ZyY48046lT2NafkbYzgZPa5D8xPPZFUofbSCnTW6xfE";

async function getProducts() {
  const { data } = await axios.get(`${API}/Product/get-products`);
  return data.data.products;
}

async function getProductsById(id: number | string) {
  const { data } = await axios.get(`${API}/Product/get-product-by-id?id=${id}`);
  return data.data;
}

async function getColors() {
  const { data } = await axios.get(`${API}/Color/get-colors`);
  return data.data;
}

async function getBrands() {
  const { data } = await axios.get(`${API}/Brand/get-brands`);
  return data.data;
}

async function getSubcategories() {
  const { data } = await axios.get(`${API}/SubCategory/get-sub-category`);
  return data.data;
}

async function editProduct(product: any) {
  await axios.put(`${API}/Product/update-product`, null, {
    params: product,
    headers: { Authorization: TOKEN },
  });
}

export default function Apps() {
  const [products, setProducts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const [colors, setColors] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);

  const [id, setId] = useState<number | null>(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [colorId, setColorId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [hasDiscount, setHasDiscount] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
    getColors().then(setColors);
    getBrands().then(setBrands);
    getSubcategories().then(setSubcategories);
  }, []);

  function openEdit(productId: number | string) {
    getProductsById(productId).then((p) => {
      setId(p.id);
      setProductName(p.productName);
      setPrice(String(p.price));
      setColorId(String(p.colorId));
      setBrandId(String(p.brandId));
      setSubcategoryId(String(p.subCategoryId));
      setDescription(p.description);
      setQuantity(String(p.quantity));
      setHasDiscount(p.hasDiscount);
      setOpen(true);
    });
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;

    const updatedProduct = {
      Id: id,
      ProductName: productName,
      Price: Number(price),
      ColorId: Number(colorId),
      BrandId: Number(brandId),
      SubCategoryId: Number(subcategoryId),
      Description: description,
      Quantity: Number(quantity),
      Code: Date.now().toString(),
      HasDiscount: hasDiscount,
    };

    editProduct(updatedProduct).then(() => {
      getProducts().then(setProducts);
      setOpen(false);
    });
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Product List</h1>

      <ul className="mt-6 p-20">
        {products.map((p) => (
          <li
            key={p.id}
            onClick={() => openEdit(p.id)}
            className="my-4 p-4 border rounded cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{p.productName}</h2>
            <p>{p.categoryName}</p>
            <p className="text-green-600 font-bold">${p.price}</p>
          </li>
        ))}
      </ul>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-1/2">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

            <form onSubmit={handleFormSubmit}>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              />

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              />

              <select
                value={colorId}
                onChange={(e) => setColorId(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              >
                {colors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.colorName}
                  </option>
                ))}
              </select>

              <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              >
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.brandName}
                  </option>
                ))}
              </select>

              <select
                value={subcategoryId}
                onChange={(e) => setSubcategoryId(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              >
                {subcategories.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.subCategoryName}
                  </option>
                ))}
              </select>

              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              />

              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              />

              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={hasDiscount}
                  onChange={(e) => setHasDiscount(e.target.checked)}
                />
                Has Discount
              </label>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
