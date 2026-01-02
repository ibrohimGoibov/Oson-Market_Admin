import axios from "axios";
import { useEffect, useState } from "react";

type ColorType = {
  id: number;
  colorName: string;
};

const Color = () => {
  const [colors, setColors] = useState<ColorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newColor, setNewColor] = useState<string>("");

  const getColors = async () => {
    try {
      const res = await axios.get(
        "https://store-api.softclub.tj/Color/get-colors"
      );
      setColors(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  async function deleteColor(id: number) {
    try {
      await axios.delete(
        `https://store-api.softclub.tj/Color/delete-color?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getColors();
    } catch (error) {
      console.error(error);
    }
  }

  async function addColor(newColor: string) {
    try {
      await fetch(
        `https://store-api.softclub.tj/Color/add-color?ColorName=${newColor}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewColor("");
      getColors();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getColors();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg font-medium text-gray-600">
        Загрузка...
      </p>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start pt-10">
      <div className="w-full max-w-md shadow-2xl rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Colors
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter color name"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={() => addColor(newColor)}
            className="bg-green-500 hover:bg-green-600 transition text-white px-4 rounded-lg font-medium"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {colors.map((e) => (
            <div
              key={e.id}
              style={{ backgroundColor: e.colorName }}
              className="flex justify-between items-center px-4 py-3 rounded-lg shadow-md hover:scale-[1.02] transition"
            >
              <span className="font-semibold text-black">
                {e.colorName}
              </span>
              <button
                onClick={() => deleteColor(e.id)}
                className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-1 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Color;
