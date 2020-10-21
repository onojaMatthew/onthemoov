import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Input, message } from 'antd';
import { getCustomers } from "../../../store/actions/customer";
import Customers from "./Customers";
import { FilterOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const styles = {
  searchWrapper: {
    display: "flex",
    justifyContent: "space-between"
  },
  filterIcon: {
    fontSize: "18px",
    background: "#26acd1",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px",
    marginRight: "5px"
  }
}

const CustomersRiders = ({ match }) => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customerReducer);
  const [ pageOfItems, setPageOfItems ] = useState([]);
  const [ data, setData ] = useState([]);
  const [ searchFilter, setSearchFilter ] = useState("")

  useEffect(() => {
    dispatch(getCustomers());
  }, [ dispatch ]);

  const onChangePage = (pageOfItems) => {
    // update state with new page of items
    setPageOfItems(pageOfItems);
  }

  useEffect(() => {
    if (customers.error && customers.error.length) {
      message.error(customers.error);
    } else if (customers.customersSuccess === true) {
      setData(customers.customers);
    }
  }, [ customers ]);

  const customerList = customers.customers && customers.customers;

  const operations = <div style={styles.searchWrapper}>
      <FilterOutlined style={styles.filterIcon} />
      <Input placeholder="Search..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
    </div>;

  const filteredContents = pageOfItems.filter(content => content.firstName.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 || content.lastName.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1);

  return (
    <div>
      <Tabs tabBarExtraContent={operations}>
        <TabPane tab={customerList && customerList.length + " Customers"} key="1">
          <Customers 
            customers={customers} 
            data={data} 
            filteredContents={filteredContents}
            onChangePage={onChangePage} 
            pageOfItems={pageOfItems}
            match={match}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default CustomersRiders;