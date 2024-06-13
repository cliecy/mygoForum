// import React from 'react';
// import type { PaginationProps } from 'antd';
// import { Pagination } from 'antd';

// const onChange: PaginationProps['onChange'] = (pageNumber) => {
//   console.log('Page: ', pageNumber);
// };

// const MPagination: React.FC <{pageNum:number}> = ({pageNum}) => {

//   return (  <>
//     <Pagination showQuickJumper defaultCurrent={1} total={pageNum} onChange={onChange} />
//   </>)

// };

// export default MPagination;
//ant design的pagination组件
import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
//接口定义
interface MPaginationProps {
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onShowSizeChange: (current:number,pageSize:number) => void;
}
//组件实现
const MPagination: React.FC<MPaginationProps> = ({ total, pageSize, onPageChange,onShowSizeChange }) => {
  const handleChange: PaginationProps['onChange'] = (pageNumber) => {
    onPageChange(pageNumber);
  };
//组件渲染
  return (
    <Pagination
      showQuickJumper
      defaultCurrent={1}
      total={total}
      pageSize={pageSize}
      onChange={handleChange}
      onShowSizeChange={onShowSizeChange}
    />
  );
};

export default MPagination;