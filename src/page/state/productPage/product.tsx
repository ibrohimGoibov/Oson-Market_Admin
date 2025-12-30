import axios from 'axios';
import { useEffect, useState } from 'react';

interface ProductType {
  id: number;
  productName: string;
}

const Product = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://store-api.softclub.tj/Product/get-products');
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return <p className="text-center text-[20px]">Loading...</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-[20px] p-[20px]">
      {data.map((e) => (
        <div
          key={e.id}
          className="border p-[15px] rounded-[10px] shadow"
        >
          <h1 className="text-[18px] font-[600]">
            {e.productName}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Product;
