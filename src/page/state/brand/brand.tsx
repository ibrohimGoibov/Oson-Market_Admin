import axios from 'axios'
import { useEffect, useState } from 'react'

type BrandType = {
  id: number | string
  brandName: string
}

const Brand = () => {
  const [data, setData] = useState<BrandType[]>([])
  const [newColor, setNewColor] = useState('')
  const [editId, setEditId] = useState<number | string | null>(null)
  const [editValue, setEditValue] = useState('')

  async function getBrand() {
    const res = await axios.get('https://store-api.softclub.tj/Brand/get-brands')
    setData(res.data.data)
  }

  async function deleteBrand(id: number | string) {
    await axios.delete(`https://store-api.softclub.tj/Brand/delete-brand?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    getBrand()
  }

  async function addColor(value: string) {
    if (!value.trim()) return
    await axios.post(
      `https://store-api.softclub.tj/Brand/add-brand?BrandName=${value}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    setNewColor('')
    getBrand()
  }

  async function editBrand(id: number | string, value: string) {
    if (!value.trim()) return
    await axios.put(
      `https://store-api.softclub.tj/Brand/update-brand?Id=${id}&BrandName=${value}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    setEditId(null)
    setEditValue('')
    getBrand()
  }

  useEffect(() => {
    getBrand()
  }, [])

  return (
    <div>
      <input
        type="text"
        placeholder="Enter color name"
        value={newColor}
        onChange={e => setNewColor(e.target.value)}
      />
      <button onClick={() => addColor(newColor)}>Add</button>

      {data.map(e => (
        <div key={e.id}>
          {editId === e.id ? (
            <>
              <input
                value={editValue}
                onChange={ev => setEditValue(ev.target.value)}
              />
              <button onClick={() => editBrand(e.id, editValue)}>Save</button>
            </>
          ) : (
            <>
              <h1>{e.brandName}</h1>
              <button onClick={() => {
                setEditId(e.id)
                setEditValue(e.brandName)
              }}>edit</button>
              <button onClick={() => deleteBrand(e.id)}>delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default Brand
