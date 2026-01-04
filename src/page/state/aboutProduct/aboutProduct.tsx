import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";

const AboutProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addImageModal, setAddImageModal] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);

  async function getProduct() {
    let res = await fetch(`https://store-api.softclub.tj/Product/get-product-by-id?id=${id}`);
    let data = await res.json();
    setData(data);
  }

  const addImageToProduct = async () => {
    if (!id || newImages.length === 0) return;
    const formData = new FormData();
    formData.append("ProductId", id);
    newImages.forEach((f) => formData.append("Files", f));
    const res = await fetch("https://store-api.softclub.tj/Product/add-image-to-product", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData
    });
    if (res.ok) {
      setAddImageModal(false);
      setNewImages([]);
      getProduct();
    }
  };

  const deleteSelectedImage = async () => {
    const imageId = product?.images?.[selectedImageIndex]?.id;
    await fetch(`https://store-api.softclub.tj/Product/delete-image-from-product?imageId=${imageId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setSelectedImageIndex(0);
    getProduct();
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    getProduct();
  }, []);

  const product = data?.data;
  const mainImage = product?.images?.[selectedImageIndex]?.images;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
            <img
              src={`https://store-api.softclub.tj/images/${mainImage}`}
              className="max-h-full object-contain rounded-xl"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {product?.images?.map((img: any, idx: number) => (
              <img
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                src={`https://store-api.softclub.tj/images/${img.images}`}
                className={`w-20 h-20 rounded-xl object-cover cursor-pointer border-2 ${
                  idx === selectedImageIndex ? "border-indigo-600" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold text-gray-800">{product?.productName}</h1>

          <div className="flex items-end gap-3">
            <span className="text-5xl font-black text-indigo-600">${product?.price}</span>
            <span className="text-2xl line-through text-gray-400">${product?.discountPrice}</span>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">{product?.description}</p>

          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">Color</span>
            <div
              className="w-10 h-10 rounded-full ring-2 ring-gray-300"
              style={{ backgroundColor: product?.color }}
            />
          </div>

          <div className="text-lg">
            In stock: <span className="font-bold text-emerald-600">{product?.quantity}</span>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl border text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              onClick={() => setAddImageModal(true)}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white"
            >
              Add image
            </button>
            <button
              onClick={deleteSelectedImage}
              className="px-6 py-3 rounded-xl bg-red-600 text-white"
            >
              Delete image
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={addImageModal}
        onOk={addImageToProduct}
        onCancel={() => setAddImageModal(false)}
        title="Add image"
        okType="primary"
      >
        <input
          type="file"
          multiple
          onChange={(e) => setNewImages(Array.from(e.target.files || []))}
          className="w-full p-2 border rounded"
        />
      </Modal>
    </div>
  );
};

export default AboutProduct;
