import axios from "axios";
import { useEffect, useState } from "react";

type SubCategoryType = {
  id: number;
  subCategoryName: string;
};

const SubCategory = () => {
  const [data, setData] = useState<SubCategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

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
      let {data} = await axios.get(`https://store-api.softclub.tj/Category/get-categories`)
      console.log(data.data);
      setCategories(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteSubCategories(id: number | string) {
    try {
      await axios.delete(`https://store-api.softclub.tj/SubCategory/delete-sub-category?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      getSubCategory();
    } catch (error) {
      console.error(error);
    }
  }

  async function addSubCategories(id: number, name: string) {
  try {
    await fetch(
      "https://store-api.softclub.tj/SubCategory/add-sub-category",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          categoryId: categories,
          subCategoryName: name,
        }),
      }
    );
    setName("");
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
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <input
            type="text"
            placeholder="Enter color name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <select name="" id="">
            {categories.map((e) => {
              return (
                <option value="">
                  {e.id}
                </option>
              )
            })}
          </select>
          <button
  onClick={() => addSubCategories(1, name)}
  className="bg-green-500 hover:bg-green-600 transition text-white px-4 rounded-lg font-medium"
>
  Add
</button>

      {data.map((e) => (
        <div key={e.id} className="p-4 bg-white text-black rounded-xl shadow hover:shadow-lg transition">
          <h1 className="font-semibold">{e.subCategoryName}</h1>
          <button onClick={() => deleteSubCategories(e.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default SubCategory;