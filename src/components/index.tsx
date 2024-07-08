'use client'
import { API_URLS } from '@/helpers/api';
import { fetchData } from '@/helpers/constants';
import { Coin } from '@/interfaces';
import { Table, Pagination, Select } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { typeOfMony, typeOfRange } from '@/interfaces';

export interface IContentProps {
  coin: Coin[];
}

export const Content: React.FC = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const pageSize = 10;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (image: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '20px' }}><Image src={record.image} alt={record.name} width={30} height={30} /></div>
          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{record.name}</span>
        </div>
      ),
    },
    { title: 'Current Price', dataIndex: 'current_price', key: 'current_price' },
    { title: 'Circulating Supply', dataIndex: 'circulating_supply', key: 'circulating_supply' },
  ];

  const fetchDataByType = async (currency: typeOfMony, range: typeOfRange, page: number) => {
    try {
      let apiUrl = '';

      switch (currency) {
        case typeOfMony.USD:
          apiUrl = API_URLS.usd(range === typeOfRange.DESC ? 'desc' : 'asc') + `&page=${page}&per_page=${pageSize}`;
          break;
        case typeOfMony.EUR:
          apiUrl = API_URLS.eur(range === typeOfRange.DESC ? 'desc' : 'asc') + `&page=${page}&per_page=${pageSize}`;
          break;
        default:
          break;
      }

      const response = await fetchData(apiUrl);
      setData(response);
      setTotalItems(10000);
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  };

  useEffect(() => {
    fetchDataByType(typeOfMony.USD, typeOfRange.DESC, currentPage);
  }, [currentPage]); 

  const handleTypeSearch = (currency: typeOfMony, range: typeOfRange) => {
    fetchDataByType(currency, range, 1);
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: '20px' }} className="flex flex-col">
      <h1>Coins & Markets</h1>
      <div className="flex items-center gap-6 my-6">
        <Select defaultValue={typeOfMony.USD} style={{ width: 200 }} onChange={(value) => handleTypeSearch(value as typeOfMony, typeOfRange.DESC)}>
          <Select.Option value={typeOfMony.USD}>USD</Select.Option>
          <Select.Option value={typeOfMony.EUR}>EUR</Select.Option>
        </Select>

        <Select defaultValue={typeOfRange.DESC} style={{ width: 200 }} onChange={(value) => handleTypeSearch(typeOfMony.EUR, value as typeOfRange)}>
          <Select.Option value={typeOfRange.DESC}>Market cap descending</Select.Option>
          <Select.Option value={typeOfRange.ASC}>Market cap ascending</Select.Option>
        </Select>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={false}
      />

      <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={pageSize}
        onChange={handlePageChange}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}
      />
    </div>
  );
};
