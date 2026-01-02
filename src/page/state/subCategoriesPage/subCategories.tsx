import axios from "axios";
import { useEffect, useState } from "react";

type SubCategoryType = {
  id: number;
  subCategoryName: string;
};

type CategoryType = {
  id: number;
  categoryName: string;
};

const SubCategory = () => {
  const [data, setData] = useState<SubCategoryType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<any>(null);

  const getSubCategory = async () => {
    try {
      const res = await axios.get(
        "https://store-api.softclub.tj/SubCategory/get-sub-category"
      );
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "https://store-api.softclub.tj/Category/get-categories"
      );
      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function deleteSubCategories(id: number) {
    try {
      await axios.delete(
        `https://store-api.softclub.tj/SubCategory/delete-sub-category?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getSubCategory();
    } catch (error) {
      console.error(error);
    }
  }

  async function addSubCategories() {

    try {
      await fetch(
        `https://store-api.softclub.tj/SubCategory/add-sub-category?CategoryId=${categoryId}&SubCategoryName=${name}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setName("");
      setCategoryId(null);
      getSubCategory();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSubCategory();
    getCategories();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter subcategory name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
        />

        <select
          value={categoryId}
          onChange={(e:any) => setCategoryId(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.categoryName}
            </option>
          ))}
        </select>

        <button
          onClick={addSubCategories}
          className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-lg font-medium"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((e) => (
          <div
            key={e.id}
            className="p-4 bg-white text-black rounded-xl shadow hover:shadow-lg transition"
          >
            <h1 className="font-semibold">{e.subCategoryName}</h1>
            <button onClick={() => deleteSubCategories(e.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategory;
