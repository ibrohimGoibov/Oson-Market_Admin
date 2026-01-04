import axios from "axios";
import { useEffect, useState } from "react";

type SubCategory = {
  id: number;
  subCategoryName: string;
};

type CategoryType = {
  id: number;
  categoryName: string;
  categoryImage: string;
  subCategories: SubCategory[];
};

const Category = () => {
  const [data, setData] = useState<CategoryType[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  

  async function getCategories(): Promise<void> {
    const response = await axios.get(
      "https://store-api.softclub.tj/Category/get-categories"
    );
    setData(response.data.data);
  }

  async function deleteCategories(id: number) {
    await axios.delete(
      `https://store-api.softclub.tj/Category/delete-category?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    getCategories();
  }

  async function addCategory() {
    if (!name || !file) return;
    const formData = new FormData();
    formData.append("categoryName", name);
    formData.append("categoryImage", file);

    await axios.post(
      "https://store-api.softclub.tj/Category/add-category",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setName("");
    setFile(null);
    getCategories();
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "24px",
        padding: "40px",
        background: "#f4f6f8",
      }}
    >
      <div style={{ gridColumn: "1 / -1", display: "flex", gap: "12px" }}>
        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files ? e.target.files[0] : null)
          }
        />
        <input
          type="text"
          value={name}
          placeholder="Category Name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addCategory}>Add</button>
      </div>

      {data.map((e) => (
        <div
          key={e.id}
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={`https://store-api.softclub.tj/images/${e.categoryImage}`}
            alt={e.categoryName}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />

          <div style={{ padding: "20px" }}>
            <h2 style={{ fontSize: "22px", marginBottom: "12px" }}>
              {e.categoryName}
            </h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {e.subCategories.map((sub) => (
                <span
                  key={sub.id}
                  style={{
                    background: "#eef2ff",
                    color: "#3730a3",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    fontSize: "13px",
                  }}
                >
                  {sub.subCategoryName}
                </span>
              ))}
            </div>
          </div>

          <button style={{ padding: "16px", color: "red" }} onClick={() => deleteCategories(e.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Category;
