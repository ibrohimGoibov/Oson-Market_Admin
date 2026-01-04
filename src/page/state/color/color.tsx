import axios from "axios"
import { useEffect, useState } from "react"

type ColorType = {
  id: number
  colorName: string
}

const Color = () => {
  const [colors, setColors] = useState<ColorType[]>([])
  const [loading, setLoading] = useState(true)
  const [newColor, setNewColor] = useState("")
  const [editId, setEditId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")

  const getColors = async () => {
    const res = await axios.get("https://store-api.softclub.tj/Color/get-colors")
    setColors(res.data.data)
    setLoading(false)
  }

  async function deleteColor(id: number) {
    await axios.delete(
      `https://store-api.softclub.tj/Color/delete-color?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    getColors()
  }

  async function addColor(value: string) {
    if (!value.trim()) return
    await axios.post(
      `https://store-api.softclub.tj/Color/add-color?ColorName=${value}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    setNewColor("")
    getColors()
  }

  async function editColor(id: number, value: string) {
    if (!value.trim()) return
    await axios.put(
      `https://store-api.softclub.tj/Color/update-color?Id=${id}&ColorName=${value}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    setEditId(null)
    setEditValue("")
    getColors()
  }

  useEffect(() => {
    getColors()
  }, [])

  if (loading) {
    return <p className="text-center mt-20">Загрузка...</p>
  }

  return (
    <div className="min-h-screen flex justify-center items-start pt-10">
      <div className="w-full max-w-md shadow-2xl rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Colors</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter color name"
            value={newColor}
            onChange={e => setNewColor(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button
            onClick={() => addColor(newColor)}
            className="bg-green-500 text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {colors.map(e => (
            <div
              key={e.id}
              style={{ backgroundColor: e.colorName }}
              className="flex justify-between items-center px-4 py-3 rounded-lg"
            >
              {editId === e.id ? (
                <>
                  <input
                    value={editValue}
                    onChange={ev => setEditValue(ev.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => editColor(e.id, editValue)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="font-semibold text-black">
                    {e.colorName}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(e.id)
                        setEditValue(e.colorName)
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteColor(e.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Color
