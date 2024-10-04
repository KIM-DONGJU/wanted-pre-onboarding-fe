'use client';

import { useEffect, useRef, useState } from "react";

import { getMockData, MockData } from "@/apis/product";
import CommonLoadingSpinner from "@/components/common/CommonLoadingSpinner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MockData[]>([]);
  const [isEnd, setIsEnd] = useState(false);
  const [page, setPage] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null)

  const pushData = (newData: MockData[]) => {
    setData(prevData => [...prevData, ...newData]);
  }

  const loadMore = async (pageNum: number) => {
    if (isEnd || isLoading) {
      return;
    };

    setIsLoading(true);
    try {
      const { datas, isEnd } = await getMockData(pageNum);
      pushData(datas);
      setPage(pageNum + 1);
      if (isEnd) {
        setIsEnd(true);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore(page);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    }
  }, [isLoading])

  return (
    <div className="w-full h-screen flex flex-col max-w-screen-md">
      <p className="text-xl font-bold">
        상품 가격 총합: {data.reduce((acc, cur) => acc + cur.price, 0).toLocaleString()}원 / {data.length}개
      </p>
      <div className="mt-3 flex-1 overflow-auto flex flex-col gap-y-3">
        {
          data.map((item) => (
            <div key={item.productId} className="flex flex-col border border-gray-300 rounded-xl p-4">
              <p>상품명: {item.productName}</p>
              <p>가격: {item.price.toLocaleString()}원</p>
            </div>
          ))
        }
        <div ref={loaderRef} className="w-full flex justify-center">
          { isLoading && <CommonLoadingSpinner />}
        </div>
      </div>
    </div>
  );
}
