import React, { useEffect, useRef } from 'react';
import dt from 'datatables.net-dt';
import $ from "jquery";
import {useSelector} from 'react-redux'
import '../index.css'

const Table = () => {
  const formData = useSelector((state)=>state.formData.data);
  const el = useRef(null);

  useEffect(() => {
    const $el = $(el.current);
    $el.DataTable = dt;
    $el.DataTable({
      data: formData,
      columns: [
        { data: 'name', title: 'Name' },
        { data: 'age', title: 'Age' },
        { data: 'sex', title: 'Sex' },
        { data: 'mobile', title: 'Mobile' },
        { data: 'govtId', title: 'GovtId' },
        { data: 'address', title: 'Address' },
        { data: 'state', title: 'State' },
        { data: 'city', title: 'City' },
        { data: 'country', title: 'Country' },
        { data: 'pin', title: 'Pin' }
      ]
    });

    return () => {
      $('.display')
        .find('table')
        .DataTable()
        .destroy(true);
    };
  }, []);

  return (
    <div>
      <table className="display" width="100%" ref={el} />
    </div>
  );
};

export default Table;
