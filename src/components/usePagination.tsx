"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

import { SecondaryButton } from "./button";

type PaginationParams<Type> = {
  data: Type[];
  renderList: (data: Type[]) => JSX.Element;
};

const PAGE_SIZE_OPTION = [1, 5, 10, 15, 20];
const PAGE_SIZE_STORAGE_KEY = "size";

const getOffset = ()=>{
  if(typeof window !== 'undefined'){
    try{
      const mOffset = Number(localStorage.getItem(PAGE_SIZE_STORAGE_KEY));
      if(PAGE_SIZE_OPTION.includes(mOffset)){
        return mOffset;
      }
    } catch(e){
      console.error("getOffset error",e)
    }

  }
  return 10;
};


export default function usePagination<Type>({
  data,
  renderList,
}: Readonly<PaginationParams<Type>>): JSX.Element {
  const [isPending, startTransition] = useTransition();
  const [offset, setOffset] = useState<number>(getOffset());
  const [currentData, setCurrentData] = useState<Type[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const _setCurrentData = useCallback((data:Type[]) => {
    startTransition(()=>{
      setCurrentData(data);
    });
  },[]);

  useEffect(()=>{
    localStorage?.setItem(PAGE_SIZE_STORAGE_KEY,String(offset));
  },[offset]);

  useEffect(() => {
    if (data.length != 0) {
      let mTotalPage = Math.trunc(data.length / offset);
      if (data.length % offset > 0) {
        mTotalPage += 1;
      }
      setTotalPage(mTotalPage);
      let mCurrentPage = currentPage;
      if (currentPage === 0) {
        mCurrentPage = 1;
        setCurrentPage(mCurrentPage);
      } else if ((currentPage - 1) * offset >= data.length) {
        //page exceed
        mCurrentPage = mTotalPage;
        setCurrentPage(mCurrentPage);
      }

      const start = offset * (currentPage - 1);
      const end = Math.min(start + offset, data.length);
      _setCurrentData(data.slice(start, end));
    }
  }, [_setCurrentData, currentPage, data, offset]);

  const List = useMemo(() => {
    if (currentData.length != 0) {
      return renderList(currentData);
    }
    return null;
  }, [currentData, renderList]);

  const onNextPage = () => {
    if (currentPage >= totalPage) {
      return;
    }
    const start = offset * currentPage;
    const end = Math.min(start + offset, data.length);
    _setCurrentData(data.slice(start, end));

    setCurrentPage((item) => item + 1);
  };

  const onPreviousPage = () => {
    if (currentPage <= 1) {
      return;
    }
    const start = offset * (currentPage - 2);
    const end = Math.min(start + offset, data.length);
    _setCurrentData(data.slice(start, end));

    setCurrentPage((item) => item - 1);
  };

  return (
    <>
      {currentData.length != 0 ? (
        <>
          <div className="relative w-full flex justify-center items-center">
            <SecondaryButton
              disabled={currentPage === 1}
              onClick={onPreviousPage}
            >
              &lt;
            </SecondaryButton>
            <div>
              {currentPage}/{totalPage}
            </div>
            <SecondaryButton
              disabled={currentPage === totalPage}
              onClick={onNextPage}
            >
              &gt;
            </SecondaryButton>
            <div className="absolute right-0 pr-2">
              <label>
                Size:{" "}
                <select
                  value={offset}
                  onChange={(e) => setOffset(Number(e.target.value))}
                  className="text-black"
                >
                  {PAGE_SIZE_OPTION.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          {List}
        </>
      ) : (
        <p>No Data</p>
      )}
    </>
  );
}
